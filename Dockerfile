FROM node:10-alpine

WORKDIR /sit725-2021-t2-prac9

COPY . .

RUN npm install

EXPOSE  3000

CMD ["npm", "start"]