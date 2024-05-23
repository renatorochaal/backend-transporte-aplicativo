FROM node:20-slim

RUN apt-get update && apt-get install -y openssl procps

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]

CMD ["npm", "run", "start:dev"]
