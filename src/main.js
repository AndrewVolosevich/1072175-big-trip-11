import {render, RenderPosition} from "./utils/render";
import {tripEventMocks} from "./mock/trip-event";
import {filterItems} from "./consts";
import EventsModel from "./models/events";
import TripInfoComponent from "./components/trip-info";
import TripTabsComponent from "./components/trip-tabs";
import TripFiltersComponent from "./components/trip-filters";
import TripController from "./controllers/trip-controller";


const mainTripElem = document.querySelector(`.trip-main`);
const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventMocks);

const tripInfoComponent = new TripInfoComponent(tripEventMocks);
render(mainTripElem, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControlsElem = document.querySelector(`.trip-controls`);

const tripTabsComponent = new TripTabsComponent();
render(tripControlsElem.querySelector(`h2`), tripTabsComponent, RenderPosition.AFTER);

const tripFiltersComponent = new TripFiltersComponent(filterItems);
render(tripControlsElem, tripFiltersComponent, RenderPosition.BEFOREEND);

const tripEventsElem = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElem, eventsModel);
tripController.render(tripEventMocks);
