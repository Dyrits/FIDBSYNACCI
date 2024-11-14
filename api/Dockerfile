FROM denoland/deno:latest

WORKDIR /app

COPY ./deno.json ./

RUN deno cache --unstable deno.json

COPY ./ ./

CMD ["deno", "task", "watch"]