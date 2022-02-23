import { createDateObject } from "./calendarPage";

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
});
