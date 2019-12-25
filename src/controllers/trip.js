import SortComponent from '../components/sorting.js';
import DayComponent from '../components/day.js';
import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import NoEventsComponent from '../components/no-events.js';
import BoardComponent from '../components/board.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const renderEvent = (pageTripEventsElem, event) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  eventComponent.setButtonHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setSubmitHandler(replaceEditToEvent);

  render(pageTripEventsElem, eventComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noEventsComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._boardComponent = new BoardComponent();
  }

  render(events) {
    if (events.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

      render(this._container, this._boardComponent, RenderPosition.BEFOREEND);

      const pageTripDaysElem = this._container.querySelector(`.trip-days`);
      render(pageTripDaysElem, new DayComponent(events[0]), RenderPosition.BEFOREEND);

      const pageTripEventsElem = pageTripDaysElem.querySelector(`.trip-events__list`);
      events.forEach((event) => renderEvent(pageTripEventsElem, event));
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }
}
