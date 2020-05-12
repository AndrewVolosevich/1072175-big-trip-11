import {MONTH_NAMES} from "../consts";
import AbstractComponent from "./abstract-component";


export default class TripDayComponent extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    const dayIndex = this._day[0].dayIndex;
    const month = MONTH_NAMES[this._day[0].startTime.getMonth()].substr(0, 3);
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex}</span>
          <time class="day__date" datetime="2019-03-18">${month} ${this._day[0].startTime.getDate()}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }
}
