import {setDateFormat, getEventType} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const isTitleExist = (title, event) => {
  const arr = event.options.filter((item) => item.title === title);

  return arr.length ? true : false;
};

export default class TripEventFormComponent extends AbstractSmartComponent {
  constructor(event, destinations, options) {
    super();
    this._event = event;
    this._destinations = destinations;
    this._options = options;
    this._flatpickr = null;
    this._externalData = DefaultData;

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
        destOpt += `<option value="${item.name}">${item.name}</option>`
      );
    });
    return destOpt;
  }

  getFotos() {
    const fotos = [];
    this._event.fotos.forEach((foto) => {
      fotos.push(`<img class="event__photo" src="${foto.src}" alt="${foto.description}"></img>`);
    });
    return fotos.join(``);
  }

  isStringContain(string, value) {
    return (string.indexOf(value) !== -1);
  }

  getOptionsMarkup() {
    const type = this._event.type;
    const newOptions = this._options.filter((item) => item.type === type);
    const optionsArr = [];
    newOptions[0].offers.forEach((item, index) => optionsArr.push(
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${index}" type="checkbox" name="event-offer-${type}-${index}" ${isTitleExist(item.title, this._event) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-comfort-${index}">
            <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
          </label>
        </div>`
    ));

    return (
      `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${optionsArr.join(``)}
          </div>
        </section>`
    );
  }

  getDestinationMarkup() {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${this._event.info ? this._event.info : ``}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${this._event.destination ? this.getFotos() : ``}
          </div>
        </div>
      </section>`
    );
  }

  getTemplate() {
    const {type, price, startTime, endTime} = this._event;
    const startType = type ? type : `bus`;
    const startPrice = price ? encode(String(price)) : ``;
    const eventType = getEventType(this._event);
    const deleteButtonText = this._externalData.deleteButtonText;
    const saveButtonText = this._externalData.saveButtonText;

    const isOptions = () => {
      const curOptions = this._options.filter((item) => {
        return item.type === type;
      });
      if (curOptions[0].offers.length) {
        return true;
      }
      return false;
    };

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
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${startType === `taxi` ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${startType === `bus` ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"  ${startType === `train` ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"  ${startType === `ship` ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${startType === `transport` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${startType === `drive` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${startType === `flight` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${startType === `check-in` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${startType === `sightseeing` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${startType === `restaurant` ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" placeholder="${this._event.destination ? this._event.destination : ``}"  list="destination-list-1">
              <datalist id="destination-list-1">
              ${this.getDestinationsMarkup(this._destinations)}
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${startPrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._event.isFavorite ? `checked` : ``}>
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

        <section class="event__details">
        ${isOptions() ? this.getOptionsMarkup() : ``}


        ${this._event.destination ? this.getDestinationMarkup() : ``}
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

    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
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
      this._event.destination = evt.target.value;
      this._setDestinationOptions();
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

  _setDestinationOptions() {
    const newDestination = this._destinations.filter((item) => item.name === this._event.destination);
    this._event.fotos = newDestination[0].pictures;
    this._event.info = newDestination[0].description;
    return newDestination[0];
  }
}
