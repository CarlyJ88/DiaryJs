// import { navigateTo } from "../routing";
import header from "../header";

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
  if (direction === "prev") {
    const month = Number(date.getMonth()) - 1;
    const year = Number(date.getFullYear());
    const year2 = Number(date.getFullYear()) - 1;
    const date2 = new Date(year, month, 1);
    button.href =
      month === -1
        ? `/calendar/${year2}-${months[Number(date2.getMonth())]}`
        : `/calendar/${year}-${months[Number(date2.getMonth())]}`;
  } else if (direction === "next") {
    const month = Number(date.getMonth()) + 1;
    const year = Number(date.getFullYear());
    const year2 = Number(date.getFullYear()) + 1;
    const date2 = new Date(date.getFullYear(), month, 1);
    button.href =
      month === 12
        ? `/calendar/${year2}-${months[Number(date2.getMonth())]}`
        : `/calendar/${year}-${months[Number(date2.getMonth())]}`;
  } else {
    month = date.getMonth();
    const year = date.getFullYear();
    const date2 = new Date(date.getFullYear(), month, 1);
    button.href = `/calendar/${year}-${months[Number(date2.getMonth())]}`;
  }
  button.dataset.link = true;
  button.className = `Calendar-${direction}Button`; // do I need 2 classes for this?
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
  const prevButton = createButton("prev", "<", date);
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

function getDays(month, year) {
  const date = new Date();
  const today = date.getDate(); // not needed to next and prev
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("div");
    day.className = "Calendar-day";
    day.innerHTML = dayy;
    return day;
  });
  days[today - 1].classList.add("is-today");
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek)); // fix which weekday first day of the month starts
  return days;
}

export default function calendarPage(date1) {
  const div = document.createElement("div");
  const headers = header(null, "calendar", null, "/new");
  const calendar = document.createElement("div");
  calendar.className = "Calendar";
  const date = new Date();
  let calendarControls;
  let days;
  if (Object.keys(date1).length === 0) {
    calendarControls = createCalendarControls(date);
    days = getDays(date.getMonth(), date.getYear());
  } else {
    const year = date1.date.slice(0, 4);
    const month = date1.date.slice(5, 7);
    const dateObject = new Date(`${month} 01, ${year}`);
    calendarControls = createCalendarControls((dateObject ||= date));
    days = getDays(dateObject.getMonth(), dateObject.getYear());
  }

  const weekdays = createWeekdays();
  calendar.append(...weekdays);
  calendar.append(...days);
  div.append(headers);
  div.append(calendarControls);
  div.append(calendar);
  return div;
}
