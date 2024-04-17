const { Pool } = require('pg');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'class_backend',
    password: '00000000',
    port: 5432,
  });

module.exports = {
    prisma,
    };