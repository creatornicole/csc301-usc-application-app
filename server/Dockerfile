FROM node:16

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

# expose port
EXPOSE 3003

# run the application
CMD ["npm", "run", "dev"]