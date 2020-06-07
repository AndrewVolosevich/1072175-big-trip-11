import {render, RenderPosition} from "./utils/render";
import EventsModel from "./models/events";
import TripInfoComponent from "./components/trip-info";
import TripController from "./controllers/trip-controller";
import TripMenuController, {MenuItem} from "./controllers/trip-menu";
import StatisticsComponent from "./components/statistics";
import ServerAPI from "./serverApi";
import {AUTHORIZATION, END_POINT} from "./consts";

const serverAPI = new ServerAPI(END_POINT, AUTHORIZATION);
serverAPI.getOptions();

const eventsModel = new EventsModel();
const mainTripElem = document.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoComponent();
const tripControlsElem = document.querySelector(`.trip-controls`);
const newEventHandler = () => {
  tripMenuController.setDefaultTab();
  tripMenuController.rerender();
  tripController.setSortDefault();
  tripController.createEvent();
};

export const tripMenuController = new TripMenuController(tripControlsElem, eventsModel, newEventHandler);
const tripEventsElem = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsElem, eventsModel, tripMenuController, serverAPI);

serverAPI.getEvents()
  .then((events) => {
    eventsModel.setEvents(events);
    tripInfoComponent.setPoints(eventsModel.getAllEvents());
    render(mainTripElem, tripInfoComponent, RenderPosition.AFTERBEGIN);

    tripMenuController.render();
    tripController.render();
  });

const pageBodyContainer = document.querySelector(`.page-body__page-main`).querySelector(`.page-body__container`);

const statisticsComponent = new StatisticsComponent(eventsModel.getEvents());
render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

const OnTabClick = (tabItem) => {
  switch (tabItem) {
    case MenuItem.STATS:
      tripController.hide();
      statisticsComponent.show();
      tripMenuController.setNewEventValueTrue();
      break;
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripController.show();
      tripMenuController.setDefaultNewEvent();
      break;
  }
};

tripMenuController.setOnTabClick(OnTabClick);
