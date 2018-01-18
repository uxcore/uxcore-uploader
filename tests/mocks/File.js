import EventEmitter from 'events';
import {Events} from 'uploadcore';

export default class File extends EventEmitter {
  constructor(name) {
    super();
    this.size = 0;
    this.name = name || '';
    this.progress = 0;
    this.off = this.removeListener;
  }

  isImage() {
    return this.type && /^image\//.test(this.type);
  }

  setType(type) {
    this.type = type;
  }

  getAsDataUrl() {
    return {
      done: (callback) => {
        setTimeout(() => {
          callback(this.url);
        }, 0);
      },
    };
  }

  getStatus() {
    return this.status;
  }

  getStatusName() {
    return this.status || '';
  }

  setStatus(status) {
    if (this.status !== status) {
      this.status = status;
      this.emit(Events.FILE_STATUS_CHANGE);
    }
  }

  setCore(core) {
    this.core = core;
  }

  setProgress(progress) {
    progress = +progress;
    if (progress > 100) {
      progress = 100;
    }
    if (this.progress !== progress) {
      this.progress = progress;
      this.emit(Events.FILE_UPLOAD_PROGRESS, { percentage: progress });
    }
  }

  pending() {
    return true;
  }

  cancel() {
    return true;
  }
}
