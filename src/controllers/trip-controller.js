import TripDayComponent from "../components/trip-day";
import TripDaysComponent from "../components/trip-days";
import NoTripPoints from "../components/no-trip-points";
import TripSortComponent from "../components/trip-sort";
import EventController, {Mode as EventControllerMode, EmptyEvent} from "../controllers/event-controller";
import {render, RenderPosition} from "../utils/render";
import {createDaysArr} from "../mock/trip-event";
import {HIDDEN_CLASS} from "../components/abstract-component";

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const renderTripEvents = (tripListEventContainer, events, onDataChange, onViewChange, onFavoriteChange) => {
  return events.map((event) => {
    const eventController = new EventController(tripListEventContainer, onDataChange, onViewChange, onFavoriteChange);
    eventController.render(event, EventControllerMode.DEFAULT);
    return eventController;
  });
};

const getSortedTripEvents = (events, sortItem) => {
  let sortedEvents = [];
  const showingPoints = events.slice();

  switch (sortItem) {
    case SortType.DEFAULT :
      sortedEvents = events;
      break;
    case SortType.TIME :
      sortedEvents = showingPoints.sort((a, b) => {
        return a.startTime - b.startTime;
      });
      break;
    case SortType.PRICE :
      sortedEvents = showingPoints.sort((a, b) => {
        return a.price < b.price ? 1 : -1;
      });
      break;
  }
  return sortedEvents;
};

export default class TripController {
  constructor(container, eventsModel, tripMenuController) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._showedEventsControllers = [];
    this._showedDays = [];

    this._noTripPoints = new NoTripPoints();
    this._activeSortType = SortType.DEFAULT;
    this._tripSortComponent = new TripSortComponent(SortType);
    this._tripDaysComponent = new TripDaysComponent();
    this._tripDayComponent = new TripDayComponent(this._eventsModel.getEvents());
    this._creatingEvent = null;
    this._tripMenuController = tripMenuController;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderTripDay(tripDaysContainer, day, onDataChange, onViewChange, onFavoriteChange) {
    const tripDayComponent = new TripDayComponent(day);
    this._tripDayComponent = tripDayComponent;
    render(tripDaysContainer, tripDayComponent, RenderPosition.BEFOREEND);
    const tripDayContainer = tripDayComponent.getElement().querySelector(`.trip-events__list`);
    return renderTripEvents(tripDayContainer, day, onDataChange, onViewChange, onFavoriteChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {
    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
    const events = this._eventsModel.getEvents();

    this._renderEvents(events);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }
    const eventListElement = this._tripDaysComponent.getElement();
    this._creatingEvent = new EventController(eventListElement, this._onDataChange, this._onViewChange, this._onFavoriteChange);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }

  _removeEvents() {
    this._showedEventsControllers.forEach((eventController) => eventController.destroy());
    const container = this._tripDaysComponent.getElement();
    container.innerHTML = ``;
    this._showedEventsControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._tripSortComponent.setSortDefaultType();
    this._renderEvents(this._eventsModel.getEvents());
  }

  _renderEvents(events) {
    if (!events.length) {
      render(this._container, this._noTripPoints, RenderPosition.BEFOREEND);
      return;
    }

    const tripDaysElem = this._tripDaysComponent.getElement();
    if (this._tripSortComponent.getSortType() === SortType.DEFAULT) {
      const days = createDaysArr(events);
      let newEvents = [];
      days.forEach((day) => {
        newEvents = this._renderTripDay(tripDaysElem, day, this._onDataChange, this._onViewChange, this._onFavoriteChange);
        this._showedEventsControllers = this._showedEventsControllers.concat(newEvents);
      });
      return;
    }

    const newEvents = this._renderTripDay(tripDaysElem, events, this._onDataChange, this._onViewChange, this._onFavoriteChange);
    this._showedEventsControllers = newEvents;
  }

  _onFavoriteChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      eventController.render(newData, EventControllerMode.EDIT);
    }
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      } else {
        this._eventsModel.addEvent(newData);
        eventController.render(newData, EventControllerMode.DEFAULT);

        this._showedEventControllers = [].concat(eventController, this._showedEventControllers);
      }

      this._container.querySelector(`.trip-events__item`).remove();
      createDaysArr(this._eventsModel.getEvents());
      this._updateEvents();
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        eventController.render(newData, EventControllerMode.DEFAULT);
      }
    }
    this._tripMenuController.setDefaultNewEvent();
  }

  _onViewChange() {
    this._showedEventsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = this._tripSortComponent.getSortType();
    this._tripMenuController.setDefaultFilter();
    const sortedEvents = getSortedTripEvents(this._eventsModel.getEvents(), sortType);
    const sortContainer = this._container.querySelector(`.trip-days`);
    sortContainer.innerHTML = ``;
    this._renderEvents(sortedEvents);
    this._tripSortComponent.rerender();
  }

  _onFilterChange() {
    this._updateEvents();
  }

  setSortDefault() {
    this._tripSortComponent.setSortDefaultType();
    const sortContainer = this._container.querySelector(`.trip-days`);
    sortContainer.innerHTML = ``;
    this._renderEvents(this._eventsModel.getEvents());
  }
}
