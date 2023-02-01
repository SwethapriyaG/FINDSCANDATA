var xValues=[]
var yValues=[]
var chart
document.getElementById('getData').addEventListener('click', function(){
fetch('https://hibouair-noise-sensor-default-rtdb.europe-west1.firebasedatabase.app/noise_records.json')
  .then((response) => response.json())
  .then((data) => {
    xValues=[]
    yValues=[]
    if(chart != undefined)
        chart.destroy();
    console.log(data)
    for (item in data) {
        yValues.push(data[item].noise);
        xValues.push(data[item].ts) 
      }
      

      chart=  new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: 'transparent',
            borderColor: 'rgb(75, 192, 192)',
            data: yValues
          }]
        },
        options: {
            responsive: true,

            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          },
      });

  });
})






