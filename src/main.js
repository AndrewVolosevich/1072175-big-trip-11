import {render, RenderPosition} from "./utils/render";
import {tripEventMocks, datesArr} from "./mock/trip-event";
import {filterItems} from "./consts";
import TripInfoComponent from "./components/trip-info";
import TripTabsComponent from "./components/trip-tabs";
import TripFiltersComponent from "./components/trip-filters";


import TripController from "./controllers/trip-controller";


const mainTripElem = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoComponent(tripEventMocks);
render(mainTripElem, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControlsElem = document.querySelector(`.trip-controls`);

const tripTabsComponent = new TripTabsComponent();
render(tripControlsElem.querySelector(`h2`), tripTabsComponent, RenderPosition.AFTER);

const tripFiltersComponent = new TripFiltersComponent(filterItems);
render(tripControlsElem, tripFiltersComponent, RenderPosition.BEFOREEND);

const tripEventsElem = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElem);
tripController.render(tripEventMocks);
