import {generateEvents} from './mock/event.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import EventInfoComponent from './components/event-info.js';
import TripController from './controllers/trip.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 3;

const pageHeaderElem = document.querySelector(`.trip-main`);
const pageInfoElem = pageHeaderElem.querySelector(`.trip-info`);
const pageControlElem = pageHeaderElem.querySelector(`.trip-controls`);

render(pageInfoElem, new EventInfoComponent(), RenderPosition.AFTERBEGIN);
render(pageControlElem, new MenuComponent(), RenderPosition.BEFOREEND);
render(pageControlElem, new FilterComponent(), RenderPosition.BEFOREEND);

const pageMainElem = document.querySelector(`.page-main`);
const pageEventsElem = pageMainElem.querySelector(`.trip-events`);
const events = generateEvents(EVENT_COUNT);

const tripController = new TripController(pageEventsElem);

tripController.render(events);
