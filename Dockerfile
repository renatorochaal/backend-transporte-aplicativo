FROM node:20-slim

RUN apt-get update && apt-get install -y openssl procps

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "run", "start:dev"]
