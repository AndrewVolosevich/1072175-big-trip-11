import moment from "moment";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomDate = (min = 0, max = 0) => {
  let targetDate = new Date();
  const diffValue = 1440 * (min + Math.random() * (max - min));
  targetDate.setMinutes(diffValue);
  return targetDate;
};

export const setTimeFormat = (time) => {
  return moment(time).format(`HH:mm`);
};

export const setDateFormat = (date) => {
  return moment(date).add(10, `days`).calendar();
};

export const setEventDurationFormat = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  const days = b.diff(a, `days`);
  const hours = b.diff(a, `hours`) - days * 24;
  const minutes = b.diff(a, `minutes`) - days * 24 * 60 - hours * 60;
  return `${(days < 1) ? `` : days + `D`} ${(hours < 1) ? `` : hours + `H`} ${minutes + `M`}`;
};

export const getRandom = (array = [], count = 0) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  if (count !== 0) {
    const newArray = new Array(count);
    for (let i = 0; i < count; i++) {
      newArray[i] = array[getRandomIntegerNumber(0, array.length)];
    }
    return newArray;
  }
  return array[randomIndex];
};

export const getEventType = (event) => {
  const isMoovEvent = !(event.type === `check-in` || event.type === `sightseeing` || event.type === `restaurant`);
  const str = event.type[0].toUpperCase() + event.type.slice(1);
  const eventType = `` + str + (isMoovEvent ? ` to ` : ` in `);

  return eventType;
};
