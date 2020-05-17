import TripEventItemComponent from "../components/trip-event-item";
import TripEventFormComponent from "../components/trip-event-form";
import {render, replace, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
}


export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._tripEventItemComponent = null;
    this._tripEventFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(event) {
    const oldEventComponent = this._tripEventItemComponent;
    const oldEventFormComponent = this._tripEventFormComponent;

    this._tripEventItemComponent = new TripEventItemComponent(event);
    this._tripEventFormComponent = new TripEventFormComponent(event);

    this._tripEventItemComponent.setClickHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventFormComponent.setFavoritesCheckHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceFormToEvent();
    });

    if (oldEventComponent && oldEventFormComponent) {
      replace(this._tripEventItemComponent, oldEventComponent);
      replace(this._tripEventFormComponent, oldEventFormComponent);
    } else {
      render(this._container, this._tripEventItemComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    this._onViewChange();
    replace(this._tripEventFormComponent, this._tripEventItemComponent);
    this._mode = Mode.EDIT;
  }

  _replaceFormToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._tripEventFormComponent.reset();
    replace(this._tripEventItemComponent, this._tripEventFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };
}
