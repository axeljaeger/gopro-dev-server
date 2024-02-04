#!/usr/bin/env node

import express from 'express'

import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { Command } from 'commander';

import { QueryApi } from './generate/apis/QueryApi.js';
import { Configuration } from './generate/runtime.js';

import open from 'open';

import { absolutePath } from 'swagger-ui-dist';

const getCameraName = async (cameraIp: string): Promise<string> => {
  const configuration = new Configuration({ basePath: `http://${cameraIp}` });
  const api = new QueryApi(configuration);
  try {
    const response = await api.oGPGETSTATE();
    const stateStatus = response.status;
    return stateStatus?._30 ?? '';
  } catch (e) {
    console.log("Error in getting camera state:", e);
  }
  return '';
}

const startSwaggerServer = (app: express.Express) => {
  const pathToSwaggerUi = absolutePath();
  const apiUrl = "https://raw.githubusercontent.com/gopro/OpenGoPro/main/docs/specs/.openapi.yml";
  app.get('/swagger-initializer.js', (req, res, next) => {
    res.send(`
    window.onload = function() {  
      window.ui = SwaggerUIBundle({
        url: "${apiUrl}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl,
  
          function() {
            return {
              statePlugins: {
                spec: {
                  wrapActions: {
                    updateJsonSpec: function(oriAction, system) {
                      return (spec) => {
                            spec.servers = [{url: window.location.origin}]
                            return oriAction(spec)
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        layout: "StandaloneLayout"
      });
    };`);
  });
  app.use(express.static(pathToSwaggerUi))
}

const startCameraProxy = async (app: express.Express, cameraIp: string, port: number) => {
  const goprourl = `http://${cameraIp}`;
  app.use('/gopro', createProxyMiddleware(
    {
      target: goprourl,
      changeOrigin: true,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        res.setHeader('Access-Control-Allow-Origin', `localhost:${port}`);
        return responseBuffer;
      }),
    }));
};


const main = async () => {
  const port = 3006

  const program = new Command();
  program
    .name("gopro-dev-server")
    .version("1.0.0")
    .description("Proxy for GoPro API")
    .option("--ip <value>", "IP of camera to connect to")
    .option("--wifi", "Use the static IP of the camera's wifi network, i.e. 10.5.5.9")
    .option("--usb-serial <value>", "Use the last three digits of the camera's serial number to determine the camera's IP for USB connection.")
    .parse(process.argv);

  const opts = program.opts();

  let cameraip: string | null = null;

  if (opts.ip) {
    cameraip = opts.ip;
  } else if (opts.wifi) {
    cameraip = '10.5.5.9';
  } else if (opts.usbSerial) {
    const serialStub = opts.usbSerial;
    cameraip = `172.2${serialStub[0]}.1${serialStub[1]}${serialStub[2]}.51`;
  }

  if (cameraip !== null) {
    const cameraName = await getCameraName(cameraip);
    if (cameraName) {
      const app = express();
      startCameraProxy(app, cameraip!, port);
      startSwaggerServer(app);

      app.listen(port, () => {
        console.log(
          `GoPro Development Server listening at http://localhost:${port}
Camera Name: ${cameraName}
Camera IP: ${cameraip}`);
        open(`http://localhost:${port}`);
      });
    }
    else {
      console.log(`Could not connect to camera at ${cameraip}.`);
      if (opts.wifi) {
        console.log(`Make sure you are connected to the camera's wifi network.`);
      }
    }
  } else {
    program.help();
  }
}

await main();