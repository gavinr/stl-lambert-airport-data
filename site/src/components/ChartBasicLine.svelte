<script>
    import { Chart, registerables } from "chart.js";
    Chart.register(...registerables);
    
    import { onMount } from "svelte";
  
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
            yAxisID: "y",
            lineTension: 0.4
          },
        ],
      };
  
      new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y:
              {
                beginAtZero: true
              },
          },
        },
      });
    };
  
    onMount(() => {
      createChart(ctx, data, title, labels, dataPropertyY);
    });
  </script>
  
  <canvas class="chart" bind:this={ctx} />
  