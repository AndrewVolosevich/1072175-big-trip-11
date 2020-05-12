import TripDayComponent from "../components/trip-day";
import TripEventItemComponent from "../components/trip-event-item";
import TripEventFormComponent from "../components/trip-event-form";
import TripDaysComponent from "../components/trip-days";
import NoTripPoints from "../components/no-trip-points";
import TripSortComponent from "../components/trip-sort";
import {render, RenderPosition} from "../utils/render";
import {sortItems} from "../consts";

const renderTripEvent = (tripListEventElement, event) => {
  const replaceEventToForm = () => {
    tripListEventElement.replaceChild(tripEventFormComponent.getElement(), tripEventItemComponent.getElement());
  };

  const replaceFormToEvent = () => {
    tripListEventElement.replaceChild(tripEventItemComponent.getElement(), tripEventFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const tripEventItemComponent = new TripEventItemComponent(event);
  tripEventItemComponent.setClickHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  const tripEventFormComponent = new TripEventFormComponent(event);
  tripEventFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListEventElement, tripEventItemComponent, RenderPosition.BEFOREEND);
};

const renderTripDay = (tripListDayItem, day) => {
  const tripDayComponent = new TripDayComponent(day);

  render(tripListDayItem, tripDayComponent, RenderPosition.BEFOREEND);
  const tripDayListElem = tripDayComponent.getElement().querySelector(`.trip-events__list`);
  day.forEach((event) => {
    renderTripEvent(tripDayListElem, event);
  });
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._noTripPoints = new NoTripPoints();
    this._tripSortComponent = new TripSortComponent(sortItems);
    this._tripDaysComponent = new TripDaysComponent();
  }

  render(days) {
    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);
    if (days.length === 0) {
      render(this._container, this._noTripPoints, RenderPosition.BEFOREEND);
      return;
    }
    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
    const tripDaysElem = document.querySelector(`.trip-days`);

    days.forEach((day) => renderTripDay(tripDaysElem, day));
  }
}
