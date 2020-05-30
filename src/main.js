import {render, RenderPosition} from "./utils/render";
import {tripEventMocks} from "./mock/trip-event";
import EventsModel from "./models/events";
import TripInfoComponent from "./components/trip-info";
import TripController from "./controllers/trip-controller";
import TripMenuController, {MenuItem} from "./controllers/trip-menu";
import TripTabsComponent from "./components/trip-tabs";
import FiltersController from "./controllers/filters-controller";

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventMocks);

const mainTripElem = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoComponent(tripEventMocks);
render(mainTripElem, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControlsElem = document.querySelector(`.trip-controls`);
const newEventHandler = () => {
  tripMenuController.setDefaultTab();
  tripMenuController.rerender();
  tripController.createEvent();
};

export const tripMenuController = new TripMenuController(tripControlsElem, eventsModel, newEventHandler);
tripMenuController.render();

// const tripTabsComponent = new TripTabsComponent();
// render(tripControlsElem.querySelector(`h2`), tripTabsComponent, RenderPosition.AFTER);
// const filtersController = new FiltersController(tripControlsElem, eventsModel);
// filtersController.render();

const tripEventsElem = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElem, eventsModel, tripMenuController.getFiltersController());
tripController.render();
