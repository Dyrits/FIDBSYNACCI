FROM denoland/deno:2.9.8

WORKDIR /app

COPY ./package.json ./deno.json ./deno.lock ./

RUN deno install --frozen-lockfile

COPY ./ ./

CMD ["deno", "task", "watch"]