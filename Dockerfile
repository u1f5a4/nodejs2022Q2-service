#==============================================
# Install Layer
FROM node:16 as builder

WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./


RUN npm install && npm cache clean --force

#==============================================
# Build Layer
# COPY . .
# RUN npm run build

#==============================================
# Run Layer
FROM node:16-alpine

WORKDIR /usr/app
COPY --from=builder /usr/app/ .
# COPY --from=builder /usr/app/dist ./dist

EXPOSE 4000
CMD npm run start:dev
# CMD node dist/main.js
