import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
