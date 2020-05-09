<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import Papa from "papaparse";

  const graphColor = "rgb(241, 101, 41)";

  export let data;
  export let title;
  export let labels;
  export let dataPropertyY;

  let ctx;

  const createChart = (ctx, data, label, labels, dataPropertyY) => {
    // console.log("data", data);
    if (typeof labels === "string") {
      labels = data.map(function (row) {
        return row[labels];
      });
    }

    data = data.map(function (row) {
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
          yAxisID: "y-axis-1",
        },
      ],
    };

    Chart.Line(ctx, {
      data: lineChartData,
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        title: {
          display: false,
          text: label,
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
                userCallback: function (value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(",");
                  return value;
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(",");
              return value;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    });
  };

  onMount(() => {
    createChart(ctx, data, title, labels, dataPropertyY);
  });
</script>

<canvas class="chart" bind:this={ctx} />
