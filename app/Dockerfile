FROM node:20-alpine AS web-build
WORKDIR /app

COPY loan-eligibility-simulator-app/package*.json ./
RUN npm ci
COPY loan-eligibility-simulator-app/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=web-build /app/dist /usr/share/nginx/html
EXPOSE 80