require("dotenv").config();

// ========================================
// TEMPORAL POLYFILL
// ========================================

const { Temporal } = require("@js-temporal/polyfill");

globalThis.Temporal = Temporal;

// ========================================
// PRISMA ORM POSTGRES RUNTIME
// ========================================

const postgresModule = require("@prisma/orm-postgres/runtime");

const postgres = postgresModule.default || postgresModule;

const contractJson = require("./prisma/contract.json");

// ========================================
// DATABASE CONFIG
// ========================================

console.log("DATABASE URL EXISTS:", !!process.env.DATABASE_URL);

console.log(
  "DATABASE URL:",
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@")
    : "Not Found",
);

// ========================================
// PRISMA ORM CONNECTION
// ========================================

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
});

// ========================================
// CONNECTION STATUS
// ========================================

console.log("Prisma ORM PostgreSQL connection initialized successfully");

// ========================================
// EXPORT
// ========================================

module.exports = db;
