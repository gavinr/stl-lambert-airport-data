<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import Papa from "papaparse";
  // import csvData from "../../../data/monthly.csv";

  let passengers;

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
    "December"
  ];

  const getChartData = async url => {
    const response = await fetch(url);
    const text = await response.text();
    return Papa.parse(text, {
      header: true
    });
  };

  let chartDataPromise;
  if (process.browser) {
    // https://github.com/sveltejs/sapper/issues/753
    chartDataPromise = getChartData(
      "https://cdn.jsdelivr.net/gh/gavinr/stl-lambert-airport-data@master/data/monthly.csv"
    );
  }

  onMount(() => {
    chartDataPromise.then(chartData => {
      console.log("chartData:", chartData);
      const labels = chartData.data.map(obj => {
        return `${months[obj.Month - 1]} ${obj.Year}`;
      });

      const totalPassengersData = chartData.data.map(obj => {
        return obj["Total Passengers"];
      });

      var myChart = new Chart(passengers.getContext("2d"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Passengers",
              data: totalPassengersData,
              backgroundColor: "rgba(255, 0, 0, 0.0)",
              borderColor: "rgba(255, 0, 0, 0.5)"
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var value = data.datasets[0].data[tooltipItem.index];
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(",");
                return value;
              }
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: true
                  // maxTicksLimit: 6
                },
                afterBuildTicks: res => {
                  res.ticks = res.ticks.map(tickString => {
                    if (tickString.indexOf("January") == 0) {
                      return tickString;
                    } else {
                      return "";
                    }
                  });
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  userCallback: function(value, index, values) {
                    // Convert the number to a string and split the string every 3 charaters from the end
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
    });
  });
</script>

<svelte:head>
  <title>Monthly</title>
</svelte:head>
<h1>Monthly</h1>

<p>
  <canvas class="chart" bind:this={passengers} />
</p>
