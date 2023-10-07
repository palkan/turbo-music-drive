// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

import Idiomorph from "idiomorph";

let prevPath = window.location.pathname;

const morphRender = (prevEl, newEl) => {
  return Idiomorph.morph(prevEl, newEl, {
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

const withViewTransitions = async (callback) => {
  await document.startViewTransition(callback).finished.then(() => {
    resetTransitions();
  });
};

const transitionAttr = "data-turbo-transition";
const activeTransitionAttr = "data-turbo-transition-active";

const resetTransitions = (scope) => {
  scope = scope || document;

  scope.querySelectorAll(`[${activeTransitionAttr}]`).forEach((el) => {
    el.style.viewTransitionName = "";
    el.removeAttribute(activeTransitionAttr);
  });
};

// This function is responsible for picking the transition elements for the current navigation.
// The selection criteria are as follows:
// - IDs must be present in both old and new views
// - There must be unique within for the corresponding transition name (if present)
const activateTransitions = (prevEl, newEl) => {
  let transitions = Array.from(
    prevEl.querySelectorAll(`[${transitionAttr}]`)
  ).reduce((acc, el) => {
    const id = el.id || "0";
    const name = el.getAttribute(transitionAttr) || `$${id}`;

    if (!acc[name]) {
      acc[name] = { ids: {}, active: false, discarded: false };
    }

    acc[name].ids[id] = el;
    return acc;
  }, {});

  Array.from(newEl.querySelectorAll(`[${transitionAttr}]`)).forEach((el) => {
    const id = el.id || "0";
    const name = el.getAttribute(transitionAttr) || `$${id}`;

    // If prev state has a matching element
    if (transitions[name] && transitions[name].ids[id]) {
      // If we already found one, we discard everything
      // (since there is no way to decide which one to choose)
      if (transitions[name].active) {
        transitions[name].discarded = true;
        return;
      }

      // Otherwise, we register the new element and mark transition
      // as active
      transitions[name].newEl = el;
      transitions[name].oldEl = transitions[name].ids[id];
      transitions[name].active = true;
    }
  });

  console.log("transitions: %o", transitions);

  for (let name in transitions) {
    let { newEl, oldEl, active, discarded } = transitions[name];

    if (discarded || !active) continue;

    oldEl.style.viewTransitionName = name;
    newEl.style.viewTransitionName = name;
    oldEl.setAttribute(activeTransitionAttr, "");
    newEl.setAttribute(activeTransitionAttr, "");
  }
};

document.addEventListener("turbo:before-render", (event) => {
  Turbo.navigator.currentVisit.scrolled = prevPath === window.location.pathname;
  prevPath = window.location.pathname;

  if (document.startViewTransition) {
    event.detail.render = (prevEl, newEl) => {
      morphRender(prevEl, newEl);
    };

    event.preventDefault();

    resetTransitions(document.body);

    activateTransitions(document.body, event.detail.newBody);

    withViewTransitions(async () => {
      await event.detail.resume();
    });
  } else {
    event.detail.render = async (prevEl, newEl) => {
      await new Promise((resolve) => setTimeout(() => resolve(), 0));
      await morphRender(prevEl, newEl);
    };
  }
});

document.addEventListener("turbo:load", () => {
  if (document.head.querySelector('meta[name="view-transition"]'))
    Turbo.cache.exemptPageFromCache();
});

document.addEventListener("turbo:before-frame-render", (event) => {
  event.detail.render = (prevEl, newEl) => {
    Idiomorph.morph(prevEl, newEl.children, { morphStyle: "innerHTML" });
  };
});
