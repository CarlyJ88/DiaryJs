import { createDateObject, getDays } from "./calendarPage";
import "@testing-library/jest-dom";
import { screen, getByTestId, getByText } from "@testing-library/dom";

describe("calendar", () => {
  it("returns correct date 1", () => {
    const date = "2022-12";
    const date2 = new Date(2022, 12 - 1, 1);
    expect(createDateObject(date)).toEqual(date2);
  });
  it("returns correct date 2", () => {
    const date = "2022-01";
    const date2 = new Date(2022, 1 - 1, 1);
    expect(createDateObject(date)).toEqual(date2);
  });
  it("returns correct date 2", () => {
    const date = "2023-01";
    const date2 = new Date(2023, 1 - 1, 1);
    expect(createDateObject(date)).toEqual(date2);
  });
  it("'is-today' className is applied when the month and year are equal", () => {
    const incomingDate = new Date();
    const incomingMonth = incomingDate.getMonth();
    const incomingYear = incomingDate.getFullYear();
    const currentDay = incomingDate.getDate();

    const container = document.createElement("div");
    container.append(...getDays(incomingMonth, incomingYear, currentDay));

    expect(getByText(container, currentDay)).toHaveClass("selected-today");
  });
  it("'is-today' className is not applied when the month and year are not equal", () => {
    const incomingDate = new Date(2021, 10, 24);
    const incomingMonth = incomingDate.getMonth();
    const incomingYear = incomingDate.getFullYear();
    const currentDay = 24;
    const selectedDay = 2;

    const container = document.createElement("div");
    container.append(...getDays(incomingMonth, incomingYear, selectedDay));

    expect(getByText(container, currentDay)).not.toHaveClass("selected-today");
  });
});
