FROM node:18-alpine3.18 as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build

FROM nginx:1.25.3-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html