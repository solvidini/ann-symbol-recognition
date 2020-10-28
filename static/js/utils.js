import { numberOfDendrites } from './settings.js';

const grid = document.querySelector('.grid');

export const resetDendrites = (event, dendrites) => {
   event.preventDefault();
   for (let i = 0; i < numberOfDendrites; i++) {
      dendrites[i].isActive = false;
      const node = grid.querySelector(`#dendrite-${i}`);
      node.classList.remove('grid__item--active');
   }
};

export const toggleDendriteActivation = (event, id, dendrites, isMouseDown) => {
   event.preventDefault();
   if (isMouseDown) {
      const node = event.target;
      const index = dendrites.findIndex((dendrite) => dendrite.id === id);
      dendrites[index].isActive = true;
      node.classList.add('grid__item--active');
   }
};