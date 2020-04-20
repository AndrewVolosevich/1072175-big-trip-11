import {createElement} from "../utils";

export default class TripFiltersComponent {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getMarkup(name, isChecked) {
    const lowerName = name.toLowerCase();
    return (
      `<div class="trip-filters__filter">
        <input id="filter-${lowerName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerName}" ${isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${lowerName}">${lowerName}</label>
      </div>`
    );
  }

  getTemplate(filters) {
    const filterMarkup = filters.map((it, i) => this.getMarkup(it, i === 0)).join(`\n`);

    return (
      `<form class="trip-filters" action="#" method="get">
        ${filterMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._filters));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
