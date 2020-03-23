import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

// mock the async function!
jest.mock("./api/fetchShow");

const showData = {
  data: [
    {
    id: 553946,
    url: "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    name: "Chapter One: The Vanishing of Will Byers",
    season: 1,
    number: 1,
    airdate: "2016-07-15",
    airtime: "",
    airstamp: "2016-07-15T12:00:00+00:00",
    runtime: 60
    }
  ]
};

// javascript feature called async/await
test("app fetches data", async () => {
  // mock the resolved data
  mockFetchShow.mockResolvedValueOnce(showData);
  // render the component
  const { queryAllByTestId } = render(<App />);

  // await for the data to be fetched
  await waitFor(() =>
    // query for the missions array / assert that it is rendered
    expect(queryAllByTestId(/episode-list/i)).toHaveLength(3)
  );

  // can also do other assertions out here. Await means this code won't run until the promise resolves
  expect(mockFetchShow).toHaveBeenCalledTimes(1);
});