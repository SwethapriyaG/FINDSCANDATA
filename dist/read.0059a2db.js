// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"AAsW":[function(require,module,exports) {
var theVal = [];
var chart;
var fd = [];
var sd = [];
var td = [];
var fdCo2 = [];
var sdCo2 = [];
var tdCo2 = [];
document.getElementById('getData').addEventListener('click', function () {
  var inp = document.getElementById("date-choose").value;
  fd = [];
  sd = [];
  td = [];
  fdCo2 = [];
  sdCo2 = [];
  tdCo2 = [];
  var start = new Date().getTime() - 24 * 60 * 60 * 1000 * inp;
  var end = new Date().getTime();
  fetch('https://hibouair-noise-sensor-default-rtdb.europe-west1.firebasedatabase.app/noise_records.json').then(function (response) {
    return response.json();
  }).then(function (data) {
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
    theVal = [];

    for (var item in data) {
      if (inp != 0) {
        if (new Date(data[item].ts).getTime() >= start && new Date(data[item].ts).getTime() <= end) {
          if (data[item].boardID === "190001") {
            fd.push({
              y: data[item].noise,
              x: new Date(data[item].ts).getTime()
            });
            fdCo2.push({
              y: data[item].co2,
              x: new Date(data[item].ts).getTime()
            });
          } else if (data[item].boardID === "220049") {
            td.push({
              y: data[item].noise,
              x: new Date(data[item].ts).getTime()
            });
            tdCo2.push({
              y: data[item].co2,
              x: new Date(data[item].ts).getTime()
            });
          } else {
            sd.push({
              y: data[item].noise,
              x: new Date(data[item].ts).getTime()
            });
            sdCo2.push({
              y: data[item].co2,
              x: new Date(data[item].ts).getTime()
            });
          }
        }
      } else {
        if (data[item].boardID === "190001") {
          fd.push({
            y: data[item].noise,
            x: new Date(data[item].ts).getTime()
          });
          fdCo2.push({
            y: data[item].co2,
            x: new Date(data[item].ts).getTime()
          });
        } else if (data[item].boardID === "220049") {
          td.push({
            y: data[item].noise,
            x: new Date(data[item].ts).getTime()
          });
          tdCo2.push({
            y: data[item].co2,
            x: new Date(data[item].ts).getTime()
          });
        } else {
          sd.push({
            y: data[item].noise,
            x: new Date(data[item].ts).getTime()
          });
          sdCo2.push({
            y: data[item].co2,
            x: new Date(data[item].ts).getTime()
          });
        }
      }
    }

    if (chart != undefined) chart.destroy(); //console.log(data)

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

    chart = new Chart("myChart", {
      type: "line",
      data: {
        datasets: [{
          label: '190001 Noise',
          backgroundColor: 'transparent',
          borderColor: 'rgb(75, 192, 192)',
          data: fd,
          yAxisID: 'noiseY'
        }, {
          label: '60FDED Noise',
          backgroundColor: 'transparent',
          borderColor: 'rgb(139, 28, 76)',
          data: sd,
          yAxisID: 'noiseY'
        }, {
          label: '220049 Noise',
          backgroundColor: 'transparent',
          borderColor: 'rgb(98, 76, 79)',
          data: td,
          yAxisID: 'noiseY'
        }, {
          label: '190001 CO2',
          backgroundColor: 'transparent',
          borderColor: 'rgb(75, 192, 192)',
          data: fdCo2,
          yAxisID: 'co2Y'
        }, {
          label: '60FDED CO2',
          backgroundColor: 'transparent',
          borderColor: 'rgb(139, 28, 76)',
          data: sdCo2,
          yAxisID: 'co2Y'
        }, {
          label: '220049 CO2',
          backgroundColor: 'transparent',
          borderColor: 'rgb(98, 76, 79)',
          data: tdCo2,
          yAxisID: 'co2Y'
        }]
      },
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            title: function title(datasets) {
              var time = new Date(datasets[0].xLabel);
              return time.getMonth() + 1 + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              callback: function callback(value) {
                var time = new Date(value);
                return time.getMonth() + 1 + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
              }
            }
          }],
          "yAxes": [{
            "scaleLabel": {
              "display": true,
              "labelString": "Noise"
            },
            "id": "noiseY",
            "stacked": false,
            "ticks": {
              "beginAtZero": true
            }
          }, {
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
          }]
        }
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

      }
    });
  });
});
},{}]},{},["AAsW"], null)
//# sourceMappingURL=/read.0059a2db.js.map