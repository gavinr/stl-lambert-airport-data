<script>
  import { onMount } from "svelte";
  import Papa from "papaparse";
  import Chart from "../components/Chart.svelte";

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
  h2 {
    margin-top: 100px;
  }
</style>

<svelte:head>
  <title>Monthly</title>
</svelte:head>
<h1>Monthly</h1>

{#await chartDataPromise}
  <p>...waiting</p>
{:then chartData}
  <h2>Total Passengers</h2>
  <p>
    <Chart
      data={chartData[0].data}
      title="Total Passengers"
      labels={chartData[0].data.map((o) => {
        return `${months[o.Month - 1]} ${o.Year}`;
      })}
      dataPropertyY="Total Passengers" />
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}
