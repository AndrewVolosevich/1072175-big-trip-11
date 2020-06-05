import TripEventItemComponent from "../components/trip-event-item";
import TripEventFormComponent from "../components/trip-event-form";
import {render, replace, remove, RenderPosition} from "../utils/render";
import {tripMenuController} from "../main";
import ServerAPI from "../serverApi";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const newDate = new Date();
const AUTHORIZATION = `Basic kTy9gIdsz2317rD`;

const serverApi = new ServerAPI(AUTHORIZATION);
const destinations = [];
const options = [];

serverApi.getDestinations()
.then((response) => response
  .forEach((item) => destinations.push(item)))
.then(() => destinations);

serverApi.getOptions()
.then((response) => response
  .forEach((item) => options.push(item)))
.then(() => options);

const startTime = new Date();
const endTime = new Date(newDate.getTime() + (24 * 60 * 60 * 1000));

export const EmptyEvent = {
  id: String(+new Date() + Math.random()),
  type: `bus`,
  destination: ``,
  options: [],
  info: ``,
  price: `0`,
  isFavorite: false,
  fotos: [],
  startTime,
  endTime,
  timeDif: ``,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, onFavoriteChange) {
    this._container = container;
    this._tripEventItemComponent = null;
    this._tripEventFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCancelButtonPress = this._onCancelButtonPress.bind(this);
    this._onDataChange = onDataChange;
    this._onFavoriteChange = onFavoriteChange;
    this._onViewChange = onViewChange;
  }

  render(event, mode) {
    const oldEventComponent = this._tripEventItemComponent;
    const oldEventFormComponent = this._tripEventFormComponent;
    this._mode = mode;

    this._event = event;
    this._tripEventItemComponent = new TripEventItemComponent(this._event);
    this._tripEventFormComponent = new TripEventFormComponent(this._event, destinations, options);


    this._tripEventItemComponent.setClickHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onCancelButtonPress);
      tripMenuController.setDefaultMenu();
      tripMenuController.setNewEventValueTrue();
    });

    this._tripEventFormComponent.setFavoritesCheckHandler(() => {
      this._onFavoriteChange(this, event, Object.assign({}, event, {
        isFavorite: !this._event.isFavorite,
      }));
    });

    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._tripEventFormComponent.getData();
      this._onDataChange(this, this._event, data);
    });

    this._tripEventFormComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(this, this._event, null);
      tripMenuController.setDefaultNewEvent();
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventFormComponent && oldEventComponent) {
          replace(this._tripEventItemComponent, oldEventComponent);
          replace(this._tripEventFormComponent, oldEventFormComponent);
          this._replaceFormToEvent();
        } else {
          render(this._container, this._tripEventItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.EDIT:
        if (oldEventFormComponent && oldEventComponent) {
          replace(this._tripEventItemComponent, oldEventComponent);
          replace(this._tripEventFormComponent, oldEventFormComponent);
          this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onCancelButtonPress);
        } else {
          document.addEventListener(`keydown`, this._onEscKeyDown);
          this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onCancelButtonPress);
          render(this._container, this._tripEventItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventFormComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onCancelButtonPress);
        render(this._container, this._tripEventFormComponent, RenderPosition.BEFORE);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  destroy() {
    remove(this._tripEventFormComponent);
    remove(this._tripEventItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`click`, this._onCancelButtonPress);
  }

  _replaceEventToForm() {
    this._onViewChange();
    replace(this._tripEventFormComponent, this._tripEventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceFormToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`click`, this._onCancelButtonPress);
    this._tripEventFormComponent.reset();

    if (document.contains(this._tripEventFormComponent.getElement())) {
      replace(this._tripEventItemComponent, this._tripEventFormComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceFormToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      tripMenuController.setDefaultMenu();
    }
  }

  _onCancelButtonPress(evt) {
    const isCancelButton = evt.target === this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`);
    if (isCancelButton) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceFormToEvent();
      this._tripEventFormComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._onCancelButtonPress);
      tripMenuController.setDefaultMenu();
    }
  }
}
