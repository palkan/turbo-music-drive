import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    if (!document.startViewTransition) {
      this.element.classList.remove("hidden");
    }
  }

  hide() {
    this.element.classList.add("hidden");
  }
}
