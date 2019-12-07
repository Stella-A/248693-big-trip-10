import {MonthNames} from '../const.js';
import {formatedTime, createElement} from '../util.js';

const createTripDayTemplate = (event) => {
  const {dateStart} = event;

  const dayStart = `${formatedTime(dateStart.getFullYear())}-${formatedTime(dateStart.getMonth() + 1)}-${formatedTime(dateStart.getDate())}`;
  const month = MonthNames[dateStart.getMonth()].toLowerCase();
  const day = formatedTime(dateStart.getDate());

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${dayStart}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createTripDayTemplate(this._event);
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
