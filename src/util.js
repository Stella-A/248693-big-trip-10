const castDateInterval = (days) => {
  return days < 10 ? `0${days}D` : `${days}D`;
};

const castHoursInterval = (hours) => {
  return hours < 10 ? `0${hours}H` : `${hours}H`;
};

const castMinutesInterval = (minutes) => {
  return minutes < 10 ? `0${minutes}M` : `${minutes}M`;
};
const generateTimeInterval = (dateStart, dateEnd) => {
  const daysDiff = Math.abs(dateStart.getDay() - dateEnd.getDay());
  const hoursDiff = Math.abs(dateStart.getHours() - dateEnd.getHours());
  const minutesDiff = Math.abs(dateStart.getMinutes() - dateEnd.getMinutes());

  let formattedInterval = daysDiff > 0 ? castDateInterval(daysDiff) : ``;
  if (daysDiff > 0 || hoursDiff > 0) {
    formattedInterval += ` ${castHoursInterval(hoursDiff)}`;
  }
  return formattedInterval + ` ${castMinutesInterval(minutesDiff)}`;
};

const formatedTime = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {generateTimeInterval, formatedTime, RenderPosition, createElement, render};
