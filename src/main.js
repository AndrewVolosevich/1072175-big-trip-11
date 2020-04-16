import {createTripInfo} from './components/trip-info';
import {createTripTabs} from './components/trip-tabs';
import {createTripFilters} from './components/trip-filters';
import {createTripSorting} from './components/trip-sorting';
import {createTripEventForm} from './components/trip-event-form';
import {createTripDays} from './components/trip-days';
import {tripEventMocks} from './mock/trip-event';
import {sortItems, filterItems} from './const';

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainTripElem = document.querySelector(`.trip-main`);
const tripControlsElem = document.querySelector(`.trip-controls`);
const tripEventsElem = document.querySelector(`.trip-events`);

renderTemplate(mainTripElem, createTripInfo(tripEventMocks), `afterbegin`);
renderTemplate(tripControlsElem.querySelector(`h2`), createTripTabs(), `afterend`);
renderTemplate(tripControlsElem, createTripFilters(filterItems));
renderTemplate(tripEventsElem, createTripSorting(sortItems));
renderTemplate(tripEventsElem, createTripEventForm(tripEventMocks[0]));
renderTemplate(tripEventsElem, createTripDays(tripEventMocks));
