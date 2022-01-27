export const COLORS = {
  foreground: {
    light: "hsla(0, 0%, 26.7%, 1)", // white
    dark: "hsla(0, 0%, 98%, 1)", // near-black
  },
  background: {
    light: "hsla(0, 0%, 98%, 1)", // white
    dark: "hsla(210, 10%, 21.5%, 1)", // navy navy blue
  },
  empty: {
    light: "hsla(0, 0%, 90%, 1)", // white
    dark: "hsla(210, 10%, 11.5%, 1)", // navy navy blue
  },
  primary: {
    light: "hsla(203, 71.2%, 44.9%, 1)", // Pinkish-red
    dark: "hsla(202, 95.5%, 74.1%, 1)", // Yellow
  },
  primaryActive: {
    light: "hsla(203, 71.2%, 34.9%, 1)", // Pinkish-red
    dark: "hsla(202, 95.5%, 80.1%, 1)", // Yellow
  },
  secondary: {
    light: "hsla(10, 100%, 70%, 1)", // Purplish-blue
    dark: "hsla(10, 100%, 70%, 1)", // Cyan
  },
  secondaryActive: {
    light: "hsla(10, 100%, 65%, 1)", // Purplish-blue
    dark: "hsla(10, 100%, 65%, 1)", // Cyan
  },
  panel: {
    light: "hsla(0, 0%, 93.4%, 1)", // Purplish-blue
    dark: "hsla(210, 10%, 27.5%, 1)", // Cyan
  },
  sidebar: {
    light: "#F7F7F7",
    dark: "#3F464D",
  },
};

export const EFFECTS = {
  lowShadow: {
    light:
      "-0.20000000298023224px 0.699999988079071px 0.800000011920929px rgba(168, 168, 168, 0.32), -0.4000000059604645px 1.100000023841858px 1.2999999523162842px rgba(168, 168, 168, 0.31), -0.800000011920929px 2.5999999046325684px 3px rgba(168, 168, 168, 0.3)",
    dark: "-0.20000000298023224px 0.699999988079071px 0.800000011920929px rgba(43, 43, 43, 0.32), -0.4000000059604645px 1.100000023841858px 1.2999999523162842px rgba(43, 43, 43, 0.31), -0.800000011920929px 2.5999999046325684px 3px rgba(43, 43, 43, 0.3)",
  },
  initialRotation: {
    light: "rotate(0deg) translateZ(0px)",
    dark: "rotate(180deg) translateZ(0px)",
  },
};

export const COLOR_MODE_KEY = "color-mode";
export const INITIAL_COLOR_MODE_CSS_PROP = "--initial-color-mode";
export type ColorMode = "dark" | "light";

/*  --side--panel: hsla(0, 0%, 96.5%, 1);
    --dark---background: hsla(0, 1.9%, 20.4%, 1);
    --dark---foreground: hsla(0, 0%, 98%, 1);
    --dark---panel: hsla(210, 10%, 27.5%, 1);
    --dark---primary: hsla(202, 95.5%, 74.1%, 1);
    --light---primary: hsla(203, 71.2%, 44.9%, 1);
    --dark---border: hsla(233, 18.8%, 26.1%, 1);
    --light---background: hsla(0, 0%, 98%, 1);
    --light---foreground: hsla(0, 0%, 26.7%, 1);
    --light---panel: hsla(0, 0%, 98.4%, 1);
    --dark---secondary: hsla(10, 100%, 70%, 1);
    --light---secondary: hsla(10, 100%, 70%, 1); */
