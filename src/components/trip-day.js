import {MONTH_NAMES} from "../consts";
import AbstractComponent from "./abstract-component";
import {setDateFormat} from '../utils/common';

export default class TripDayComponent extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    if (this._day.length) {
      let dayIndex = this._day[0].dayIndex;
      let month = MONTH_NAMES[this._day[0].startTime.getMonth()].substr(0, 3);
      let date = this._day[0].startTime.getDate();
      const newDay = this._day.slice().sort((a, b) => {
        return a.dayIndex - b.dayIndex;
      });

      if (newDay[0].dayIndex !== newDay[newDay.length - 1].dayIndex) {
        dayIndex = ``;
        month = ``;
        date = ``;
      }


      return (
        `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${dayIndex ? dayIndex : ``}</span>
            <time class="day__date" datetime="${setDateFormat(this._day[0].startTime)}">${dayIndex ? month : ``} ${dayIndex ? date : ``}</time>
          </div>
          <ul class="trip-events__list"></ul>
        </li>`
      );
    }

    const dayIndex = ``;
    const month = ``;
    const date = ``;

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex ? dayIndex : ``}</span>
          <time class="day__date" datetime="2019-03-18">${dayIndex ? month : ``} ${dayIndex ? date : ``}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }
}
