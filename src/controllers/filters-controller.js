import TripFiltersComponent from "../components/trip-filters";
import {FilterType} from "../consts";
import {render, replace, RenderPosition} from "../utils/render";

export default class FiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._filtersComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filtersComponent;

    this._filtersComponent = new TripFiltersComponent(filters);
    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filtersComponent, oldComponent);
    } else {
      render(container, this._filtersComponent, RenderPosition.BEFOREEND);
    }
  }

  getActiveFilter() {
    return this._activeFilterType;
  }

  setDefaultFilter() {
    this._activeFilterType = FilterType.EVERYTHING;
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
