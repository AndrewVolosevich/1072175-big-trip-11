import {render, RenderPosition} from "./utils";
import {tripEventMocks, datesArr} from "./mock/trip-event";
import {sortItems, filterItems} from "./consts";
import TripInfoComponent from "./components/trip-info";
import TripTabsComponent from "./components/trip-tabs";
import TripFiltersComponent from "./components/trip-filters";
import TripSortComponent from "./components/trip-sort";
import TripDayComponent from "./components/trip-day";
import TripEventItemComponent from "./components/trip-event-item";
import TripEventFormComponent from "./components/trip-event-form";
import TripDaysComponent from "./components/trip-days";


const mainTripElem = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoComponent(tripEventMocks);
render(mainTripElem, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElem = document.querySelector(`.trip-controls`);

const tripTabsComponent = new TripTabsComponent();
render(tripControlsElem.querySelector(`h2`), tripTabsComponent.getElement(), RenderPosition.AFTER);

const tripFiltersComponent = new TripFiltersComponent(filterItems);
render(tripControlsElem, tripFiltersComponent.getElement(), RenderPosition.BEFOREEND);

const tripEventsElem = document.querySelector(`.trip-events`);

const tripSortComponent = new TripSortComponent(sortItems);
render(tripEventsElem, tripSortComponent.getElement(), RenderPosition.BEFOREEND);

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
  const editButton = tripEventItemComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  const tripEventFormComponent = new TripEventFormComponent(event);
  const editForm = tripEventFormComponent.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListEventElement, tripEventItemComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderTripDay = (tripListDayItem, day) => {
  const tripDayComponent = new TripDayComponent(day);

  render(tripListDayItem, tripDayComponent.getElement(), RenderPosition.BEFOREEND);
  const tripDayListElem = tripDayComponent.getElement().querySelector(`.trip-events__list`);
  day.forEach((event) => {
    renderTripEvent(tripDayListElem, event);
  });
};

const tripDaysComponent = new TripDaysComponent();
render(tripEventsElem, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const tripDaysElem = document.querySelector(`.trip-days`);

datesArr.forEach((day) => renderTripDay(tripDaysElem, day));
