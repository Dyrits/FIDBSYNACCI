import pkg from "pg";

const { Pool } = pkg;

const postgresql = {
  user: Deno.env.get("POSTGRES_USER") || String(),
  password: Deno.env.get("POSTGRES_PASSWORD") || String(),
  host: Deno.env.get("POSTGRES_HOST") || "localhost",
  port: Number(Deno.env.get("POSTGRES_PORT")) || 5432,
  database: Deno.env.get("POSTGRES_DB") || "fibonacci",
};

const client = new Pool({
  ...postgresql,
});

client.on("error", (error: Error) => {
  console.error("The connection to the PostgresSQL database failed:", error);
});

client.query("CREATE TABLE IF NOT EXISTS values (number INT)").catch(
  (error: Error) => {
    console.error("The query to create the table failed:", error);
  },
);

export { client };
