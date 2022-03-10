// import { navigateTo } from "../routing";
import header from "../header";
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

export function getDays(date) {
  // after selecting prev / next month current date is not selected
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
  const month = date.getMonth();
  const dayyy = date.getDate();
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("a");
    day.dataset.link = true;
    day.href = `/calendar/${year}-${months[month]}-${dayy
      .toString()
      .padStart(2, "0")}`;
    day.className = "Calendar-day";
    day.setAttribute("data-testid", "day-div");
    day.innerHTML = dayy;
    return day;
  });
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek));
  // only want it to add this class if I select the date or default date (today) is shown
  days[dayyy - 1].classList.add("selected-today");
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
  return new Date(year, month - 1, day || "01");
}

export default async function calendarPage({ date }) {
  const div = document.createElement("div");
  const headers = header(null, "calendar", null, "/choose");
  const calendar = document.createElement("div");
  calendar.className = "Calendar";
  const dateObject = parseDate(date);
  const calendarControls = createCalendarControls(dateObject);
  const days = getDays(dateObject, false); // false if no day is supplied
  const weekdays = createWeekdays();
  const categories = document.createElement("div");
  const button = showEntriesButton(dateObject);

  const hasEntries = { ...(await getEntries(dateObject)) }[0];

  categories.append(...(await getEntries(dateObject)));
  calendar.append(...weekdays);
  calendar.append(...days);
  div.append(headers);
  div.append(calendarControls);
  div.append(calendar);
  console.log(hasEntries, "has entries");
  if (hasEntries) {
    console.log("I am empty");
    div.append(categories);
    div.append(button);
  } else {
    const text = document.createElement("div");
    text.innerHTML = "No entry found.";
    text.style.margin = "20px";
    div.append(text);
  }
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
  const month = date.getMonth();
  const day = date.getDate();
  button.href = `/list/${year}-${months[month]}-${day
    .toString()
    .padStart(2, "0")}`;
  return button;
}
