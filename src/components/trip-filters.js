import AbstractComponent from "./abstract-component";

export default class TripFiltersComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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

  getTemplate() {
    const filterMarkup = this._filters.map((it, i) => this.getMarkup(it, i === 0)).join(`\n`);

    return (
      `<form class="trip-filters" action="#" method="get">
        ${filterMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }
}
