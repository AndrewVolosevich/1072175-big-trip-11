const createFilterMarkup = (name, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name.toLowerCase()}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name.toLowerCase()}</label>
    </div>`
  );
};

export const createTripFilters = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return `<form class="trip-filters" action="#" method="get">
    ${filterMarkup}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};
