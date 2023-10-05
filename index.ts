
import express from 'express'
import fetch from 'node-fetch';

import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { Command } from 'commander';

const app = express()
const port = 3006

let cameraName = '';
let cameraip: string | null = null;

async function getCameraName(goproip: string): Promise<string> {
  // Fetch info from camera
  try {
    const response = await fetch(`http://${goproip}/gopro/camera/state`);
    const data = await response.json();
    return data.status[30];
  } catch (e) {
    console.log("Error in fetch");
    console.log(e);
  }
  return '';
}

async function startCameraProxy(camIp : string) {
    cameraName = await getCameraName(camIp);
    const goprourl = `http://${cameraip}`;
    app.use('/gopro', createProxyMiddleware(
      {
        target: goprourl,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
          res.setHeader('Access-Control-Allow-Origin', 'https://axeljaeger.github.io');
          return responseBuffer;
        }),
      }));
    app.listen(port, () => {
      console.log(
        `GoPro Development Server listening at http://localhost:${port}
Camera IP: ${cameraip}
Browse the API using http://axeljaeger.github.io/gopro-openapi`);
    });
}

const program = new Command();

program
  .name("gopro-dev-server")
  .version("1.0.0")
  .description("Proxy for GoPro API")
  .option("--ip <value>", "IP of camera to connect to")
  .option("--wifi", "Use the static IP of the camera's wifi network, i.e. 10.5.5.9")
  .option("--usb-serial <value>", "Use the last three digits of the camera's serial number to determine the camera's IP for USB connection.")
  .addHelpText('after', `If none of the above specified, gopro-dev-server will try to detect the camera in the local network.`)
  .parse(process.argv);

const opts = program.opts();

if (opts.ip) {
  console.log(opts.ip);
  cameraip = opts.ip;
} else if (opts.wifi) {
  cameraip = '10.5.5.9';
} else if (opts.usbSerial) {
  const serialStub = opts.usbSerial;
  cameraip = `172.2${serialStub[0]}.1${serialStub[1]}${serialStub[2]}.51`;
}

if (cameraip) {
  startCameraProxy(cameraip);
}