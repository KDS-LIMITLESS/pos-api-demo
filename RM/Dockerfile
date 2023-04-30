FROM node:lts-alpine

WORKDIR /rm

COPY ["package.json", "package-lock.json*", "tsconfig.json",  "./"]

RUN npm install 

COPY . ./rm

EXPOSE 3000

RUN chown -R node /rm

CMD ["npm", "run", "dev"]

