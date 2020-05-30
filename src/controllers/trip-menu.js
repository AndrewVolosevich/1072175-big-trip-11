import {render, RenderPosition} from "../utils/render";
import FiltersController from "./filters-controller";
import TripTabsComponent from "../components/trip-tabs";
import TripButtonComponent from "../components/trip-button";

export const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATS: `control__stats`,
  TABLE: `control__table`,
};

export default class TripMenuController {

  constructor(container, eventsModel, newEventHandler) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filtersController = new FiltersController(this._container, this._eventsModel);
    this._tripTabsComponent = new TripTabsComponent();
    this._tripButtonComponent = new TripButtonComponent();

    this._menuItem = MenuItem.TABLE;
    this._newEventHandler = newEventHandler;

    this._onTabValueChange = this._onTabValueChange.bind(this);
    this._onClickNewEventButton = this._onClickNewEventButton.bind(this);

    this._tripTabsComponent.setTabValueChangeHandler(this._onTabValueChange);
    this._tripButtonComponent.setNewEventClickHandler(this._onClickNewEventButton);
  }

  render() {
    render(this._container.querySelector(`h2`), this._tripTabsComponent, RenderPosition.AFTER);
    this._tripTabsComponent.setTabClickHandler(this._onTabValueChange);
    this._filtersController.render();
    render(this._container, this._tripButtonComponent, RenderPosition.AFTER);
  }

  rerender() {
    this._tripTabsComponent.rerender();
    this._tripButtonComponent.rerender();
  }

  _onTabValueChange(tabValue) {
    this._tripTabsComponent.setTabValue(tabValue);
    this._tripTabsComponent.rerender();
  }

  _onClickNewEventButton(value) {
    this._newEventHandler(value);
    this._tripButtonComponent.rerender();
  }

  setDefaultTab() {
    this._menuItem = MenuItem.TABLE;
    this._tripTabsComponent.setTabValue(this._menuItem);
  }

  setDefaultNewEvent() {
    this._tripButtonComponent.setDefaultValue();
    this._tripButtonComponent.rerender();
  }

  setNewEventValueTrue() {
    this._tripButtonComponent.setDisableValue(true);
    this._tripButtonComponent.rerender();
  }

  setDefaultMenu() {
    this.setDefaultTab();
    this.setDefaultNewEvent();
    // this._filtersController.setDefaultFilter();
    this.rerender();
  }

  getFiltersController() {
    return this._filtersController;
  }
}
