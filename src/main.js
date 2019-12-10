import {generateEvents} from './mock/event.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import FilterComponent from './components/filter.js';
import DayComponent from './components/day.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';
import EventInfoComponent from './components/event-info.js';
import NoEventsComponent from './components/no-events.js';
import BoardComponent from './components/board.js';
import {render, RenderPosition} from './util.js';

const EVENT_COUNT = 3;

const renderEvent = (pageTripEventsElem, event) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToEvent = () => {
    pageTripEventsElem.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const replaceEventToEdit = () => {
    pageTripEventsElem.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  editForm.addEventListener(`click`, replaceEditToEvent);

  render(pageTripEventsElem, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageHeaderElem = document.querySelector(`.trip-main`);
const pageInfoElem = pageHeaderElem.querySelector(`.trip-info`);
const pageControlElem = pageHeaderElem.querySelector(`.trip-controls`);

render(pageInfoElem, new EventInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(pageControlElem, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(pageControlElem, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const pageMainElem = document.querySelector(`.page-main`);
const pageEventsElem = pageMainElem.querySelector(`.trip-events`);
const events = generateEvents(EVENT_COUNT);

if (events.length > 0) {
  render(pageEventsElem, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

  const boardComponent = new BoardComponent();
  render(pageEventsElem, boardComponent.getElement(), RenderPosition.BEFOREEND);

  const pageTripDaysElem = pageEventsElem.querySelector(`.trip-days`);
  render(pageTripDaysElem, new DayComponent(events[0]).getElement(), RenderPosition.BEFOREEND);

  const pageTripEventsElem = pageTripDaysElem.querySelector(`.trip-events__list`);
  events.forEach((event) => renderEvent(pageTripEventsElem, event));
} else {
  render(pageEventsElem, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
}
