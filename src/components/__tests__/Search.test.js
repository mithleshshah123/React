import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

test("Should search resList for cafe text input", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const beforesearch = screen.getAllByTestId("resCard");
  expect(beforesearch.length).toBe(8)

  const searchBtn = screen.getByRole("button",{name: "Search"});

  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, {target: {value: "cafe"}});

  fireEvent.click(searchBtn);

  const cards = screen.getAllByTestId("resCard");

  expect(cards.length).toBe(2);
});

test("Should search top rated restaurants", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const beforefilter = screen.getAllByTestId("resCard");
  expect(beforefilter.length).toBe(8)

  const topRatedBtn = screen.getByRole("button",{name: "Top Rated Restaurant"});

  fireEvent.click(topRatedBtn);

  const cards = screen.getAllByTestId("resCard");

  expect(cards.length).toBe(5);
});
