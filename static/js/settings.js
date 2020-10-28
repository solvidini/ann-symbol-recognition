export const learningFactor = 0.25;
export const recognitionBorder = 0.62;
export const numberOfDendrites = 144;

export const linearActivation = (signal) => signal;

export const sigmoidActivation = (signal) => 1 / (1 + Math.exp(-signal));

export const derivativeSigmoidActivation = (signal) =>
   Math.exp(-signal) / Math.pow(1 + Math.exp(-signal), 2);
