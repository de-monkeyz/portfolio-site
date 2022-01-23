export const COLORS = {
  foreground: {
    light: "hsla(0, 0%, 26.7%, 1)", // white
    dark: "hsla(0, 0%, 98%, 1)", // near-black
  },
  background: {
    light: "hsla(0, 0%, 98%, 1)", // white
    dark: "hsla(210, 10%, 21.5%, 1)", // navy navy blue
  },
  primary: {
    light: "hsla(203, 71.2%, 44.9%, 1)", // Pinkish-red
    dark: "hsla(202, 95.5%, 74.1%, 1)", // Yellow
  },
  secondary: {
    light: "hsla(10, 100%, 70%, 1)", // Purplish-blue
    dark: "hsla(10, 100%, 70%, 1)", // Cyan
  },
  panel: {
    light: "hsla(0, 0%, 98.4%, 1)", // Purplish-blue
    dark: "hsla(210, 10%, 27.5%, 1)", // Cyan
  },
  sidebar: {
    light:
      "linear-gradient(90deg, rgba(69, 69, 69, 0.05) 0%, rgba(69, 69, 69, 0) 3.65%), #F7F7F7",
    dark: "linear-gradient(90deg, #333A41 0%, rgba(15, 15, 15, 0) 3.65%), #3F464D",
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
