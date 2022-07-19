#==============================================
# Install and Build Layer
FROM node:16 as builder

WORKDIR /usr/app
COPY . /usr/app

RUN npm install  && npm cache clean --force
RUN npm run build

#==============================================
# Run Layer
FROM node:16-alpine

WORKDIR /usr/app
COPY --from=builder /usr/app/dist /usr/app/dist
COPY --from=builder /usr/app/node_modules /usr/app/node_modules

EXPOSE 4000
CMD npm run start:dev
