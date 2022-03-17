import header from "../header";
import write from "../new.png";
import { getCategoriesByDate } from "../services/service";

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
  const button = document.createElement("a");
  const year = date.getFullYear();
  const m = date.getMonth();
  const prevMonth = m - 1;
  const nextMonth = m + 1;
  const month = direction === "prev" ? prevMonth : nextMonth;
  const date2 = new Date(year, month, 1);
  button.href = `/calendar/${date2.getFullYear()}-${formatMonth(month)}`;
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

function formatMonth(month) {
  return (month + 1).toString().padStart(2, "0");
}

function formatDay(dayy) {
  return dayy.toString().padStart(2, "0");
}

function selectedDay(date, dayyy, days, selectDay) {
  const today = new Date();
  if (
    (today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()) ||
    selectDay.length === 10
  ) {
    return days[dayyy - 1].classList.add("selected-today");
  }
}

export function getDays(date, selectDay) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayyy = date.getDate();
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("a");
    day.dataset.link = true;
    day.href = `/calendar/${year}-${formatMonth(month)}-${formatDay(dayy)}`;
    day.className = "Calendar-day";
    day.setAttribute("data-testid", "day-div");
    day.innerHTML = dayy;
    return day;
  });
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek));
  selectedDay(date, dayyy, days, selectDay);
  return days;
}

async function getData(date) {
  const entries = getCategoriesByDate(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`,
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
  );
  const response = await entries;
  return response;
}

async function getEntries(date) {
  const entries = await getData(date);
  const entry = entries.map((x) => {
    return showCategories(x);
  });
  return entry;
}

export function parseDate(date) {
  if (!date) {
    return new Date();
  }
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const today = new Date();
  return new Date(year, month - 1, day || today.getDate());
}

async function displayCategories(dateObject) {
  const entries = await getEntries(dateObject);
  const hasEntries = entries.length;
  if (hasEntries) {
    const categories = document.createElement("div");
    const button = showEntriesButton(dateObject);
    categories.append(...entries);
    return [categories, button];
  } else {
    const text = document.createElement("div");
    text.innerHTML = "No entry found.";
    text.style.margin = "20px";
    return [text];
  }
}

export default async function calendarPage({ date }) {
  const div = document.createElement("div");
  const headers = header("calendar", write, "/choose", "New item");
  const calendar = document.createElement("div");
  calendar.className = "Calendar";
  const dateObject = parseDate(date);
  const calendarControls = createCalendarControls(dateObject);
  const days = getDays(dateObject, date);
  const weekdays = createWeekdays();
  calendar.append(...weekdays);
  calendar.append(...days);
  div.append(headers);
  div.append(calendarControls);
  div.append(calendar);
  div.append(...(await displayCategories(dateObject)));
  return div;
}

function showCategories(category) {
  const categories = document.createElement("div");
  categories.className = "category-div";
  const circle = document.createElement("div");
  circle.className = "category-circle";
  circle.style.background = `rgb(${category.colourCode})`;
  const text = document.createElement("div");
  text.innerHTML = category.name;
  categories.append(circle);
  categories.append(text);
  return categories;
}

function showEntriesButton(date) {
  const button = document.createElement("a");
  button.className = "button";
  button.innerHTML = "Check out!";
  button.dataset.link = true;
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  button.href = `/list/${year}-${formatMonth(month)}-${formatDay(day)}`;
  return button;
}
