<script>
  import { onMount } from "svelte";
  import Papa from "papaparse";
  import ChartMonthly from "../components/ChartMonthly.svelte";

  let totalPassengersData;

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

  const getChartData = async (urls) => {
    if (process.browser) {
      return Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          const text = await response.text();
          return Papa.parse(text, {
            header: true,
          });
        })
      );
    }
  };

  let chartDataPromise;
  // https://github.com/sveltejs/sapper/issues/753
  chartDataPromise = getChartData([
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/monthly.csv",
  ]);
</script>

<style>
  .chartWrapper {
    margin-bottom: 100px;
  }
</style>

<svelte:head>
  <title>Monthly</title>
</svelte:head>
<h1>Monthly</h1>

{#await chartDataPromise}
  <p>Getting data ...</p>
{:then chartData}
  <h2>Total Passengers</h2>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Total Passengers"
      labels={months}
      dataPropertyY="Total Passengers" />
  </p>

  <h2>Aircraft Departures (Passenger)</h2>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Aircraft Departures (Passenger)"
      labels={months}
      dataPropertyY="Aircraft Departures (Passenger)" />
  </p>

  <h2>Aircraft Departures (Cargo)</h2>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Aircraft Departures (Cargo)"
      labels={months}
      dataPropertyY="Aircraft Departures (Cargo)" />
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}
