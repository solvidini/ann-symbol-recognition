const grid = document.querySelector('.grid');

export const resetDendrites = (dendrites) => {
   for (let i = 0; i < dendrites.length; i++) {
      dendrites[i].isActive = 0;
      const node = grid.querySelector(`#dendrite-${i}`);
      node.classList.remove('grid__item--active');
   }
};

export const toggleDendriteActivation = (event, id, dendrites, isMouseDown) => {
   event.preventDefault();
   if (isMouseDown) {
      const node = event.target;
      const index = dendrites.findIndex((dendrite) => dendrite.id === id);
      dendrites[index].isActive = 1;
      node.classList.add('grid__item--active');
   }
};
