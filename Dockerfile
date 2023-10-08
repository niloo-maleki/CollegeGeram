FROM node:18.16.0-alpine as node 
WORKDIR /Collage-Geram
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY ./ ./
EXPOSE 3000
CMD ["yarn", "start"]
