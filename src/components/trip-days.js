import {createTripEventItem} from './trip-event-item';
import {MONTH_NAMES} from '../consts';

const createDatesArr = (tripPoints) => {
  let startDate = tripPoints[1].startTime.getDate();
  let lastDate = tripPoints[tripPoints.length - 1].startTime.getDate();
  const datesArr = [];

  for (let i = startDate; i <= lastDate; i++) {
    datesArr.push(tripPoints.filter((point) => point.startTime.getDate() === i));
  }
  return datesArr;
};

export const createDayMarkup = (days, dayIndex) => {
  const dayDate = days[0].startTime;
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayIndex + 1}</span>
          <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[dayDate.getMonth()].substr(0, 3)} ${dayDate.getDate()}</time>
        </div>
        ${createTripEventItem(days)}
      </li>
    </ul>`
  );
};

export const createTripDays = (days) => {
  const dayMarkup = createDatesArr(days).map((it, i) => createDayMarkup(it, i)).join(`\n`);

  return `<ul class="trip-days">
    ${dayMarkup}
    </ul>`;
};
