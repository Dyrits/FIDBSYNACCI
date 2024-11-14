import { createClient } from "redis";

const redis = {
  host: Deno.env.get("REDIS_HOST") || "localhost",
  port: Number(Deno.env.get("REDIS_PORT")) || 6379,
};

const client = createClient({
  url: `redis://${redis.host}:${redis.port}`
});

client.on("error", (error: Error) => {
  console.error("The connection to the Redis database failed:", error);
});

const subscriber = client.duplicate();

subscriber.on("error", (error: Error) => {
  console.error("The connection to the Redis subscriber failed:", error);
});

export { client, subscriber };
