const { findMaxPolluted } = require("./utils");
const { BASE_URL } = require("./consts");

test("Find Max Reading", () => {
  expect(
    findMaxPolluted([
      {
        Result: {
          Pollution: {
            ts: "2024-01-12T18:00:00.000Z",
            aqius: 87,
            mainus: "p2",
            aqicn: 42,
            maincn: "p2",
          },
        },
      },
      {
        Result: {
          Pollution: {
            ts: "2024-01-12T18:00:00.000Z",
            aqius: 3,
            mainus: "p2",
            aqicn: 42,
            maincn: "p2",
          },
        },
      },
    ])
  ).toEqual({
    Result: {
      Pollution: {
        ts: "2024-01-12T18:00:00.000Z",
        aqius: 87,
        mainus: "p2",
        aqicn: 42,
        maincn: "p2",
      },
    },
  });
});

test("Find Max Reading", () => {
  expect(findMaxPolluted([])).toEqual(undefined);
});
