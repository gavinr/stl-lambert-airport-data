<script>
    import {Chart, registerables} from "chart.js";
    Chart.register(...registerables);

    import { onMount } from "svelte";
  
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
  
      // https://colorbrewer2.org/?type=qualitative&scheme=Paired&n=6
      const colors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c"];
  
      const dataSets = Object.keys(dataArraysObject).map((key, i) => {
        const arr = dataArraysObject[key];
        return {
          label: key,
          borderColor: colors[i],
          backgroundColor: colors[i],
          fill: false,
          data: arr,
          yAxisID: "y",
          lineTension: 0.4
        };
      });
  
      var lineChartData = {
        labels: labels,
        datasets: dataSets,
      };
  
      new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
          scales: {
            y:
              {
                beginAtZero: true
              },
          },
        }
      });
    };
  
    onMount(() => {
      createChart(ctx, data, title, labels, dataPropertyY);
    });
  </script>
  
  <canvas class="chart" bind:this={ctx} />
  