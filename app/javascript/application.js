// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

import Idiomorph from "idiomorph";

let prevPath = window.location.pathname;

document.addEventListener("turbo:before-render", (event) => {
  Turbo.navigator.currentVisit.scrolled = prevPath === window.location.pathname;
  prevPath = window.location.pathname;
  event.detail.render = async (prevEl, newEl) => {
    await new Promise((resolve) => setTimeout(() => resolve(), 0));
    Idiomorph.morph(prevEl, newEl, {
      callbacks: {
        beforeNodeMorphed: (fromEl, toEl) => {
          if (typeof fromEl !== "object" || !fromEl.hasAttribute) return true;
          if (fromEl.isEqualNode(toEl)) return false;

          if (
            fromEl.hasAttribute("data-morph-permanent") &&
            toEl.hasAttribute("data-morph-permanent")
          ) {
            return false;
          }

          return true;
        },
      },
    });
  };
});

document.addEventListener("turbo:before-frame-render", (event) => {
  event.detail.render = (prevEl, newEl) => {
    Idiomorph.morph(prevEl, newEl.children, { morphStyle: "innerHTML" });
  };
});
