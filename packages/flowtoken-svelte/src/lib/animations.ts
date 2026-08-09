export const animations = {
  fadeIn: "ft-fadeIn",
  slideUp: "ft-slideUp",
  wave: "ft-wave",
  elastic: "ft-elastic",
  bounceIn: "ft-bounceIn",
  rotateIn: "ft-rotateIn",
  colorTransition: "ft-colorTransition",
  fadeAndScale: "ft-fadeAndScale",
  slideInFromLeft: "ft-slideInFromLeft",
  blurIn: "ft-blurIn",
  typewriter: "ft-typewriter",
  highlight: "ft-highlight",
  blurAndSharpen: "ft-blurAndSharpen",
  dropIn: "ft-dropIn",
} as const;

export type FlowTokenAnimation = keyof typeof animations;

export function resolveAnimationName(name: string): string {
  return animations[name as FlowTokenAnimation] ?? name;
}

export function mapStreamdownAnimation(name: string): boolean | "blur" | "slide-up" | "slide-down" {
  switch (name) {
    case "fadeIn":
    case "fadeAndScale":
    case "highlight":
    case "colorTransition":
    case "rotateIn":
    case "bounceIn":
    case "elastic":
    case "wave":
    case "typewriter":
      return true;
    case "blurIn":
    case "blurAndSharpen":
      return "blur";
    case "slideUp":
      return "slide-up";
    case "dropIn":
    case "slideInFromLeft":
      return "slide-down";
    default:
      return true;
  }
}
