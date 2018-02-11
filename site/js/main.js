var ctx = document.getElementById("passengerDataChart").getContext("2d");

window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url:
      "https://rawgit.com/gavinr/stl-lambert-airport-data/master/data/passenger-yearly-totals-data.csv",
    dataType: "text",
    success: function(csvString) {
      var data = Papa.parse(csvString, {
        header: true
      });
      console.log("data", data);

      var lineChartData = {
        labels: data.data.map(function(row) {
          return row.Year;
        }),
        datasets: [
          {
            label: "Total Passengers",
            borderColor: window.chartColors.red,
            backgroundColor: window.chartColors.red,
            fill: false,
            data: data.data.map(function(row) {
              return row.Total;
            }),
            yAxisID: "y-axis-1"
          }
        ]
      };

      var passengerDataChart = Chart.Line(ctx, {
        data: lineChartData,
        options: {
          responsive: true,
          hoverMode: "index",
          stacked: false,
          title: {
            display: false,
            text: "Total Passengers Per Year"
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
    }
  });
});
