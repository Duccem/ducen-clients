[![Consulting Room CI](https://github.com/Duccem/ducen-clients/actions/workflows/consulting-room.yml/badge.svg)](https://github.com/Duccem/ducen-clients/actions/workflows/consulting-room.yml)
[![Nurse App CI](https://github.com/Duccem/ducen-clients/actions/workflows/nurse-app.yml/badge.svg)](https://github.com/Duccem/ducen-clients/actions/workflows/nurse-app.yml)
[![Quality Gate](https://github.com/Duccem/ducen-clients/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/Duccem/ducen-clients/actions/workflows/sonarcloud.yml)
# Ducen clients

Version: 1.1.0

Author: José Véliz [(Duccem)](https://github.com/Duccem)

- [Ducen clients](#ducen-clients)
  - [About](#about)
  - [Installation](#installation)
  - [Commands](#commands)
    - [Example](#example)
  - [Environments](#environments)
  - [Architecture](#architecture)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)

## About

Monorepo to all of Web/Mobile apps of Ducen projects based on ReactJS and Typescript, built using Domain-Driven Design Architecture. The main objective of this project is to provide a modular and scalable structure for the development of mobile and web applications. By adopting a monolithic approach, where multiple applications share common code, we aim to facilitate maintenance, reusability, and software evolution over time.

## Installation

Ducen is a nodejs project, so you can install it with

```bash
$ npm install --save
```

## Commands

Some useful commands are the main run commands to stand up the services on local machine and docker containers,
the commands are compounds of elements that determinate what are you making  ```$ npm run ${script} -w ${package | app}```

### Example

```$ npm run dev -w consulting-room```

## Environments

- Local - Local Machine
- Test - Docker Containers
- Dev - Cloud Dev Services
- Prod - Cloud Main Services

## Architecture

The repository is structured in such a way that each application (both mobile and web) resides in its own directory within the apps folder. Additionally, the main code for each business area within the repository is separated by contexts within the contexts folder. Furthermore, the shared context is included for code shared among different contexts. This modular structure allows for independent development of each application under different parameters and by different teams, while efficiently sharing resources and common logic.

The structure folder follow the DDD and Hexagonal architecture philosophy (Domain, Services/Application, Infrastructure/Adaptors).

- [apps/]() Apps of the different teams
  - [hospital/]() core team
    - [consulting-room/]() Web app with react
    - [nurse-app/]() Mobile expo app
- [contexts/]() 
  - [hospital/]() The hospital base code
  - [shared/]() Shared code between teams
  - [ui/]() UI library of all products of the management

## Other links

- [Changelog](https://github.com/Duccem/ducen-clients/blob/main/CHANGELOG.md)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

<a href="https://github.com/duccem/ducen-backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duccem/ducen" />
</a>

## License

MIT
