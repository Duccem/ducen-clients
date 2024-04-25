FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/hospital/consulting-room/package.json ./src/apps/hospital/consulting-room/package.json
COPY src/contexts/shared/package.json ./src/contexts/shared/package.json
COPY src/contexts/hospital/package.json ./src/contexts/hospital/package.json
COPY src/contexts/ui/ui-web/package.json ./src/contexts/ui/ui-web/package.json
RUN npm ci
COPY . .
RUN npm run build -w @ducen-clients/shared
RUN npm run build -w @ducen-clients/hospital
RUN npm run build -w @ducen-clients/ui-web
EXPOSE 3002
CMD ["npm", "run", "build", "-w", "@ducen-clients/consulting-room"]
