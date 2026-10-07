const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================================
// TEMPORAL POLYFILL
// ======================================================

const { Temporal } = require("@js-temporal/polyfill");

if (!globalThis.Temporal) {
  globalThis.Temporal = Temporal;
}

const pool = require("./db");

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));

// ======================================================
// AUTH MIDDLEWARE
// ======================================================

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ======================================================
// ADMIN MIDDLEWARE
// ======================================================

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.send("Sunex Backend API is running");
});

// ======================================================
// API TEST
// ======================================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// ======================================================
// DATABASE TEST
// ======================================================

app.get("/api/db-test", async (req, res) => {
  try {
    const users = await pool.orm.public.Users.all();

    res.json({
      success: true,
      message: "Database connected successfully",
      usersCount: users.length,
    });
  } catch (error) {
    console.error("DB TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ======================================================
// REGISTER
// ======================================================

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await pool.orm.public.Users.where({
      email,
    }).first();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.orm.public.Users.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

// ======================================================
// LOGIN
// ======================================================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await pool.orm.public.Users.where({
      email,
    }).first();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "400h",
      },
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

// ======================================================
// PROFILE
// ======================================================

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await pool.orm.public.Users.first({
      id: req.user.id,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    });
  }
});

// ======================================================
// USERS
// ======================================================

app.get("/api/users", authMiddleware, async (req, res) => {
  try {
    const users = await pool.orm.public.Users.orderBy((user) => user.id.asc())
      .select("id", "name", "email", "role")
      .all();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

app.delete(
  "/api/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      const user = await pool.orm.public.Users.where({
        id,
      }).first();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const deletedUser = await pool.orm.public.Users.where({
        id,
      }).delete();

      res.json({
        success: true,
        message: "User deleted successfully",
        user: {
          id: deletedUser.id,
          name: deletedUser.name,
          email: deletedUser.email,
          role: deletedUser.role,
        },
      });
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  },
);

// ======================================================
// PRODUCTS
// ======================================================

app.get("/api/products", async (req, res) => {
  try {
    const products = await pool.orm.public.Products.orderBy((product) =>
      product.id.asc(),
    ).all();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

app.post("/api/products", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const product = await pool.orm.public.Products.create({
      name,
      description: description || null,
      price:
        price === undefined || price === null || price === ""
          ? null
          : Number(price),
      image: image || null,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
      id: product.id,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});

app.put(
  "/api/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const { name, description, price, image } = req.body;

      const existingProduct = await pool.orm.public.Products.where({
        id,
      }).first();

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const product = await pool.orm.public.Products.where({
        id,
      }).update({
        name: name ?? existingProduct.name,
        description: description ?? existingProduct.description,
        price:
          price === undefined
            ? existingProduct.price
            : price === null || price === ""
              ? null
              : Number(price),
        image: image ?? existingProduct.image,
      });

      res.json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    }
  },
);

app.delete(
  "/api/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const existingProduct = await pool.orm.public.Products.where({
        id,
      }).first();

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const product = await pool.orm.public.Products.where({
        id,
      }).delete();

      res.json({
        success: true,
        message: "Product deleted successfully",
        product,
      });
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  },
);

// ======================================================
// CMS / PAGES
// ======================================================

