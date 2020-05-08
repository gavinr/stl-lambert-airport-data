<script>
  import { onMount } from "svelte";
  import Papa from "papaparse";
  import Chart from "../components/Chart.svelte";

  let totalPassengersData;

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
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/passenger-yearly-totals-data.csv",
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/flight-takeoffs-and-landings.csv",
  ]);
</script>

<style>
  h2 {
    margin-top: 100px;
  }
</style>

<svelte:head>
  <title>Yearly</title>
</svelte:head>
<h1>Yearly</h1>

{#await chartDataPromise}
  <p>...waiting</p>
{:then chartData}
  <h2>Total Passengers</h2>
  <p>
    <Chart
      data={chartData[0].data}
      title="Total Passengers"
      labels="Year"
      dataPropertyY="Total" />
  </p>

  <h2>Total Flights</h2>
  <p>
    <Chart
      data={chartData[1].data}
      title="Total Flights"
      labels="Year"
      dataPropertyY="Airlines" />
  </p>

  <h2>Passengers Per Flight</h2>
  <p>
    <Chart
      data={chartData[0].data.map(function (row, i) {
        return { Year: row['Year'], Total: row['Total'] / chartData[1].data[i]['Airlines'] };
      })}
      title="Passengers Per Flight"
      labels="Year"
      dataPropertyY="Total" />
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}
