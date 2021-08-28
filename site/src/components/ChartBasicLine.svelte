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
          // hoverMode: "index",
          // stacked: false,
          plugins: {
            title: {
              display: false,
              text: label,
            },
            tooltip: {
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
          scales: {
            y:
              {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "left",
                beginAtZero: true,
                ticks: {
                  callback: function (value, index, values) {
                    let retValue = value.toString();
                    const retValueArr = retValue.split(/(?=(?:...)*$)/);
                    retValue = retValueArr.join(",");
                    return retValue;
                  },
                },
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
  