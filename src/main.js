import {createTripInfo} from './components/trip-info';
import {createTripTabs} from './components/trip-tabs';
import {createTripFilters} from './components/trip-filters';
import {createTripSorting} from './components/trip-sorting';
import {createTripEventForm} from './components/trip-event-form';
import {createMokiTripDays} from './components/trip-moki-days';
import {createTripEventItem} from './components/trip-event-item';

const MAX_ITEMS = 3;

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainTripElem = document.querySelector(`.trip-main`);
const tripControlsElem = document.querySelector(`.trip-controls`);
const tripEventsElem = document.querySelector(`.trip-events`);

renderTemplate(mainTripElem, createTripInfo(), `afterbegin`);
renderTemplate(tripControlsElem.querySelector(`h2`), createTripTabs(), `afterend`);
renderTemplate(tripControlsElem, createTripFilters());
renderTemplate(tripEventsElem, createTripSorting());
renderTemplate(tripEventsElem, createTripEventForm());
renderTemplate(tripEventsElem, createMokiTripDays());

const tripEventsListElem = document.querySelector(`.trip-events__list`);

for (let i = 1; i <= MAX_ITEMS; i++) {
  renderTemplate(tripEventsListElem, createTripEventItem());
}
