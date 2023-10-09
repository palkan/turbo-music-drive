export default class {
  constructor(duration) {
    this.duration = duration;
    this.ended = false;
    this.paused = true;
    this.currentTime = 0.0;
    this.tick = this.tick.bind(this);
  }

  play() {
    if (!this.paused) return;

    if (this.currentTime >= this.duration) {
      this.currentTime = 0.0;
    }

    this.tickTid = setInterval(this.tick, 500);
    this.paused = false;
  }

  pause() {
    if (this.paused) return;

    clearInterval(this.tickTid);
    this.paused = true;
  }

  fastSeek(value) {
    this.currentTime = value;
    this.dispatch("timeupdate");
  }

  tick() {
    this.currentTime += 0.5;

    if (this.currentTime >= this.duration) {
      this.pause();
      this.ended = true;
      this.dispatch("timeupdate");
      this.dispatch("ended");
    } else {
      this.dispatch("timeupdate");
    }
  }

  addEventListener(type, callback) {
    window.addEventListener(type, callback);
  }

  removeEventListener(type, callback) {
    window.removeEventListener(type, callback);
  }

  dispatch(type) {
    const event = new CustomEvent(type);
    window.dispatchEvent(event);
  }

  set currentTime(val) {
    this._currentTime = val;
  }

  get currentTime() {
    return this._currentTime;
  }
}
