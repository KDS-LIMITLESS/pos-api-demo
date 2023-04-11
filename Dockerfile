FROM node:lts-alpine

WORKDIR /rms

COPY ["package.json", "package-lock.json*", "tsconfig.json",  "./"]

RUN npm install 

COPY . ./rms

EXPOSE 3000

RUN chown -R node /rms

CMD ["npm", "run", "dev"]

