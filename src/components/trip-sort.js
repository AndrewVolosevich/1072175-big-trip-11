import AbstractSmartComponent from "./abstract-smart-component";
import {SortType} from "../controllers/trip-controller";

const getNewSortItems = (activeSortType) => {
  return Object.values(SortType).map((sortItem) => {
    return {
      name: sortItem,
      checked: sortItem === activeSortType,
    };
  });
};

export default class TripSortComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._sortHandler = null;
  }

  getMarkup(name, isChecked) {
    const checked = isChecked ? `checked` : ``;
    const checkedClass = isChecked ? `trip-sort__btn--active trip-sort__btn--by-increase` : ``;

    return (
      `<div class="trip-sort__item  trip-sort__item--${name}">
        <input id="sort-${name}" class="trip-sort__input  visually-hidden"   type="radio" name="trip-sort" value="sort-${name}" ${checked}>
        <label class="trip-sort__btn ${checkedClass}" for="sort-${name}" data-sort-type="${name}">
          ${name}
        </label>
      </div>`
    );
  }

  getTemplate() {
    const sortMarkup = getNewSortItems(this._currenSortType).map((it) => this.getMarkup(it.name, it.checked)).join(`\n`);

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

  setSortDefaultType() {
    this._currenSortType = SortType.DEFAULT;
    this.rerender();
  }

  setSortType(sortType) {
    this._currenSortType = sortType;
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortHandler);
  }

  setSortTypeChangeHandler(handler) {
    this._sortHandler = handler;
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
