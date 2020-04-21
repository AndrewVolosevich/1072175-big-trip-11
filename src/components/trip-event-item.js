import {createElement} from "../utils";
import {setTimeFormat, setEventDurationFormat} from "../utils";

export default class TripEventItemComponent {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getOfferMarkup(item) {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
      </li>`
    );
  }

  getTemplate(event) {
    const {type, destination, options, price, startTime, endTime} = event;
    const offerMarkup = options.map((it) => this.getOfferMarkup(it)).join(`\n`);

    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="./img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T14:30">${setTimeFormat(startTime)}</ time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T16:05">${setTimeFormat(endTime)}</time>
            </p>
            <p class="event__duration">${setEventDurationFormat(startTime, endTime)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offerMarkup}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._event));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
