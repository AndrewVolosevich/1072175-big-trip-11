import {MONTH_NAMES} from "../consts";
import {createElement} from "../utils";


export default class TripDayComponent {
  constructor(day) {
    this._element = null;
    this._day = day;
  }

  getTemplate(day) {
    const dayIndex = day[0].dayIndex;
    const month = MONTH_NAMES[day[0].startTime.getMonth()].substr(0, 3);
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex}</span>
          <time class="day__date" datetime="2019-03-18">${month} ${day[0].startTime.getDate()}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._day));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
