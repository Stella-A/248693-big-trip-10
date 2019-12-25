const castDateInterval = (days) => {
  return days < 10 ? `0${days}D` : `${days}D`;
};

const castHoursInterval = (hours) => {
  return hours < 10 ? `0${hours}H` : `${hours}H`;
};

const castMinutesInterval = (minutes) => {
  return minutes < 10 ? `0${minutes}M` : `${minutes}M`;
};

export const generateTimeInterval = (dateStart, dateEnd) => {
  const daysDiff = Math.abs(dateStart.getDay() - dateEnd.getDay());
  const hoursDiff = Math.abs(dateStart.getHours() - dateEnd.getHours());
  const minutesDiff = Math.abs(dateStart.getMinutes() - dateEnd.getMinutes());

  let formattedInterval = daysDiff > 0 ? castDateInterval(daysDiff) : ``;
  if (daysDiff > 0 || hoursDiff > 0) {
    formattedInterval += ` ${castHoursInterval(hoursDiff)}`;
  }
  return formattedInterval + ` ${castMinutesInterval(minutesDiff)}`;
};

export const formatedTime = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};
