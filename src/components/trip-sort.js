import {createElement} from "../utils";

export default class TripSortComponent {
  constructor(sortings) {
    this._sortings = sortings;
    this._element = null;
  }

  getMarkup(name, isChecked) {
    const lowerName = name.toLowerCase();
    const checked = isChecked ? `checked` : ``;
    const checkedClass = isChecked ? `trip-sort__btn--active trip-sort__btn--by-increase` : ``;

    return (
      `<div class="trip-sort__item  trip-sort__item--${lowerName}">
        <input id="sort-${lowerName}" class="trip-sort__input  visually-hidden"   type="radio" name="trip-sort" value="sort-${lowerName}" ${checked}>
        <label class="trip-sort__btn ${checkedClass}" for="sort-${lowerName}">
          ${name}
        </label>
      </div>`
    );
  }

  getTemplate(sortings) {
    const sortMarkup = sortings.map((it, i) => this.getMarkup(it, i === 0)).join(`\n`);

    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
          ${sortMarkup}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._sortings));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
