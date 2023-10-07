import AnimatedNumber from "stimulus-animated-number";

export default class extends AnimatedNumber {
  connect() {
    super.connect();
  }

  endValueChanged(_newValue, oldValue) {
    this.startValue = oldValue;
    this.animate();
  }
}
