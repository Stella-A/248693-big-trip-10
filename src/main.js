import {generateEvents} from './mock/event.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sorting.js';
import {createFilterTemplate} from './components/filter.js';
import {createTripDayTemplate} from './components/day.js';
import {createTripEventTemplate} from './components/event.js';
import {createEditTripEventTemplate} from './components/event-edit.js';
import {createInfoTripTemplate} from './components/event-info.js';
import {createBoardTemplate} from './components/board.js';

const EVENT_COUNT = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeaderElem = document.querySelector(`.trip-main`);
const pageInfoElem = pageHeaderElem.querySelector(`.trip-info`);
const pageControlElem = pageHeaderElem.querySelector(`.trip-controls`);
const pageTitleControlElem = pageHeaderElem.querySelector(`h2:nth-child(2)`);

render(pageInfoElem, createInfoTripTemplate(), `afterbegin`);
render(pageTitleControlElem, createMenuTemplate(), `beforebegin`);
render(pageControlElem, createFilterTemplate());

const pageMainElem = document.querySelector(`.page-main`);
const pageEventsElem = pageMainElem.querySelector(`.trip-events`);
const events = generateEvents(EVENT_COUNT);

render(pageEventsElem, createSortTemplate());
render(pageEventsElem, createEditTripEventTemplate(events[0]));

render(pageEventsElem, createBoardTemplate());

const pageTripDaysElem = pageEventsElem.querySelector(`.trip-days`);

render(pageTripDaysElem, createTripDayTemplate(events[1]));

const pageTripEventsElem = pageTripDaysElem.querySelector(`.trip-events__list`);

render(pageTripEventsElem, createEditTripEventTemplate(events[1]));
events.slice(2, EVENT_COUNT).forEach((event) => render(pageTripEventsElem, createTripEventTemplate(event)));
