// import { navigateTo } from "../routing";
import header from "../header";
console.log(document, "document in calendar page");

function numberOfDaysArray(year, month) {
  return Array.from(
    Array(new Date(year, month + 1, 0).getDate()),
    (x, y) => y + 1
  );
}

function calculateFirstDayOfTheMonth(dayOfTheWeek) {
  const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const firstDayOfTheMonth = `is-${weekDays[dayOfTheWeek]}`;

  return firstDayOfTheMonth;
}

function createButton(direction, symbol, date) {
  //
  const button = document.createElement("a");
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const year = date.getFullYear();
  const m = date.getMonth();
  const prevMonth = m - 1;
  const nextMonth = m + 1;
  const month = direction === "prev" ? prevMonth : nextMonth;
  const date2 = new Date(year, month, 1);
  button.href = `/calendar/${date2.getFullYear()}-${months[date2.getMonth()]}`;
  button.dataset.link = true;
  button.className = `Calendar-button`;
  button.innerHTML = symbol;
  return button;
}

function createDateDiv(fullDate, dateClass) {
  const text = document.createElement("div");
  text.className = dateClass;
  text.innerHTML = fullDate;
  return text;
}

function createCalendarControls(date) {
  const calendarControls = document.createElement("div");
  calendarControls.className = "Calendar-controls";
  const buttonContainer = document.createElement("div");
  const prevButton = createButton("prev", "<", date); //
  const nextButton = createButton("next", ">", date);
  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);
  calendarControls.appendChild(buttonContainer);

  const fullMonth = date.toLocaleString("default", { month: "long" });
  const fullYear = date.getFullYear();
  const month = createDateDiv(fullMonth, "Calendar-month");
  const year = createDateDiv(fullYear, "Calendar-year");
  calendarControls.appendChild(month);
  calendarControls.appendChild(year);
  return calendarControls;
}

function createWeekdays() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdays.map((day) => {
    const weekday = document.createElement("div");
    weekday.className = "Calendar-weekday";
    weekday.innerHTML = day;
    return weekday;
  });
}

export function getDays(month, year) {
  const date = new Date();
  const today = date.getDate();
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("div");
    day.className = "Calendar-day";
    day.setAttribute("data-testid", "day-div"); // = "day-div";
    day.innerHTML = dayy;
    return day;
  });
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek));
  if (date.getMonth() === month && date.getFullYear() === year) {
    days[today - 1].classList.add("is-today");
  }
  return days;
}

export function createDateObject(date) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const dateObject = new Date(year, month - 1, 1);
  return dateObject;
}

export default function calendarPage({ date }) {
  const div = document.createElement("div");
  const headers = header(null, "calendar", null, "/new");
  const calendar = document.createElement("div");
  calendar.className = "Calendar";
  let calendarControls;
  let days;
  if (!date) {
    const date1 = new Date();
    calendarControls = createCalendarControls(date1);
    days = getDays(date1.getMonth(), date1.getFullYear());
  } else {
    const dateObject = createDateObject(date);
    calendarControls = createCalendarControls(dateObject);
    days = getDays(dateObject.getMonth(), dateObject.getFullYear());
  }

  const weekdays = createWeekdays();
  calendar.append(...weekdays);
  calendar.append(...days);
  div.append(headers);
  div.append(calendarControls);
  div.append(calendar);
  return div;
}
