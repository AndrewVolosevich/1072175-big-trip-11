import {MONTH_NAMES} from '../const';

export const createTripInfo = (tripPoints) => {
  const reducer = (accumulator, currentValue) => {
    accumulator += Number(currentValue.price);
    return accumulator;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripPoints[0].destination} &mdash; ${tripPoints[tripPoints.length - 1].destination}</  h1>

        <p class="trip-info__dates">${MONTH_NAMES[tripPoints[0].startTime.getMonth()].substr(0, 3)} ${tripPoints[0].startTime.getDate()}&nbsp;&mdash;&nbsp;${tripPoints[tripPoints.length - 1].startTime.getDate()}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPoints.reduce(reducer, 0)}</span>
      </p>
    </section>`
  );
};
