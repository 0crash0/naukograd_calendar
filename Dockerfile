FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install has eslint-utils
COPY . .
RUN echo "$PWD"
RUN chmod a+x ./node_modules/.bin/react-scripts
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
