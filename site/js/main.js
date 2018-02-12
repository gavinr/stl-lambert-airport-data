window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(241, 101, 41)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};


function createChart(divName, dataString, label, dataPropertyX, dataPropertyY) {
  var ctx = document.getElementById(divName).getContext("2d");

  if(typeof(dataString) === "object") {
    // if we have an array, this is the "passengers per flight"
    // we should probably refactor this in the future when we want more graphs
    var data1 = Papa.parse(dataString[0], {
      header: true
    });
    var data2 = Papa.parse(dataString[1], {
      header: true
    });

    var labels = data1.data.map(function(row) {
      return row['Year'];
    });

    data = data1.data.map(function(row, i) {
      return row['Total']/data2.data[i]['Airlines'];
    });
  } else {
    var data = Papa.parse(dataString, {
      header: true
    });

    var labels = data.data.map(function(row) {
      return row[dataPropertyX];
    });

    data = data.data.map(function(row) {
      return row[dataPropertyY];
    });
  }
  


  var lineChartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        borderColor: window.chartColors.orange,
        backgroundColor: window.chartColors.orange,
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
}

function getData(url) {
  return $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
  });
}


$(document).ready(function() {

  var passengerYearlyTotalsData = getData("https://rawgit.com/gavinr/stl-lambert-airport-data/master/data/passenger-yearly-totals-data.csv");
  var flightTakeoffsAndLandings = getData("https://rawgit.com/gavinr/stl-lambert-airport-data/master/data/flight-takeoffs-and-landings.csv");

  $.when(
    passengerYearlyTotalsData,
    flightTakeoffsAndLandings
  ).done(function(passengerYearlyTotalsData, flightTakeoffsAndLandings) {
    passengerYearlyTotalsData = passengerYearlyTotalsData[0];
    flightTakeoffsAndLandings = flightTakeoffsAndLandings[0];
    
    createChart("passengerDataChart", passengerYearlyTotalsData, "Total Passengers", "Year", "Total");
    createChart("totalFlightsAirlinesChart", flightTakeoffsAndLandings, "Total Flights", "Year", "Airlines");
    createChart("passengersPerFlightChart", [passengerYearlyTotalsData, flightTakeoffsAndLandings], "Passengers Per Flight");

  });


});