import { Controller } from "@hotwired/stimulus";
import FakeAudio from "../utils/fake_audio";

function secondsToDuration(num) {
  let mins = Math.floor(num / 60);
  let secs = (num | 0) % 60;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return `${mins}:${secs}`;
}

// Connects to data-controller="player"
export default class extends Controller {
  static targets = ["progress", "time"];
  static values = {
    duration: Number,
    track: String,
  };

  initialize() {
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.playing = false;
  }

  connect() {
    // Permanent element was re-attached to DOM
    if (this.audio) {
      this.setupAudioListeners();
    }

    if (this.playing) {
      this.play();
    }
  }

  disconnect() {
    if (this.audio) {
      this.removeAudioListeners();
    }
  }

  trackValueChanged() {
    this.disposeAudio();
    if (!this.trackValue) return;

    this.audio = new FakeAudio(this.durationValue);
    this.setupAudioListeners();
    this.play();
  }

  play() {
    if (this.playing) return;

    this.audio.play();
    this.playing = true;
  }

  pause() {
    if (!this.playing) return;

    this.audio.pause();
    this.playing = false;
  }

  handleEnded() {
    this.pause();
    this.disposeAudio();
  }

  handleTimeUpdate() {
    const currentTime = this.audio.currentTime;

    this.updateProgress(currentTime);
  }

  updateProgress(currentTime) {
    const percent = (currentTime * 100) / this.durationValue;

    if (this.hasProgressTarget) this.progressTarget.style.width = `${percent}%`;
    if (this.hasTimeTarget)
      this.timeTarget.textContent = secondsToDuration(currentTime);
  }

  disposeAudio() {
    if (!this.audio) return;

    this.removeAudioListeners();
    this.pause();
    this.updateProgress(0);

    delete this.audio;
  }

  setupAudioListeners() {
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.audio.addEventListener("ended", this.handleEnded);
  }

  removeAudioListeners() {
    this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);
    this.audio.removeEventListener("ended", this.handleEnded);
  }
}
