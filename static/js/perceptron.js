const initializeWeights = (numberOfDendrites) => {
   const weights = [];
   for (let i = 0; i < numberOfDendrites; i++) {
      weights.push(0);
   }
   return weights;
};

class Perceptron {
   constructor(
      learningFactor,
      recognitionBorder,
      numberOfDendrites,
      activationFunction,
      derivativeActivationFunction,
      symbol
   ) {
      this.learningFactor = learningFactor;
      this.recognitionBorder = recognitionBorder;
      this.numberOfDendrites = numberOfDendrites;
      this.weights = initializeWeights(numberOfDendrites);
      this.activationFunction = activationFunction;
      this.derivativeActivationFunction = derivativeActivationFunction;
      this.symbol = symbol;
   }

   calculateSignal(dendrites) {
      let signal = 0;
      for (let i = 0; i < dendrites.length; i++) {
         signal += dendrites[i].isActive * this.weights[i];
      }
      return signal;
   }

   calculateOutput(signalValue) {
      return this.activationFunction(signalValue);
   }

   calculateError(correctValue, outputValue) {
      return correctValue - outputValue;
   }

   calculateDelta(errorValue, signalValue) {
      return errorValue * this.derivativeActivationFunction(signalValue);
   }

   calculateWeights(deltaValue, dendrites) {
      for (let i = 0; i < dendrites.length; i++) {
         this.weights[i] =
            this.weights[i] + this.learningFactor * deltaValue * dendrites[i].isActive;
      }
   }

   teach(dendrites, correctValue) {
      const signalValue = this.calculateSignal(dendrites);
      const outputValue = this.calculateOutput(signalValue);
      const errorValue = this.calculateError(correctValue, outputValue);
      const deltaValue = this.calculateDelta(errorValue, signalValue);
      this.calculateWeights(deltaValue, dendrites);
   }

   recognize(dendrites) {
      const signalValue = this.calculateSignal(dendrites);
      const outputValue = this.calculateOutput(signalValue);
      console.log('Similarity value: ' + outputValue);
      return outputValue > this.recognitionBorder;
   }
}

export default Perceptron;
