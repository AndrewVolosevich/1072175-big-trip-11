import TripDayComponent from "../components/trip-day";
import TripDaysComponent from "../components/trip-days";
import NoTripPoints from "../components/no-trip-points";
import TripSortComponent, {SortType} from "../components/trip-sort";
import EventController from "../controllers/event-controller";
import {render, RenderPosition} from "../utils/render";
import {sortItems} from "../consts";
import {createDaysArr} from "../mock/trip-event";

const renderTripEvents = (tripListEventContainer, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const eventController = new EventController(tripListEventContainer, onDataChange, onViewChange);
    eventController.render(event);
    return eventController;
  });
};

const renderTripDay = (tripDaysContainer, day, onDataChange, onViewChange) => {
  const tripDayComponent = new TripDayComponent(day);
  render(tripDaysContainer, tripDayComponent, RenderPosition.BEFOREEND);
  const tripDayContainer = tripDayComponent.getElement().querySelector(`.trip-events__list`);
  return renderTripEvents(tripDayContainer, day, onDataChange, onViewChange);
};

const getSortedTripEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingPoints = events.slice();

  switch (sortType) {
    case SortType.DEFAULT :
      sortedEvents = createDaysArr(events);
      break;
    case SortType.TIME :
      sortedEvents = showingPoints.sort((a, b) => {
        return a.startTime - b.startTime;
      });
      break;
    case SortType.PRICE :
      sortedEvents = showingPoints.sort((a, b) => {
        return b.price - a.price;
      });
      break;
  }
  return sortedEvents;
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._showedEventsControllers = [];

    this._noTripPoints = new NoTripPoints();
    this._tripSortComponent = new TripSortComponent(sortItems);
    this._tripDaysComponent = new TripDaysComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;
    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);

    if (this._events.length === 0) {
      render(this._container, this._noTripPoints, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
    const tripDaysElem = this._tripDaysComponent.getElement();

    let newEvents = [];
    createDaysArr(events).forEach((day) => {
      newEvents = renderTripDay(tripDaysElem, day, this._onDataChange, this._onViewChange);
      this._showedEventsControllers = this._showedEventsControllers.concat(newEvents);
    });
  }

  _onDataChange(eventController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    eventController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedEventsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedTripEvents(this._events, sortType);
    const tripDaysElem = this._tripDaysComponent.getElement();
    const sortContainer = this._container.querySelector(`.trip-days`);
    sortContainer.innerHTML = ``;

    if (this._tripSortComponent.getSortType() === SortType.DEFAULT) {
      sortedEvents.forEach((day) => renderTripDay(tripDaysElem, day));
      return;
    }

    const newEvents = renderTripDay(sortContainer, sortedEvents, this._onDataChange, this._onViewChange);
    this._showedEventsControllers = newEvents;
  }
}
