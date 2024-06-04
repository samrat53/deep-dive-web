FROM node:20-alpine

WORKDIR /tsapp

COPY package* .
RUN npm install

COPY . .
RUN npm run build

CMD ["node","./dist/index.js"]

# hot reloading: bind mounts:
    # docker run -p -v ./app:/tsapp/app 3000:3000 tsapp