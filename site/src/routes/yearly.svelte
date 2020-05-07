<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import Papa from "papaparse";

  const graphColor = "rgb(241, 101, 41)";

  let totalPassengersCtx;
  let totalFlightCtx;
  let passengersPerFlightCtx;

  const getChartData = async urls => {
    return Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        const text = await response.text();
        return Papa.parse(text, {
          header: true
        });
      })
    );
  };

  let chartDataPromise;
  if (process.browser) {
    // https://github.com/sveltejs/sapper/issues/753
    chartDataPromise = getChartData([
      "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/passenger-yearly-totals-data.csv",
      "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/flight-takeoffs-and-landings.csv"
    ]);
  }

  const createChart = (ctx, data, label, dataPropertyX, dataPropertyY) => {
    var labels = data.map(function(row) {
      return row[dataPropertyX];
    });

    data = data.map(function(row) {
      return row[dataPropertyY];
    });

    var lineChartData = {
      labels: labels,
      datasets: [
        {
          label: label,
          borderColor: graphColor,
          backgroundColor: graphColor,
          fill: false,
          data: data,
          yAxisID: "y-axis-1"
        }
      ]
    };

    Chart.Line(ctx, {
      data: lineChartData,
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        title: {
          display: false,
          text: label
        },
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
              ticks: {
                beginAtZero: true,
                userCallback: function(value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(",");
                  return value;
                }
              }
            }
          ]
        }
      }
    });
  };

  onMount(() => {
    chartDataPromise.then(chartData => {
      console.log("chartData", chartData);
      createChart(
        totalPassengersCtx,
        chartData[0].data,
        "Total Passengers",
        "Year",
        "Total"
      );

      createChart(
        totalFlightCtx,
        chartData[1].data,
        "Total Flights",
        "Year",
        "Airlines"
      );

      const passengerPerFlightData = chartData[0].data.map(function(row, i) {
        console.log("row", row);
        return {
          Year: row["Year"],
          Total: row["Total"] / chartData[1].data[i]["Airlines"]
        };
      });

      createChart(
        passengersPerFlightCtx,
        passengerPerFlightData,
        "Passengers Per Flight",
        "Year",
        "Total"
      );
    });
  });
</script>

<svelte:head>
  <title>Yearly</title>
</svelte:head>

<h1>Yearly</h1>

<h2>Total Passengers</h2>

<p>
  <canvas class="chart" bind:this={totalPassengersCtx} />
</p>

<h2>Total Flights (from Passenger Airlines)</h2>

<p>
  <canvas class="chart" bind:this={totalFlightCtx} />
</p>

<h2>Passengers Per Flight</h2>

<p>
  <canvas class="chart" bind:this={passengersPerFlightCtx} />
</p>
