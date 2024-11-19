import { TurboMount } from "turbo-mount";
import { registerComponent } from "turbo-mount/react";
import Player from "../components/Player";

const turboMount = new TurboMount();

registerComponent(turboMount, "Player", Player);
