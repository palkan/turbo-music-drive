import { Application } from "@hotwired/stimulus";
import { registerControllers } from "stimulus-vite-helpers";

const application = Application.start();

// Configure Stimulus development experience
application.debug = new URLSearchParams(window.location.search).has("debug");
window.Stimulus = application;

const controllers = import.meta.glob('./**/*_controller.js', { eager: true });
registerControllers(application, controllers);
