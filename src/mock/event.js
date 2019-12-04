import {Offers, RouteTypes, CityNames, Titles, text} from '../const.js';

const MIN_PRICE = 100;
const MAX_PRICE = 500;
const MIN_PHOTOS = 3;
const MAX_PHOTOS = 10;

const DescriptionItems = text.split(`. `);

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length)];
};

const getRandomStartDate = () => {
  const targetDate = new Date();
  const sing = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sing * getRandomIntegerNumber(0, 2);
  const hours = getRandomIntegerNumber(0, 23);
  const minutes = getRandomIntegerNumber(0, 59);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(hours, minutes);

  return targetDate;
};

const getRandomEndDate = (date) => {
  const targetDate = new Date(date);

  targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(0, 24), targetDate.getMinutes() + getRandomIntegerNumber(0, 59));

  return targetDate;
};

const getRandomCountArray = (array, maxCount) => {
  return array
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, maxCount));
};

const generatePhotos = (count) => {
  return Array(count)
    .fill(``)
    .map(() => {
      return `http://picsum.photos/300/150?r=${Math.random()}`;
    });
};

const generateEvent = () => {
  const routeType = getRandomArrayItem(RouteTypes);
  const titleEvent = `${routeType} ${getRandomArrayItem(Titles)}`;
  const startDate = getRandomStartDate();

  return {
    type: routeType,
    title: titleEvent,
    city: getRandomArrayItem(CityNames),
    photos: generatePhotos(getRandomIntegerNumber(MIN_PHOTOS, MAX_PHOTOS)),
    description: new Set(getRandomCountArray(DescriptionItems, 4)),
    dateStart: startDate,
    dateEnd: getRandomEndDate(startDate),
    price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
    offers: new Set(getRandomCountArray(Offers, 3)),
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};
