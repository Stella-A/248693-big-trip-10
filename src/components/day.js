import {formatedTime} from '../util.js';
import {MonthNames} from '../const.js';

export const createTripDayTemplate = (event) => {
  const {dateStart} = event;

  const dayStart = `${formatedTime(dateStart.getFullYear())}-${formatedTime(dateStart.getMonth() + 1)}-${formatedTime(dateStart.getDate())}`;
  const month = MonthNames[dateStart.getMonth()].toLowerCase();
  const day = formatedTime(dateStart.getDate());

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${dayStart}">${month} ${day}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};
