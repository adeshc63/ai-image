export const ASPECT_RATIO_PRESETS = [
  { name: 'HD (1280x720)', width: 1280, height: 720 },
  { name: 'Full HD (1920x1080)', width: 1920, height: 1080 },
  { name: '2K (2048x1152)', width: 2048, height: 1152 },
  { name: 'Custom', width: null, height: null }
];

export const DEFAULT_SETTINGS = {
  seed: 968327192,
  width: 1920,
  height: 1080,
  numInferenceSteps: 9,
  selectedPreset: 'Full HD (1920x1080)'
};

export const generateRandomSeed = () => {
  return Math.floor(Math.random() * 1000000000);
};

export const clampValue = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};