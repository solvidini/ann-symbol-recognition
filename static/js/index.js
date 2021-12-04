import {
  learningFactor,
  recognitionBorder,
  numberOfDendrites,
  sigmoidActivation,
  derivativeSigmoidActivation,
} from "./settings.js";
import Neuron from "./neuron.js";
import {
  resetDendrites,
  activateDendrite,
  deactivateDendrite,
} from "./utils.js";

// HTML ELEMENTS
const app = document.querySelector("#app");
const learningStep = document.querySelector(".learning-step");
const grid = document.querySelector(".grid");
const inputSymbol = document.querySelector("#input-symbol");
const inputCheck = document.querySelector("#input-check");
const buttonReset = document.querySelector("#button-reset");
const buttonClear = document.querySelector("#button-clear");
const buttonTeach = document.querySelector("#button-teach");
const buttonRecognize = document.querySelector("#button-recognize");
const result = document.querySelector(".result");
const similarity = document.querySelector(".similarity");

// MAIN APP VARIABLES
const dendrites = [];
let symbol = undefined;
let isMouseDown = false;
let step = 0;

let neuron = null;

// EVENT FUNCTIONS
const onTeachHandler = () => {
  if (!inputSymbol.value.trim()) return false;
  if (!symbol) {
    symbol = inputSymbol.value;
    inputSymbol.disabled = true;
    neuron = new Neuron(
      learningFactor,
      recognitionBorder,
      numberOfDendrites,
      sigmoidActivation,
      derivativeSigmoidActivation,
      symbol,
      similarity
    );
  }
  neuron.teach(dendrites, +inputCheck.checked);
  resetDendrites(dendrites);
  step++;
  learningStep.textContent = `Learning step:\xa0${step}`;
};

const onRecognizeHandler = () => {
  if (!symbol) return false;
  if (neuron.recognize(dendrites)) {
    result.classList.remove("result--incorrect");
    result.classList.add("result--correct");
    result.textContent = `This is the "${symbol}" symbol.`;
  } else {
    result.classList.add("result--incorrect");
    result.classList.remove("result--correct");
    result.textContent = `This is not a "${symbol}" symbol.`;
  }
};

// BASIC EVENT LISTENERS
buttonTeach.addEventListener("click", onTeachHandler);

buttonRecognize.addEventListener("click", onRecognizeHandler);

buttonClear.addEventListener("click", () => {
  resetDendrites(dendrites);
});

buttonReset.addEventListener("click", () => {
  location.reload();
});

app.addEventListener(
  "mousedown",
  () => {
    isMouseDown = true;
  },
  true
);

app.addEventListener(
  "mouseup",
  () => {
    isMouseDown = false;
  },
  true
);

//GRID INITIALIZATION
for (let i = 0; i < numberOfDendrites; i++) {
  const id = `dendrite-${i}`;
  dendrites.push({ id: id, isActive: false });

  const node = document.createElement("div");
  node.classList.add("grid__item");
  node.setAttribute("id", id);
  node.addEventListener("mousedown", (event) =>
    activateDendrite(event, id, dendrites, isMouseDown)
  );
  node.addEventListener("pointerover", (event) =>
    activateDendrite(event, id, dendrites, isMouseDown)
  );
  node.addEventListener("touchmove", (event) =>
    activateDendrite(event, id, dendrites, isMouseDown)
  );
  node.addEventListener("contextmenu", (event) =>
    deactivateDendrite(event, id, dendrites)
  );
  grid.appendChild(node);
}
