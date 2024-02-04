# gopro-devserver
<span class="badge-npmversion"><a href="https://www.npmjs.com/package/@axeljaeger/gopro-dev-server" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@axeljaeger/gopro-dev-server.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://www.npmjs.com/package/@axeljaeger/gopro-dev-server" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@axeljaeger/gopro-dev-server.svg" alt="NPM downloads" /></a></span>

API-Proxy for the GoPro HTTP-API

*Enables interactive features of Swagger UI for working with the GoPro HTTP API*

GoPro cameras provide an HTTP API that is available in [OpenAPI format](https://gopro.github.io/OpenGoPro/http) from GoPro Inc.
However, you cannot use interactive features of their Redocly their website cannot connect to your camera.

This tool provides everything needed to interact with your camera using Swagger-UI:
- A proxy server that allows CORS requests from your browser to the camera.
- A webserver that serves Swagger-UI and intercepts requests to forward them to your camera.

Usage:

Install the tool using npm:
```
npm install @axeljaeger/gopro-devserver
```

Depending on whether you are connecting the camera via USB or WiFi, the procedure is different:

USB:
- Obtain the last 3 digits of your camera serial number.
- Run the tool, providing the serial number 
 ```
 npx gopro-devserver --usb 123
 ``` 
A browser will open and you can interact with your camera

WiFi:
You cannot make the gopro join your home WiFi but you will have to join the camera's own wifi.
You will have to enable the Wifi on the camera. This is usually done using bluetooth. 
I provide a PWA, [gopro-wifienabler](https://axeljaeger.github.io/gopro-wifienabler/) to do this.

After you joined your camera's wifi, run the tool:
```
npx gopro-devserver --wifi
```