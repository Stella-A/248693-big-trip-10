const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const DescriptionItems = text.split(`. `);

const RouteTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const CityNames = [
  `Amsterdam`,
  `London`,
  `Moscow`,
  `Manchester`,
  `Dublin`,
  `Praga`,
];

const moreOptions = [
  `Add luggage +10 €`,
  `Switch to comfort class +150 €`,
  `Add meal +2 €`,
  `Choose seats +9 €`,
];

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const generateTask = () => {
  const getRandomCountArray = (array) => {
    return array
      .filter(() => Math.random() > 0.5)
      .slice(0, getRandomIntegerNumber(1, 4));
  };

  return {
    routeType: getRandomArrayItem(RouteTypes),
    cityName: getRandomArrayItem(CityNames),
    photoURL: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: new Set(getRandomCountArray(DescriptionItems)),
    date: getRandomDate(),
    price: getRandomIntegerNumber(20, 1000),
    options: getRandomCountArray(moreOptions),
  };
};
