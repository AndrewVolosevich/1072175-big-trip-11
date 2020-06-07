import {MONTH_NAMES} from "../consts";
import AbstractComponent from "./abstract-component";

export default class TripInfoElement extends AbstractComponent {
  constructor() {
    super();
    this._tripPoints = null;
  }

  setPoints(points) {
    this._tripPoints = points;
  }

  getTemplate() {
    const getPrice = (accumulator, currentValue) => {
      accumulator += Number(currentValue.price);
      return accumulator;
    };
    const getTripPoints = (towns) => {
      const startPoint = towns[0].destination;
      const midPoint = () => {
        if (towns.length >= 3) {
          return `${towns[Math.trunc(towns.length / 2)].destination} &mdash;`;
        }

        return ``;
      };
      const endPoint = towns[towns.length - 1].destination;

      return `${startPoint} &mdash; ${midPoint()} ${endPoint}`;
    };
    const getTripDates = () => {
      const month = MONTH_NAMES[this._tripPoints[0].startTime.getMonth()].substr(0, 3);
      const startDate = this._tripPoints[0].startTime.getDate();
      const endDate = this._tripPoints[this._tripPoints.length - 1].startTime.getDate();
      // console.log(this._tripPoints[0]);

      return `${month} ${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
    };

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${this._tripPoints ? getTripPoints(this._tripPoints) : ``}</  h1>

          <p class="trip-info__dates">${this._tripPoints ? getTripDates() : ``}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._tripPoints ? this._tripPoints.reduce(getPrice, 0) : ``}</span>
        </p>
      </section>`
    );
  }
}