// GET ALL PAGES
app.get("/api/pages", async (req, res) => {
  try {
    const pages = await pool.orm.public.Pages.orderBy((page) =>
      page.id.asc(),
    ).all();

    res.json({
      success: true,
      pages,
    });
  } catch (error) {
    console.error("GET PAGES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pages",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE PAGE
// ======================================================

app.get("/api/pages/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page ID",
      });
    }

    const page = await pool.orm.public.Pages.first({
      id,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error("GET SINGLE PAGE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch page",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE PAGE
// ======================================================

app.put("/api/pages/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);

    console.log("========================================");
    console.log("UPDATE PAGE REQUEST");
    console.log("PAGE ID:", id);
    console.log("USER:", req.user);
    console.log("BODY:", JSON.stringify(req.body, null, 2));
    console.log("========================================");

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page ID",
      });
    }

    const {
      page_name,
      section_name,
      title,
      description,
      image,
      badge,
      video,
      primary_button_text,
      primary_button_link,
      secondary_button_text,
      secondary_button_link,
      testimonial,
      avatar_1,
      avatar_2,
      avatar_3,
      avatar_4,
      content,
    } = req.body;

    const existingPage = await pool.orm.public.Pages.where({
      id,
    }).first();

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    const updateData = {
      pageName: page_name !== undefined ? page_name : existingPage.pageName,

      sectionName:
        section_name !== undefined ? section_name : existingPage.sectionName,

      title: title !== undefined ? title : existingPage.title,

      description:
        description !== undefined ? description : existingPage.description,

      image: image !== undefined ? image : existingPage.image,

      badge: badge !== undefined ? badge : existingPage.badge,

      video: video !== undefined ? video : existingPage.video,

      primaryButtonText:
        primary_button_text !== undefined
          ? primary_button_text
          : existingPage.primaryButtonText,

      primaryButtonLink:
        primary_button_link !== undefined
          ? primary_button_link
          : existingPage.primaryButtonLink,

      secondaryButtonText:
        secondary_button_text !== undefined
          ? secondary_button_text
          : existingPage.secondaryButtonText,

      secondaryButtonLink:
        secondary_button_link !== undefined
          ? secondary_button_link
          : existingPage.secondaryButtonLink,

      testimonial:
        testimonial !== undefined ? testimonial : existingPage.testimonial,

      avatar1: avatar_1 !== undefined ? avatar_1 : existingPage.avatar1,

      avatar2: avatar_2 !== undefined ? avatar_2 : existingPage.avatar2,

      avatar3: avatar_3 !== undefined ? avatar_3 : existingPage.avatar3,

      avatar4: avatar_4 !== undefined ? avatar_4 : existingPage.avatar4,

      content: content !== undefined ? content : existingPage.content,

      updatedAt: Temporal.Now.plainDateTimeISO(),
    };

    console.log("UPDATE DATA:");
    console.log(JSON.stringify(updateData, null, 2));

    const page = await pool.orm.public.Pages.where({
      id,
    }).update(updateData);

    console.log("PAGE UPDATED SUCCESSFULLY:", page);

    return res.json({
      success: true,
      message: "Page updated successfully",
      id: page.id,
      page,
    });
  } catch (error) {
    console.error("========================================");
    console.error("UPDATE PAGE ERROR");
    console.error(error);
    console.error("========================================");

    return res.status(500).json({
      success: false,
      message: "Failed to update page",
      error: error.message,
    });
  }
});

// ======================================================
// CREATE NEW PAGE / SECTION
// ======================================================

app.post("/api/pages", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page_name, section_name, title, description, image, content } =
      req.body;

    console.log("========================================");
    console.log("CREATE PAGE REQUEST");
    console.log("USER:", req.user);
    console.log("BODY:", JSON.stringify(req.body, null, 2));
    console.log("========================================");

    if (!page_name || !section_name) {
      return res.status(400).json({
        success: false,
        message: "page_name and section_name are required",
      });
    }

    const page = await pool.orm.public.Pages.create({
      pageName: page_name,
      sectionName: section_name,
      title: title ?? null,
      description: description ?? null,
      image: image ?? null,
      content: content ?? {},
    });

    console.log("PAGE CREATED:", page);

    return res.status(201).json({
      success: true,
      message: "Page created successfully",
      id: page.id,
      page,
    });
  } catch (error) {
    console.error("========================================");
    console.error("CREATE PAGE ERROR");
    console.error(error);
    console.error("========================================");

    return res.status(500).json({
      success: false,
      message: "Failed to create page",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE PAGE / SECTION
// ======================================================

app.delete(
  "/api/pages/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid page ID",
        });
      }

      const existingPage = await pool.orm.public.Pages.where({
        id,
      }).first();

      if (!existingPage) {
        return res.status(404).json({
          success: false,
          message: "Page not found",
        });
      }

      const page = await pool.orm.public.Pages.where({
        id,
      }).delete();

      res.json({
        success: true,
        message: "Page deleted successfully",
        id: page.id,
        page,
      });
    } catch (error) {
      console.error("DELETE PAGE ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete page",
        error: error.message,
      });
    }
  },
);

// ======================================================
// SERVER START
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunex Backend Server running on port ${PORT}`);
});
