import { client, subscriber } from "./redis.ts";

client.connect();
subscriber.connect();

// Initialize the cache with the first two Fibonacci numbers.
client.hSet("values", 0, 0);
client.hSet("values", 1, 1);

const cache = Object.entries(await client.hGetAll("values")).reduce((object, [key, value]) => {
  object[key] = Number(value);
  return object;
}, {} as { [key: string]: number });


async function fibonacci(index: number): Promise<number> {
  if (cache.hasOwnProperty(index)) {
    return cache[index];
  }
  const result = (cache[index - 1] || await fibonacci(index - 1)) + (cache[index - 2] || await fibonacci(index - 2));
  client.hSet("values", index, result);
  cache[index] = result;
  return result;
}


subscriber.subscribe("insert", async (message) => {
  const index = Number(message);
  await fibonacci(index);
});

