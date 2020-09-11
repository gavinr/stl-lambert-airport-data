<script>
  import { getChartData, months } from "../utils.js";
  import ChartMonthly from "../components/ChartMonthly.svelte";
  import ChartBasicLine from "../components/ChartBasicLine.svelte";

  let chartDataPromise;
  // https://github.com/sveltejs/sapper/issues/753
  chartDataPromise = getChartData([
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/monthly.csv",
  ]);

  let yearlyChartDataPromise;
  // https://github.com/sveltejs/sapper/issues/753
  yearlyChartDataPromise = getChartData([
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/passenger-yearly-totals-data.csv",
    "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/flight-takeoffs-and-landings.csv",
  ]);
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }
  p.right {
    text-align: right;
    font-weight: bold;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  .chartWrapper {
    margin-bottom: 100px;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 3em;
    }
  }
</style>

<svelte:head>
  <title>St. Louis Lambert International Airport Data</title>
</svelte:head>

<h1>St. Louis Lambert International Airport Data</h1>

{#await chartDataPromise}
  <p>Getting data ...</p>
{:then chartData}
  <h3>Total Passengers per Month</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Total Passengers"
      labels={months}
      dataPropertyY="Total Passengers" />
  </p>

  <h3>Air Cargo (lbs) per Month</h3>
  <p class="chartWrapper">
    <ChartMonthly
      data={chartData[0].data}
      title="Air Cargo (lbs)"
      labels={months}
      dataPropertyY="Air Cargo (lbs)" />
  </p>

  <p class="right">
    <a href="monthly">More monthly data »</a>
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}

{#await yearlyChartDataPromise}
  <p>Getting data ...</p>
{:then chartData}
  <h2>Total Passengers per Year</h2>
  <p class="chartWrapper">
    <ChartBasicLine
      data={chartData[0].data}
      title="Total Passengers"
      labels="Year"
      dataPropertyY="Total" />
  </p>

  <p class="right">
    <a href="yearly">More yearly data »</a>
  </p>
{:catch error}
  <p>Error getting data. Please try again later.</p>
{/await}
