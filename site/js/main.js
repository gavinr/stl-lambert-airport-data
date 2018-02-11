window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};


function createChart(divName, url, label, dataPropertyX, dataPropertyY) {
  var ctx = document.getElementById(divName).getContext("2d");
  $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
    success: function(csvString) {
      var data = Papa.parse(csvString, {
        header: true
      });

      var lineChartData = {
        labels: data.data.map(function(row) {
          return row[dataPropertyX];
        }),
        datasets: [
          {
            label: label,
            borderColor: window.chartColors.red,
            backgroundColor: window.chartColors.red,
            fill: false,
            data: data.data.map(function(row) {
              return row[dataPropertyY];
            }),
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
    }
  });
}


$(document).ready(function() {
  createChart("passengerDataChart", "https://rawgit.com/gavinr/stl-lambert-airport-data/master/data/passenger-yearly-totals-data.csv", "Total Passengers", "Year", "Total");
  createChart("totalFlightsAirlinesChart", "https://rawgit.com/gavinr/stl-lambert-airport-data/master/data/flight-takeoffs-and-landings.csv", "Total Flights", "Year", "Airlines");
});