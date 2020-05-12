import AbstractComponent from "./abstract-component";

export const SortType = {
  TIME: `time`,
  PRICE: `price`,
  DEFAULT: `event`,
};

export default class TripSortComponent extends AbstractComponent {
  constructor(sortings) {
    super();
    this._sortings = sortings;
    this._currenSortType = SortType.DEFAULT;
  }

  getMarkup(name, isChecked) {
    const lowerName = name.toLowerCase();
    const checked = isChecked ? `checked` : ``;
    const checkedClass = isChecked ? `trip-sort__btn--active trip-sort__btn--by-increase` : ``;

    return (
      `<div class="trip-sort__item  trip-sort__item--${lowerName}">
        <input id="sort-${lowerName}" class="trip-sort__input  visually-hidden"   type="radio" name="trip-sort" value="sort-${lowerName}" ${checked}>
        <label class="trip-sort__btn ${checkedClass}" for="sort-${lowerName}" data-sort-type="${lowerName}">
          ${name}
        </label>
      </div>`
    );
  }

  getTemplate() {
    const sortMarkup = this._sortings.map((it, i) => this.getMarkup(it, i === 0)).join(`\n`);

    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
          ${sortMarkup}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `LABEL`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}
