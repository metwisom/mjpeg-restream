import http from 'http';
import Connector from './classes/connector';
import 'dotenv/config';

const connector = Connector.getInstance();

http.createServer((request, response) => {
  const { url } = request;
  const uid = url.substring(1);

  response.on('error', console.error);

  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Connection', 'close');
  response.setHeader(
    'Content-Type',
    'multipart/x-mixed-replace;boundary=--myboundary'
  );

  // response.setHeader("Pragma", "no-cache"); //Who Needs HTTP/1.0 Users 😕

  connector.connect(uid, response);

}).listen(process.env.PORT || 8888);
