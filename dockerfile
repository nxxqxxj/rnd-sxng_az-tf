# ==== CONFIGURE =====
FROM node:18-alpine 
WORKDIR /app
COPY . .
# ==== BUILD =====
RUN npm ci && \
    find /app/node_modules/ ! -user root | xargs -i chown root:root
RUN npm run build
# ==== RUN =======
EXPOSE 3000
CMD ["npm", "start"]
