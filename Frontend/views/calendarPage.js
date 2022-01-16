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

  const firstDayOfTheMonth = ` is-${weekDays[dayOfTheWeek]}`;

  return firstDayOfTheMonth;
}

export default function calendar() {
  const calendarControls = document.createElement("div");
  calendarControls.className = "Calendar-controls";

  const buttonContainer = document.createElement("div");

  const prevButton = document.createElement("button");
  prevButton.className = "Calendar-prevButton";
  prevButton.innerHTML = "<"; //

  const nextButton = document.createElement("button");
  nextButton.className = "Calendar-prevButton";
  nextButton.innerHTML = ">";

  const month = document.createElement("div");
  month.className = "Calendar-month";
  const date = new Date();
  const firstDay = new Date(2022, 0, 1);
  const dayOfTheWeek = firstDay.getDay();
  const today = date.getDate();
  const currentMonth = date.toLocaleString("default", { month: "long" });
  month.innerHTML = currentMonth;

  const year = document.createElement("div");
  year.className = "Calendar-year";
  const currentYear = date.getFullYear();
  year.innerHTML = currentYear;

  const calendar = document.createElement("div");
  calendar.className = "Calendar";

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weekdays.forEach((day) => {
    const weekday = document.createElement("div");
    weekday.className = "Calendar-weekday";
    weekday.innerHTML = day;
    calendar.appendChild(weekday);
  });

  console.log(date.getMonth, "date", date.getMonth + 1, "date +1");
  getDays(date.getMonth(), 2022);

  function getDays(month2, year2) {
    const days = numberOfDaysArray(year2, month2).map((dayy, index) => {
      const day = document.createElement("div");
      day.className = "Calendar-day";
      day.innerHTML = dayy;

      const firstDayOfTheMonth =
        index === 0 ? calculateFirstDayOfTheMonth(dayOfTheWeek) : "";

      if (dayy === today) {
        day.className = "Calendar-day is-today";
      }

      day.className += firstDayOfTheMonth;
      return day;
    });
    calendar.append(...days);
  }

  prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("previous button was clicked!");
  });

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("next button was clicked!");
  });

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);
  calendarControls.appendChild(buttonContainer);
  calendarControls.appendChild(month);
  calendarControls.appendChild(year);
  body.append(calendarControls);
  body.append(calendar);
}
