# Openfin react starter
[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]
[![Build Status](https://travis-ci.com/openfin-js-app/openfin-react-starter.svg?branch=master)](https://travis-ci.com/openfin-js-app/openfin-react-starter)
[![Coverage Status](https://coveralls.io/repos/github/openfin-js-app/openfin-react-starter/badge.svg?branch=master)](https://coveralls.io/github/openfin-js-app/openfin-react-starter?branch=master)

Openfin react starter in ts

![](https://albertleigh.github.io/openfin-react-latest/img/screenshoot.gif)

* Design with simplicity in mind
* Based on create-react-app@3.0.1 ejected structure
* Integrate Jest and Enzyme test framework
* Integrate Material-UI@4.0.2
* Support basic frameless window features: move, minimize, maximize, close and resize
* Support general sidebar
* Support general primary/success/error/info/warning snackbar
* Support spawn a child window
* Version tag injected via dotenv
* Support general app config
* Support cross window redux-action communication
* Support IndexDB based client side config
* Support snap&dock out of box
* Support Notification Window
* Support HOC Config context
* Embrace react hook apis

### Steps to dockernized it

docker build -t companyScope/openfin-react-starter:1.1.0 .

### Steps to start the container

docker run -itd  --name sample-openfin-starter -p 80:8080 winslow90/openfin-react-starter:1.1.0


[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-1.1.0-green.svg
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg