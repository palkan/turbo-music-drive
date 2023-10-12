import AnimatedNumber from "stimulus-animated-number";

export default class extends AnimatedNumber {
  endValueChanged(_newValue, oldValue) {
    this.startValue = oldValue;
    this.animate();
  }
}
