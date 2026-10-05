const adminMiddleware = (req, res, next) => {
  try {
    // Check authentication
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // Admin hai, request ko aage bhejo
    next();
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    return res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }
};

module.exports = adminMiddleware;
