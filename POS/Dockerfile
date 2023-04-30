FROM node:lts-alpine

WORKDIR /pos

COPY ["package.json", "package-lock.json*", "tsconfig.json",  "./"]

RUN npm install 

COPY . ./pos

EXPOSE 3000

RUN chown -R node /pos

CMD ["npm", "run", "dev"]

