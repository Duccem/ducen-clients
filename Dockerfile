FROM node:16
COPY ["package.json", "package-lock.json" , "/usr/src/app/"]
WORKDIR /usr/src/app
COPY ["." , "/usr/src/app"]
RUN npm install --workspaces --if-present
EXPOSE 3000
CMD ["npm", "run", "start:dev", "-w", "api"]
