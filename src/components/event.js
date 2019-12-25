import {generateTimeInterval, formatedTime} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createOfferTemplate = (options) => {
  return options
    .map((option) => {
      const {title, price} = option;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .join(`\n`);
};

const createTripEventTemplate = (event) => {
  const {type, title, dateStart, dateEnd, price, offers} = event;

  const offersList = createOfferTemplate(Array.from(offers));

  const dayStart = `${formatedTime(dateStart.getFullYear())}-${formatedTime(dateStart.getMonth() + 1)}-${formatedTime(dateStart.getDate())}`;
  const dayEnd = `${formatedTime(dateEnd.getFullYear())}-${formatedTime(dateEnd.getMonth() + 1)}-${formatedTime(dateEnd.getDate())}`;

  const timeStart = `${formatedTime(dateStart.getHours())}:${formatedTime(dateStart.getMinutes())}`;
  const timeEnd = `${formatedTime(dateEnd.getHours())}:${formatedTime(dateEnd.getMinutes())}`;
  const timeInterval = generateTimeInterval(dateStart, dateEnd);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayStart}T${timeStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayEnd}T${timeEnd}">${timeEnd}</time>
          </p>
          <p class="event__duration">${timeInterval}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  setButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
