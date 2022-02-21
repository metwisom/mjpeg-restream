import request from 'request';

export default class MjpegStream {
  cache: string | Buffer;
  clients = [];
  request;

  constructor(uid) {
    const url = process.env.PREFIX + uid + process.env.SUFFIX;

    this.request = request
      .get(url)
      .on('data', data => {
        this.request._destdata = false;
        if (data.toString().includes('--myboundary')) {
          this.cache = data;
        }
      });

  }

  clientsCount() {
    return this.clients.filter((e) => e).length;
  }

  async connect(target) {
    this.clients.push(target);
    target.on('close', () => {
      delete this.clients[this.clients.findIndex((item) => item == target)];
    });
    if (this.cache) {
      target.write(this.cache);
    }
    this.request.pipe(target);
  }

  destroy() {
    this.request.end();
    this.request.destroy();
    this.request = undefined;
  }
}
