FROM node:18.15.0 AS builder 
RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential python && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY package.json ./
ENV TZ=Asia/Seoul

RUN npm install -y tzdata
COPY ./ ./

RUN npm run build

RUN npm prune --production
FROM node:18.15.0
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules

RUN npm install serve
EXPOSE 4000
CMD ["npx", "serve", "-s", "build", "-l", "4000"]