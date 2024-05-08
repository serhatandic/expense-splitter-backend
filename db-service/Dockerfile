# Specify the base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 300

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "src/index.js" ]
