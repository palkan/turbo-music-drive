import { Application } from "@hotwired/stimulus";
import AnimatedNumber from "stimulus-animated-number";

const application = Application.start();

// Configure Stimulus development experience
application.debug = new URLSearchParams(window.location.search).has("debug");
window.Stimulus = application;

// Register third-party controllers
application.register("animated-number", AnimatedNumber);

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading";
eagerLoadControllersFrom("controllers", application);
