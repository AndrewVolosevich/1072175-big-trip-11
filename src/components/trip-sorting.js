const createSortMarkup = (name, isChecked) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
      <input id="sort-${name.toLowerCase()}" class="trip-sort__input  visually-hidden"   type="radio" name="trip-sort" value="sort-${name.toLowerCase()}" ${isChecked ? `checked` : ``}>
      <label class="trip-sort__btn ${isChecked ? `trip-sort__btn--active trip-sort__btn--by-increase` : ``}" for="sort-${name.toLowerCase()}">
        ${name}
      </label>
    </div>`
  );
};

export const createTripSorting = (sortings) => {
  const sortMarkup = sortings.map((it, i) => createSortMarkup(it, i === 0)).join(`\n`);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">Day</span>
    ${sortMarkup}
    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`;
};