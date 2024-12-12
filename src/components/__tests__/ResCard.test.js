import { render, screen } from "@testing-library/react"
import MOCK_DATA from "../mocks/resCardMock.json"
import RestaurantCard from "../RestaurantCard"
import "@testing-library/jest-dom";


test("SHould render Rescard component with props Data", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Healthy Bites");

    expect(name).toBeInTheDocument();
});