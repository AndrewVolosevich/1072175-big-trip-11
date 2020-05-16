import TripEventItemComponent from "../components/trip-event-item";
import TripEventFormComponent from "../components/trip-event-form";
import {render, replace, RenderPosition} from "../utils/render";


export default class PointController {
  constructor(container) {
    this._container = container;
    this._tripEventItemComponent = null;
    this._tripEventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    this._tripEventItemComponent = new TripEventItemComponent(event);
    this._tripEventFormComponent = new TripEventFormComponent(event);

    this._tripEventItemComponent.setClickHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });


    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceFormToEvent();
    });

    render(this._container, this._tripEventItemComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToForm() {
    replace(this._tripEventFormComponent, this._tripEventItemComponent);
  }

  _replaceFormToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._tripEventItemComponent, this._tripEventFormComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  };
}
