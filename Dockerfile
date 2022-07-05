FROM node:14.16.1-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --only=production
COPY . .
CMD npm run migrate && npm start
