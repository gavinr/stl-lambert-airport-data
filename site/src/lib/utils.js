import Papa from "papaparse";

const getChartData = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      const text = await response.text();
      return Papa.parse(text, {
        header: true,
      });
    })
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { getChartData, months };
