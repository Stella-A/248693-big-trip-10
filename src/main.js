import {generateEvents} from './mock/event.js';
import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import FilterComponent from './components/filter.js';
import DayComponent from './components/day.js';
import EventComponent from './components/event.js';
import EventEditComponent from './components/event-edit.js';
import EventInfoComponent from './components/event-info.js';
import BoardComponent from './components/board.js';
import {render, RenderPosition} from './util.js';

const EVENT_COUNT = 3;

const renderTask = (event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    pageTripEventsElem.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  });

  const editForm = eventEditComponent.getElement().querySelector(`.event__save-btn`);
  editForm.addEventListener(`click`, () => {
    pageTripEventsElem.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  });

  render(pageTripEventsElem, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageHeaderElem = document.querySelector(`.trip-main`);
const pageInfoElem = pageHeaderElem.querySelector(`.trip-info`);
const pageControlElem = pageHeaderElem.querySelector(`.trip-controls`);
const pageTitleControlElem = pageHeaderElem.querySelector(`h2:nth-child(2)`);
render(pageInfoElem, new EventInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(pageTitleControlElem, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(pageControlElem, new FilterComponent().getElement());

const pageMainElem = document.querySelector(`.page-main`);
const pageEventsElem = pageMainElem.querySelector(`.trip-events`);
const events = generateEvents(EVENT_COUNT);
render(pageEventsElem, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(pageEventsElem, boardComponent.getElement(), RenderPosition.BEFOREEND);

const pageTripDaysElem = pageEventsElem.querySelector(`.trip-days`);
render(pageTripDaysElem, new DayComponent(events[1]).getElement(), RenderPosition.BEFOREEND);

const pageTripEventsElem = pageTripDaysElem.querySelector(`.trip-events__list`);
events.forEach((event) => renderTask(event));
