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
  let days = ``;
  let hours = ``;
  let minutes = ``;
  days = Math.trunc((end - start) / 86400000);
  hours = Math.trunc((end - start) / 3600000) - days * 24;
  minutes = Math.trunc((end - start) / 60000) - days * 24 * 60 - hours * 60;
  return `${(days === 0) ? `` : days + `D`} ${(hours === ``) ? `` : hours + `H`} ${(minutes === ``) ? `` : minutes + `M`}`;
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
