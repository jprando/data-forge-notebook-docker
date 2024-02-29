FROM docker.io/library/node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml .
RUN corepack enable pnpm; SHELL=bash pnpm setup; . /root/.bashrc; pnpm fetch

COPY . .
RUN pnpm install --offline; pnpm build; pnpm run compile

EXPOSE 8000-8005 8080 9000

CMD pnpm run start