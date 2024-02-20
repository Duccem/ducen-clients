FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/hospital/api/package.json ./src/apps/hospital/api/package.json
COPY src/contexts/shared/core/package.json ./src/contexts/shared/core/package.json
COPY src/contexts/hospital/package.json ./src/contexts/hospital/package.json
COPY src/packages/eslint-config-ducen/package.json ./src/packages/eslint-config-ducen/package.json
COPY src/packages/tsconfig/package.json ./src/packages/tsconfig/package.json
RUN npm ci
COPY . .
RUN npm run build -w core
RUN npm run build:back -w hospital
EXPOSE 3000/tcp
CMD ["npm", "run", "build", "-w", "api"]
