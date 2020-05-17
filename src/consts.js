import {getRandomIntegerNumber} from "./utils/common";

export const types = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

export const destinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

export const infoStrings = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
export const sortItems = [`Event`, `Time`, `Price`];
export const filterItems = [`Everything`, `Future`, `Past`];
export const MAX_ITEMS = 25;
export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const fotos = () => {
  const count = getRandomIntegerNumber(0, 5);
  const fotosArr = [];

  for (let i = 0; i <= count; i++) {
    let foto = `http://picsum.photos/248/152?r=${Math.random()}`;
    fotosArr.push(foto);
  }
  return fotosArr;
};

export const options = [
  {
    type: `transport`,
    title: `Add luggage`,
    price: 30,
  },
  {
    type: `transport`,
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    type: `food`,
    title: `Add meal`,
    price: 15,
  },
  {
    type: `transport`,
    title: `Choose seats`,
    price: 5,
  },
  {
    type: `transport`,
    title: `Travel by train`,
    price: 40,
  },
];
