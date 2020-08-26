<script>
  import { getChartData, months } from "../utils.js";
  import ChartMonthly from "../components/ChartMonthly.svelte";

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
  <title>St. Louis Lambert Airport - Monthly Statistics</title>
</svelte:head>
<h1>St. Louis Lambert Airport - Monthly Statistics</h1>

{#await chartDataPromise}
  <p>Getting data ...</p>
{:then chartData}
  <h3>Total Passengers</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Total Passengers"
      labels={months}
      dataPropertyY="Total Passengers" />
  </p>

  <h3>Passenger Aircraft Departures</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Passenger Aircraft Departures"
      labels={months}
      dataPropertyY="Aircraft Departures (Passenger)" />
  </p>

  <h2>Cargo</h2>

  <h3>Air Cargo (lbs)</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Air Cargo (lbs)"
      labels={months}
      dataPropertyY="Air Cargo (lbs)" />
  </p>

  <h3>Cargo Aircraft Departures</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Cargo Aircraft Departures"
      labels={months}
      dataPropertyY="Aircraft Departures (Cargo)" />
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}
