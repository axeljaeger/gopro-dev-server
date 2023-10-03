
import express from 'express'
import fetch from 'node-fetch';

import { createProxyMiddleware } from 'http-proxy-middleware';

import bonjour, { RemoteService } from 'bonjour'

// from https://stackoverflow.com/questions/23483855/javascript-regex-to-validate-ipv4-and-ipv6-address-no-hostnames
const ipv4_regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;   

const app = express()
const port = 3006

const bonjourBrowser = bonjour()

let cameraName = '';
let cameraip : string | null = null;
let openBrowser = false;

async function getCameraName(goproip : string) : Promise<string> {
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

async function cameraFound(service :  RemoteService) : Promise<void> {
  console.log('Found a gopro', service)
  cameraip = service.addresses.find(candidate => ipv4_regex.test(candidate)) ?? service.referer.address;
  startCameraProxy();
}

async function startCameraProxy() {
    if (cameraip) {
        cameraName = await getCameraName(cameraip);

        const goprourl = `http://${cameraip}`;
        app.use('/gopro', createProxyMiddleware({ target: goprourl, changeOrigin: true }));
        console.log(`Camera API available on http://localhost/${port}`);
    }
}

const args = process.argv.slice(2);

console.log(args);

if (args.includes('--help')) {
    console.log(
`GoPro Development Server

Usage: gopro-dev-server [options]

Options:
--help            Show this help

--ip <ip>         IP of camera to connect to.
--wifi            Use the static IP of the camera's wifi network, i.e. 10.5.5.9
--usb-serial XXX  Use the last three digits of the camera's serial number to 
                  determine the camera's IP for USB connection.

                  If none of the above specified, gopro-dev-server will try 
                  to detect the camera in the local network.  

--open            Open browser after connecting to camera.`);
    process.exit(0);
} 

if (args.includes('--open')) {
    openBrowser = true;
}

if (args.includes('--ip')) {
    cameraip = args[args.indexOf('--ip') + 1];
} else if (args.includes('--wifi')) {
    cameraip = '10.5.5.9';
} else if (args.includes('--usb-serial')) {
    const serialStub = args[args.indexOf('--usb-serial') + 1];
    cameraip = `172.2${serialStub[0]}.1${serialStub[1]}${serialStub[2]}.51`;
}

if (cameraip) {
    startCameraProxy();
} else {
    const browser = bonjourBrowser.find({ type: 'gopro-web' });
    browser.on('up', cameraFound);
    browser.start();
}

app.use(express.static('./gopro-openapi.yml'));
app.listen(port, () => {
    console.log(`GoPro Development Server listening at http://localhost:${port}`)
});