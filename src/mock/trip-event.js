import {getRandom, getRandomDate, getRandomIntegerNumber} from '../utils';
import {types, destinations, infoStrings, options, foto} from '../const';
import {MAX_ITEMS} from '../consts';

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
    foto,
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
