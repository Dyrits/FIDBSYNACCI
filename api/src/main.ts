import { Hono } from "hono";
import { cors } from "hono/cors";

import { client as postgresql } from "./postgresql.ts";
import { client as redis, publisher } from "./redis.ts";

redis.connect();
publisher.connect();

const app = new Hono();

app.use("*", cors());

app.get("/", (context) => {
  return context.json({ message: "Hello Hono!" });
});

app.get("/fibonacci/values", async (context) => {
  const values = await redis.hGetAll("values");
  return context.json(values);
});

app.get("/fibonacci/indexes", async (context) => {
  const indexes = await postgresql.query("SELECT * FROM values");
  const max = Math.max(...indexes.rows.map((index: { number: number }) => index.number));
  publisher.publish("insert", String(max));
  return context.json(indexes.rows);
});

app.post("/fibonacci", async (context) => {
  const { index } = await context.req.json();
  if (index > 1477) {
    context.status(422);
    return context.json({ message: "The provided index is too high!" });
  }
  index && publisher.publish("insert", index);
  index && postgresql.query("INSERT INTO values(number) VALUES($1)", [index]);
  return context.json({ message: index ? "Index has been published!" : "No index provided!" });
});

Deno.serve({ port: 5100 }, app.fetch);
