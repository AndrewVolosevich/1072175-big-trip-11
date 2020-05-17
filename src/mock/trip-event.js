import {getRandom, getRandomDate, getRandomIntegerNumber} from "../utils/common";
import {types, destinations, infoStrings, options, fotos} from "../consts";
import {MAX_ITEMS} from "../consts";

export const generateTripEvent = () => {
  const startTime = getRandomDate(getRandomIntegerNumber(-3, 0), 0);
  const endTime = getRandomDate(0, 2);
  const timeDif = endTime - startTime;

  return {
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
tripEventMocks.sort((prev, cur) => prev.startTime - cur.startTime);

export const createDaysArr = (tripPoints) => {
  let startDate = tripPoints[0].startTime.getDate();
  let lastDate = tripPoints[tripPoints.length - 1].startTime.getDate();
  let days = [];

  for (let i = startDate; i <= lastDate; i++) {
    const newDay = tripPoints.filter((point) => point.startTime.getDate() === i);
    newDay.map((point) => {
      point.dayIndex = (point.startTime.getDate() - startDate) >= 0 ? point.startTime.getDate() - startDate + 1 : 1;
    });
    days.push(newDay);
  }

  return days;
};
