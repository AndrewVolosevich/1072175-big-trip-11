import AbstractSmartComponent from "./abstract-smart-component";
import {MenuItem} from "../controllers/trip-menu";

export default class TripTabsComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this._tabValue = MenuItem.TABLE;
    this._tabClickHandler = null;
  }

  getTemplate() {
    const activeClass = ` trip-tabs__btn--active`;
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn${(this._tabValue === MenuItem.TABLE) ? activeClass : ``}" id ="control__table" href="#">Table</a>
        <a class="trip-tabs__btn${(this._tabValue === MenuItem.STATS) ? activeClass : ``}" id ="control__stats" href="#">Stats</a>
      </nav>`
    );
  }

  getTabValue() {
    return this._tabValue;
  }

  setTabValue(tabValue) {
    this._tabValue = tabValue;
  }

  recoveryListeners() {
    this.setTabValueChangeHandler(this._tabClickHandler);
  }

  setTabClickHandler(handler) {
    this._tabClickHandler = handler;
  }

  setTabValueChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const tabValue = evt.target.id;

      if (this._tabValue === tabValue) {
        return;
      }

      this._tabValue = tabValue;
      handler(this._tabValue);
    });
  }
}
