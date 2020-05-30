import {setDateFormat, getEventType} from '../utils/common';
import {destinations} from '../consts';
import AbstractSmartComponent from './abstract-smart-component';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

const parseFormData = (formData) => {
  // return {
  //   description: formData.get(`event-destination-1`),
  // };
  return formData;
};

export default class TripEventFormComponent extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._flatpickr = null;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteCheckHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getDestinationsMarkup(array) {
    let destOpt = ``;
    array.forEach((item) => {
      return (
        destOpt += `<option value="${item}"></option>`
      );
    });
    return destOpt;
  }

  getFotos() {
    const fotos = [];
    this._event.fotos.forEach((foto) => {
      fotos.push(`<img class="event__photo" src="${foto}" alt="Event photo"></img>`);
    });
    return fotos.join(``);
  }

  isStringContain(string, value) {
    return (string.indexOf(value) !== -1);
  }

  getOptionsMarkup() {
    let offersString = ``;
    if (this._event.options) {
      this._event.options.forEach((option) => {
        offersString += offersString + ` ` + option.title;
        return offersString;
      });
    }

    return (
      `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${this.isStringContain(offersString, `Add luggage`) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">30</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" ${this.isStringContain(offersString, `Switch to comfort class`) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-comfort-1">
              <span class="event__offer-title">Switch to comfort class</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">100</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal" ${this.isStringContain(offersString, `Add meal`) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-meal-1">
              <span class="event__offer-title">Add meal</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">15</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats" ${this.isStringContain(offersString, `Choose seats`) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-seats-1">
              <span class="event__offer-title">Choose seats</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">5</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train" ${this.isStringContain(offersString, `Travel by train`) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-train-1">
              <span class="event__offer-title">Travel by train</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">40</span>
            </label>
          </div>
        </div>
      </section>

      ${this._event.destination ? this.getDestinationMarkup() : ``}`
    );
  }

  getDestinationMarkup() {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${this._event.info ? this._event.info.join(` `) : ``}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${this._event.fotos ? this.getFotos() : ``}
          </div>
        </div>
      </section>`
    );
  }

  getTemplate() {
    const {type, price, startTime, endTime} = this._event;
    const startType = type ? type : `bus`;
    const startPrice = price ? price : ``;
    const eventType = getEventType(this._event);

    return (
      `<form class="trip-events__item event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="./img/icons/${startType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=""   list="destination-list-1">
              <datalist id="destination-list-1">
              ${this.getDestinationsMarkup(destinations)}
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${setDateFormat(startTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${setDateFormat(endTime)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${startPrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z">
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        ${this.getOptionsMarkup()}
        </section>
      </form>`
    );
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setFavoritesCheckHandler(this._favoriteCheckHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    console.log(formData);
    return parseFormData(formData);
  }

  reset() {
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritesCheckHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, handler);

    this._favoriteCheckHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      this._event.type = evt.target.value;
      this.rerender();
    });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`change`, (evt) => {
      this._event.destinations = evt.target.value;
      this.rerender();
    });
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickr = flatpickr(startDateElement, {
      altInput: true,
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      allowInput: true,
      altFormat: `d/m/y H:i`,
      dateFormat: `Z`,
      defaultDate: this._event.startTime || `today`,
    });

    this._flatpickr = flatpickr(endDateElement, {
      altInput: true,
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      allowInput: true,
      altFormat: `d/m/y H:i`,
      dateFormat: `Z`,
      defaultDate: this._event.endTime || `today`,
    });

  }
}
