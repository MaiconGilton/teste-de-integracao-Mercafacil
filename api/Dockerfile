FROM node:14

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH

COPY . . 

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]