import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)="?([^"]*)"?$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('No POSTGRES_URL in .env.local');
  process.exit(1);
}

const schema = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'schema.sql'), 'utf8');
const pool = new pg.Pool({
  connectionString,
  ssl: process.env.POSTGRES_HOST?.includes('supabase') ? { rejectUnauthorized: false } : undefined,
});

try {
  await pool.query(schema);
  console.log('Database schema applied.');
} catch (err) {
  console.error('Schema error:', err.message);
  process.exit(1);
} finally {
  await pool.end();
}
