FROM node:lts-alpine3.23

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@10

RUN pnpm install --ignore-scripts=false

COPY . .

RUN pnpm prisma generate
 
EXPOSE 3000
 
CMD ["pnpm", "start"]

