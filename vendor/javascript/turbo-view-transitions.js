// This method checks if View Transitions API is supported and
// page has the view-transition meta tag.
// TODO: Should we check for the value of the tag (same-origin, what else?)
export function shouldPerformTransition() {
  if (
    typeof document !== "undefined" &&
    document.head &&
    document.startViewTransition &&
    document.head.querySelector('meta[name="view-transition"]')
  ) {
    return true;
  }

  return false;
}

const defaultTransitionAttr = "data-turbo-transition";
const defaultActiveTransitionAttr = "data-turbo-transition-active";

// This function removes view-transition-name from all previously activated elements
const resetTransitions = (scope, opts) => {
  scope = scope || document;

  let { activeAttr } = opts;

  scope.querySelectorAll(`[${activeAttr}]`).forEach((el) => {
    el.style.viewTransitionName = "";
    el.removeAttribute(activeAttr);
  });
};

// This function is responsible for picking the transition elements for the current navigation.
// The selection criteria are as follows:
// - IDs must be present in both old and new views
// - There must be unique within for the corresponding transition name (if present)
const activateTransitions = (prevEl, nextEl, opts) => {
  let { transitionAttr, activeAttr } = opts;

  let transitions = Array.from(
    prevEl.querySelectorAll(`[${transitionAttr}]`)
  ).reduce((acc, el) => {
    let id = el.id || "0";
    let name = el.getAttribute(transitionAttr) || `$${id}`;

    if (!acc[name]) {
      acc[name] = { ids: {}, active: false, discarded: false };
    }

    acc[name].ids[id] = el;
    return acc;
  }, {});

  Array.from(nextEl.querySelectorAll(`[${transitionAttr}]`)).forEach((el) => {
    let id = el.id || "0";
    let name = el.getAttribute(transitionAttr) || `$${id}`;

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

  for (let name in transitions) {
    let { newEl, oldEl, active, discarded } = transitions[name];

    if (discarded || !active) continue;

    oldEl.style.viewTransitionName = name;
    newEl.style.viewTransitionName = name;
    oldEl.setAttribute(activeAttr, "");
    newEl.setAttribute(activeAttr, "");
  }
};

export async function performTransition(fromEl, toEl, callback, opts = {}) {
  opts.activeAttr = opts.activeAttr || defaultActiveTransitionAttr;
  opts.transitionAttr = opts.transitionAttr || defaultTransitionAttr;

  resetTransitions(fromEl, opts);
  activateTransitions(fromEl, toEl, opts);

  await document.startViewTransition(callback).finished.then(() => {
    resetTransitions(fromEl, opts);
  });
}
