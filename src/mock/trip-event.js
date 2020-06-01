import {getRandom, getRandomDate, getRandomIntegerNumber} from "../utils/common";
import {types, destinations, infoStrings, options, fotos} from "../consts";
import {MAX_ITEMS} from "../consts";

export const generateTripEvent = () => {
  const startTime = getRandomDate(getRandomIntegerNumber(-3, 0), 0);
  const endTime = getRandomDate(0, 2);
  const timeDif = endTime - startTime;

  return {
    id: String(+new Date() + Math.random()),
    type: getRandom(types),
    destination: getRandom(destinations),
    options: getRandom(options, 2),
    info: getRandom(infoStrings, 3),
    price: getRandomIntegerNumber(0, 1000),
    isFavorite: Math.random() > 0.5,
    fotos: fotos(),
    startTime,
    endTime,
    timeDif,
  };
};

export const tripEventMocks = [];
for (let i = 0; i < MAX_ITEMS; i++) {
  tripEventMocks.push(generateTripEvent());
}


export const createDaysArr = (tripPoints) => {
  tripPoints.sort((prev, cur) => prev.startTime - cur.startTime);
  let startDate = tripPoints[0].startTime;
  let lastDate = tripPoints[tripPoints.length - 1].startTime;
  const daysCount = Math.ceil((lastDate - startDate) / 86400000);
  let days = [];
  for (let i = 1; i <= daysCount + 1; i++) {
    const newDay = tripPoints.filter((point) => {
      return point.startTime.getDate() === new Date(+startDate + (i - 1) * 86400000).getDate();
    });
    newDay.map((point) => {
      point.dayIndex = i;
    });
    days.push(newDay);
  }
  console.log(days);
  return days;
};
