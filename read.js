var theVal=[]

var chart
let fd=[]
let sd=[]
let td=[]
let fdCo2=[]
let sdCo2=[]
let tdCo2=[]

document.getElementById('getData').addEventListener('click', function(){
  let inp = document.getElementById("date-choose").value;
  fd=[]
  sd=[]
  td=[]
  fdCo2=[]
  sdCo2=[]
  tdCo2=[]
  const start =  new Date().getTime() - 24*60*60*1000*inp
  const end=new Date().getTime()

fetch('https://hibouair-noise-sensor-default-rtdb.europe-west1.firebasedatabase.app/noise_records.json')
  .then((response) => response.json())
  .then((data) => {
  /* let data={
      "-NDSWMqIBe6RoruwOkeZ": {
        "advData": "0201061BFF5B07050A60FDED00400000D90011020000000000000000021001",
        "boardID": "60FDED",
        "co2": 540,
        "noise": -61,
        "ts": "2022/10/03 13:05:15"
      },
      "-NDSWQVg5uXY4JYFFeV5": {
        "advData": "0201061BFF5B07050A190001003F000000000000000000000000000001E401",
        "boardID": "190001",
        "co2": 540,
        "noise": -63,
        "ts": "2022/10/03 13:05:16"
      },
      "-NDSWMqIBe6RoruwOkej": {
        "advData": "0201061BFF5B07050A60FDED00400000D90011020000000000000000021001",
        "boardID": "60FDED",
        "co2": 540,
        "noise": -61,
        "ts": "2022/10/03 13:05:18"
      },
      "-NDSWQVg5uXY4JYFFeVj": {
        "advData": "0201061BFF5B07050A190001003F000000000000000000000000000001E401",
        "boardID": "190001",
        "co2": 540,
        "noise": -63,
        "ts": "2022/10/03 13:05:18"
      },
      "-NDSWMqIBe6RoruwOkeh": {
        "advData": "0201061BFF5B07050A60FDED00400000D80011020000000000000000021001",
        "boardID": "60FDED",
        "co2": 540,
        "noise": -61,
        "ts": "2022/10/03 13:05:25"
      },
      "-NDSWQVg5uXY4JYFFeVh": {
        "advData": "0201061BFF5B07050A190001003F000000000000000000000000000001E401",
        "boardID": "190001",
        "co2": 540,
        "noise": -63,
        "ts": "2022/10/03 13:05:25"
      }
  } */
  
  theVal=[]

  for (let item in data) {
    if(inp!=0){
      if( 
      new Date(data[item].ts).getTime() >= start &&
      new Date(data[item].ts).getTime() <= end){
    if(data[item].boardID==="190001"){
      
      fd.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      fdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})
    }else if(data[item].boardID==="220049"){
      td.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      tdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})
    }else{
      sd.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      sdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})

      }
    }
  }else{
    if(data[item].boardID==="190001"){        
      fd.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      fdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})
    }else if(data[item].boardID==="220049"){
      td.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      tdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})
    }else{
      sd.push({y:data[item].noise,x:new Date(data[item].ts).getTime()})
      sdCo2.push({y:data[item].co2,x:new Date(data[item].ts).getTime()})
    }
  }
  }

    


    if(chart != undefined)
        chart.destroy();
    //console.log(data)
    /* for (let item in data) {
      if(inp!=0){
        if( 
        new Date(data[item].ts).getTime() >= start &&
        new Date(data[item].ts).getTime() <= end){
          theVal.push({
            boardID:data[item].boardID,
            noise:data[item].noise,
            ts:data[item].ts,
          })
        }
      }else{
        theVal.push({
          boardID:data[item].boardID,
          noise:data[item].noise,
          ts:data[item].ts,
        })

         
      }
      
    } */
    //console.log(theVal)
      chart=  new Chart("myChart", {
        type: "line",
        data: {
          datasets: [{
            label: '190001 Noise',
            backgroundColor: 'transparent',
            borderColor: 'rgb(75, 192, 192)',
            data: fd,
            yAxisID: 'noiseY',
          },
          
          {
            label: '60FDED Noise',
            backgroundColor: 'transparent',
            borderColor: 'rgb(139, 28, 76)',
            data: sd,
            yAxisID: 'noiseY',
          },
          {
            label: '220049 Noise',
            backgroundColor: 'transparent',
            borderColor: 'rgb(98, 76, 79)',
            data: td,
            yAxisID: 'noiseY',
          },
          {
            label: '190001 CO2',
            backgroundColor: 'transparent',
            borderColor: 'rgb(75, 192, 192)',
            data: fdCo2,
            yAxisID: 'co2Y',
          },
          
          {
            label: '60FDED CO2',
            backgroundColor: 'transparent',
            borderColor: 'rgb(139, 28, 76)',
            data: sdCo2,
            yAxisID: 'co2Y',
          },
          {
            label: '220049 CO2',
            backgroundColor: 'transparent',
            borderColor: 'rgb(98, 76, 79)',
            data: tdCo2,
            yAxisID: 'co2Y',
          }]
        },
        options: {
            responsive: true,
            tooltips: {
              callbacks: {
                title(datasets) {
                  var time = new Date(datasets[0].xLabel );
                  return (time.getMonth() + 1) + '/' + time.getDate() + ' ' + time.getHours()+ ':' + time.getMinutes()+ ':' + time.getSeconds();
                }
              }
            },
            scales: {
              xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                  callback(value) {
                    var time = new Date(value );
                    return (time.getMonth() + 1) + '/' + time.getDate() + ' ' + time.getHours()+ ':' + time.getMinutes()+ ':' + time.getSeconds();
                  }
                }
              }],
              "yAxes": [
                {
                  "scaleLabel": {
                    "display": true,
                    "labelString": "Noise"
                  },
                  "id": "noiseY",
                  "stacked": false,
                  "ticks": {
                    "beginAtZero": true
                  }
                },
                {
                  "scaleLabel": {
                    "display": true,
                    "labelString": "CO2"
                  },
                  "id": "co2Y",
                  "position": "right",
                  "stacked": false,
                  "ticks": {
                    "beginAtZero": true
                  }
                }
              ]
            },
            /* plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'x',
                }
              },
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            } */
          },
      });

  });
})






