FROM node:lts-alpine

WORKDIR /usr/src/RMS

COPY ["package.json", "package-lock.json*", "tsconfig.json",  "./"]

RUN npm install 

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/RMS

USER node

CMD ["npm", "run", "dev"]

