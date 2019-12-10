import {generateFilter} from '../mock/filter.js';
import {createElement} from '../util.js';

const createFilterItemTemplate = (filters) => {
  return filters
    .map((filter) => {
      const isChecked = Math.random() > 0.5 ? `checked` : ``;

      return (
        `<div class="trip-filters__filter">
          <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${isChecked}>
          <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
        </div>`
      );
    })
    .join(`\n`);
};

const createFilterTemplate = () => {
  const filters = createFilterItemTemplate(generateFilter());

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filters}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
