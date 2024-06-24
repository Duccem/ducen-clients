FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/contexts/hospital/package.json ./src/contexts/hospital/package.json
RUN npm ci --loglevel=error
COPY . .
CMD ["npm", "run", "build", "-w", "@ducen/hospital"]
