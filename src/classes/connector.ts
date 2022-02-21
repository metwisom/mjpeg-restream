import MjpegStream from './mjpegstream';

export default class Connector {
  private static instance: Connector;
  private connects: Record<string, MjpegStream>;

  private constructor() {
    this.connects = {};
    this.cleaner();
  }

  static getInstance(): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }

    return Connector.instance;
  }

  connect(uid, writer) {
    if (this.connects[uid] == undefined) {
      this.connects[uid] = new MjpegStream(uid);
    }

    this.connects[uid].connect(writer);
  }

  disconnect(uid) {
    this.connects[uid].destroy();
    delete this.connects[uid];
  }

  cleaner() {
    setInterval(() => {
      for (const uid in this.connects) {
        const connect = this.connects[uid];
        if (connect.clientsCount() == 0) {
          this.disconnect(uid);
        }
      }
    }, 2000);
  }
}
