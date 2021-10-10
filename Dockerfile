FROM node:12

WORKDIR /app

COPY . .

EXPOSE  3000

RUN npm install

CMD ["npm", "start"]