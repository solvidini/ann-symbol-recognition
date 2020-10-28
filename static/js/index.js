import { numberOfDendrites } from './settings.js';
import { resetDendrites, toggleDendriteActivation } from './utils.js';

// HTML ELEMENTS
const app = document.querySelector('#app');
const grid = document.querySelector('.grid');
const buttonReset = document.querySelector('#button-reset');
const buttonTeach = document.querySelector('#button-teach');
const buttonRecognize = document.querySelector('#button-recognize');

const dendrites = [];
let isMouseDown = false;

buttonReset.addEventListener('click', (event) => resetDendrites(event, dendrites));
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
