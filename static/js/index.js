import {
   learningFactor,
   recognitionBorder,
   numberOfDendrites,
   sigmoidActivation,
   derivativeSigmoidActivation,
} from './settings.js';
import Perceptron from './perceptron.js';
import { resetDendrites, toggleDendriteActivation } from './utils.js';

// HTML ELEMENTS
const learningStep = document.querySelector('.learning-step');
const grid = document.querySelector('.grid');
const inputSymbol = document.querySelector('#input-symbol');
const inputCheck = document.querySelector('#input-check');
const buttonReset = document.querySelector('#button-reset');
const buttonClear = document.querySelector('#button-clear');
const buttonTeach = document.querySelector('#button-teach');
const buttonRecognize = document.querySelector('#button-recognize');
const result = document.querySelector('.result');

// MAIN APP VARIABLES
const dendrites = [];
let symbol = undefined;
let isMouseDown = false;
let step = 0;

// PERCEPTRON INITIALIZATION
let perceptron = null;

// BASIC EVENT LISTENERS
buttonTeach.addEventListener('click', (event) => {
   if (!inputSymbol.value.trim()) return false;
   if (!symbol) {
      symbol = inputSymbol.value;
      inputSymbol.disabled = true;
      perceptron = new Perceptron(
         learningFactor,
         recognitionBorder,
         numberOfDendrites,
         sigmoidActivation,
         derivativeSigmoidActivation,
         symbol
      );
   }
   perceptron.teach(dendrites, +inputCheck.checked);
   resetDendrites(dendrites);
   step++;
   learningStep.textContent = `Learning step: ${step}`;
});

buttonRecognize.addEventListener('click', (event) => {
   if (!symbol) return false;
   if (perceptron.recognize(dendrites)) {
      result.classList.remove('result--incorrect');
      result.classList.add('result--correct');
      result.textContent = `This is the "${symbol}" symbol.`;
   } else {
      result.classList.add('result--incorrect');
      result.classList.remove('result--correct');
      result.textContent = `This is not a "${symbol}" symbol.`;
   }
});

buttonClear.addEventListener('click', (event) => {
   resetDendrites(dendrites);
});

buttonReset.addEventListener('click', (event) => {
   location.reload();
});

grid.addEventListener(
   'mousedown',
   (event) => {
      event.preventDefault();
      isMouseDown = true;
   },
   true
);

grid.addEventListener(
   'mouseup',
   (event) => {
      event.preventDefault();
      isMouseDown = false;
   },
   true
);

//GRID INITIALIZATION
for (let i = 0; i < numberOfDendrites; i++) {
   const id = `dendrite-${i}`;
   dendrites.push({ id: id, isActive: false });

   const node = document.createElement('div');
   node.classList.add('grid__item');
   node.setAttribute('id', id);
   node.addEventListener('mousedown', (event) =>
      toggleDendriteActivation(event, id, dendrites, isMouseDown)
   );
   node.addEventListener('pointerover', (event) =>
      toggleDendriteActivation(event, id, dendrites, isMouseDown)
   );
   grid.appendChild(node);
}
