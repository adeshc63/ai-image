// export const validateSettings = (settings) => {
//   const errors = [];

//   if (settings.width < 64 || settings.width > 2048 || settings.width % 64 !== 0) {
//     errors.push('Width must be between 64 and 2048 and divisible by 64');
//   }

//   if (settings.height < 64 || settings.height > 2048 || settings.height % 64 !== 0) {
//     errors.push('Height must be between 64 and 2048 and divisible by 64');
//   }

//   if (settings.numInferenceSteps < 1 || settings.numInferenceSteps > 50) {
//     errors.push('Inference steps must be between 1 and 50');
//   }

//   if (settings.seed < 0) {
//     errors.push('Seed must be a positive number');
//   }

//   return errors;
// };

export const validateSettings = (settings) => {
  const errors = [];

  if (settings.width < 64 || settings.width > 2048) {
    errors.push('Width must be between 64 and 2048');
  }

  if (settings.height < 64 || settings.height > 2048) {
    errors.push('Height must be between 64 and 2048');
  }

  if (settings.numInferenceSteps < 1 || settings.numInferenceSteps > 50) {
    errors.push('Inference steps must be between 1 and 50');
  }

  if (settings.seed < 0) {
    errors.push('Seed must be a positive number');
  }

  return errors;
};
