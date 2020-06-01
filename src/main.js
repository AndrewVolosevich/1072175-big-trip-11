import {render, RenderPosition} from "./utils/render";
import {tripEventMocks} from "./mock/trip-event";
import EventsModel from "./models/events";
import TripInfoComponent from "./components/trip-info";
import TripController from "./controllers/trip-controller";
import TripMenuController from "./controllers/trip-menu";


const eventsModel = new EventsModel();
eventsModel.setEvents(tripEventMocks);

const mainTripElem = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoComponent(tripEventMocks);
render(mainTripElem, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControlsElem = document.querySelector(`.trip-controls`);
const newEventHandler = () => {
  tripMenuController.setDefaultTab();
  tripMenuController.rerender();
  tripController.setSortDefault();
  tripController.createEvent();
};

export const tripMenuController = new TripMenuController(tripControlsElem, eventsModel, newEventHandler);
tripMenuController.render();

const tripEventsElem = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElem, eventsModel, tripMenuController);
tripController.render();
