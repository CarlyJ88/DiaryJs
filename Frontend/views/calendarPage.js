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

function createButton(direction, symbol, handler) {
  const button = document.createElement("button");
  button.className = `Calendar-${direction}Button`;
  button.innerHTML = symbol;
  button.addEventListener("click", handler);
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
  const fullMonth = date.toLocaleString("default", { month: "long" });
  const fullYear = date.getFullYear();
  const month = createDateDiv(fullMonth, "Calendar-month");
  const year = createDateDiv(fullYear, "Calendar-year");
  const prevButton = createButton("prev", "<", prevHandler);
  const nextButton = createButton("next", ">", nextHandler);

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);
  calendarControls.appendChild(buttonContainer);
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

function prevHandler(event) {
  event.preventDefault();
  console.log("previous button was clicked!");
  // return
}

function nextHandler(event) {
  event.preventDefault();
  console.log("next button was clicked!");
  // return
}

function getDays(month, year) {
  const date = new Date();
  const today = date.getDate();
  const firstDay = new Date(year, month, 1);
  const dayOfTheWeek = firstDay.getDay();
  const days = numberOfDaysArray(year, month).map((dayy) => {
    const day = document.createElement("div");
    day.className = "Calendar-day";
    day.innerHTML = dayy;
    return day;
  });
  days[today - 1].classList.add("is-today");
  days[0].classList.add(calculateFirstDayOfTheMonth(dayOfTheWeek));
  return days;
}

export default function calendar() {
  const date = new Date();
  const calendar = document.createElement("div");
  calendar.className = "Calendar";

  // console.log(date.getMonth, "date", date.getMonth + 1, "date +1");
  const days = getDays(date.getMonth(), date.getYear());
  const weekdays = createWeekdays();
  console.log(days, "days");
  body.append(createCalendarControls(date));
  calendar.append(...weekdays);
  calendar.append(...days);
  body.append(calendar);
}
