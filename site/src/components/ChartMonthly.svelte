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
    if (typeof labels === "string") {
      labels = data.map(function (row) {
        return row[labels];
      });
    }

    const dataArraysObject = data.reduce((acc, cur) => {
      if (cur.Year && cur.Year !== "") {
        if (!acc.hasOwnProperty(cur.Year)) {
          acc[cur.Year] = [];
        }
        acc[cur.Year].push(cur[dataPropertyY]);
      }
      return acc;
    }, {});

    // https://colorbrewer2.org/?type=qualitative&scheme=Paired&n=5
    const colors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"];

    const dataSets = Object.keys(dataArraysObject).map((key, i) => {
      const arr = dataArraysObject[key];
      return {
        label: key,
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false,
        data: arr,
        yAxisID: "y-axis-1",
      };
    });

    var lineChartData = {
      labels: labels,
      datasets: dataSets,
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
        legend: {
          display: true,
        },
      },
    });
  };

  onMount(() => {
    createChart(ctx, data, title, labels, dataPropertyY);
  });
</script>

<canvas class="chart" bind:this={ctx} />
