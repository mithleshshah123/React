import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import Header from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import MOCK_DATA from "../mocks/mocksResmenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
});

it("Should load Restaurant menu component", async () => {
  await act(async () =>
    render(
        <BrowserRouter >
      <Provider store={appStore}>
        <Header />
        <RestaurantMenu />
        <Cart />
      </Provider>
      </BrowserRouter>
    )
  );

  const accrodian = screen.getByText("Recommended (20)");
  fireEvent.click(accrodian);

  expect(screen.getAllByTestId("fooditems").length).toBe(20);

  expect(screen.getByText("Cart - (0 items)" )).toBeInTheDocument;

  const addBtn = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtn[0]);

  expect(screen.getByText("Cart - (1 items)" )).toBeInTheDocument;

});
