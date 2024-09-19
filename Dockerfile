FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i copyfiles

RUN npm run build

RUN ls -al /app/dist

CMD [ "npm", "run", "start:prod" ]