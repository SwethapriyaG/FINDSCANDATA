import * as my_dongle from 'bleuio'
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg3K27JuQ6K9nrGGyfbfGVA4Wo3N8VgqE",
  authDomain: "hibouair-noise-sensor.firebaseapp.com",
  projectId: "hibouair-noise-sensor",
  storageBucket: "hibouair-noise-sensor.appspot.com",
  messagingSenderId: "578912360423",
  appId: "1:578912360423:web:ace126efdcb9f9089e0f42",
  databaseURL: "https://hibouair-noise-sensor-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect().then(()=>{
    my_dongle.at_central()
  })
})


const parseSensorData =((data)=>{
  let pos = data.indexOf("5B0705")
  let dt = new Date();
  let currentTs = dt.getFullYear() 
  + '/' 
  + (dt.getMonth() + 1).toString().padStart(2, "0") 
  + '/' 
  + dt.getDate().toString().padStart(2, "0")
  +' '
  +
  dt.getHours().toString().padStart(2, "0")
  +
  ':'
  +
  dt.getMinutes().toString().padStart(2, "0")
  +
  ':'
  +dt.getSeconds().toString().padStart(2, "0")
  let tempHex=parseInt('0x'+data.substr(pos+22,4).match(/../g).reverse().join(''))
  if(tempHex>1000)
    tempHex = (tempHex - (65535 + 1) )/10
  else
    tempHex = tempHex/10
  return {
    "boardID":data.substr(pos+8,6),
    //"type":parseInt('0x'+data.substr(pos+6,2)),
    "noise":-parseInt('0x'+data.substr(pos+14,4)),
    
    //"pressure":parseInt('0x'+data.substr(pos+18,4).match(/../g).reverse().join(''))/10,
    //"temp":tempHex,
    //"hum":parseInt('0x'+data.substr(pos+26,4).match(/../g).reverse().join(''))/10,
    //"voc":parseInt('0x'+data.substr(pos+30,4).match(/../g).reverse().join('')),
    //"pm1":parseInt('0x'+data.substr(pos+34,4).match(/../g).reverse().join(''))/10,
    //"pm25":parseInt('0x'+data.substr(pos+38,4).match(/../g).reverse().join(''))/10,
    //"pm10":parseInt('0x'+data.substr(pos+42,4).match(/../g).reverse().join(''))/10,
    "co2":parseInt('0x'+data.substr(pos+46,4)),
    //"vocType":parseInt('0x'+data.substr(pos+50,2)),
    "advData":data,
    "ts":currentTs
  }
})

 let devArr=['[48:23:35:00:0E:B7]','[48:23:35:00:0E:1A]']
let advArr=[]
const sendDataToCloud = (()=>{
  advArr=[]
    //get the scan target device id by scanning for device.
    //my_dongle.at_scantarget('[1]E7:49:6B:86:45:81,[1]C9:70:27:AF:01:44,[1]D2:B1:28:3F:42:D4',10).then((data)
    my_dongle.at_findscandata('02010609FF0',6).then((data)=>{
        let theAdvData = data.filter(element => element.includes("ADV"));
        if(theAdvData && theAdvData.length>0){
          console.log('theAdvData',theAdvData)
          for(let i=0;i<devArr.length;i++){
            for(let j=0;j<theAdvData.length;j++){
              if(theAdvData[j].split(" ")[0]==devArr[i]){
                advArr.push(theAdvData[j].split(" ").pop())
                break;
              }
            }	
          }
          console.log('advArr',advArr)
          let airQualityData1 = parseSensorData(advArr[0])
          let airQualityData2 = parseSensorData(advArr[1])
          let airQualityData3 = parseSensorData(advArr[2])
          console.log('airQualityData1',airQualityData1)
          console.log('airQualityData2',airQualityData2)
          console.log('airQualityData3',airQualityData3)

            //let advData = theAdvData[0].split("[ADV]: ")
            //console.log('advData',advData)
            // converting advertising string to meaningfull numbers 
            //and pass it to an array of objects
            //let airQualityData = parseSensorData(advData[1])
            //console.log('airQualityData',airQualityData)
            // save the data to database 
            let database = firebase.database(); // which gets the database 
            let ref = database.ref("noise_records");
            //pushing the object to the reference
            ref.push(airQualityData1)
            setTimeout(()=>{
              ref.push(airQualityData2)
              setTimeout(()=>{
                ref.push(airQualityData3)
              },1000)
            },1000)
            
            document.getElementById("log").innerHTML=JSON.stringify(airQualityData1);
            document.getElementById("log").innerHTML +='<br/>'+JSON.stringify(airQualityData2);
            document.getElementById("log").innerHTML +='<br/>'+JSON.stringify(airQualityData3);
        }
    })
})
var intervalId
document.getElementById('sendDataTCloudBtn').addEventListener('click', function(){
    sendDataToCloud()
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(sendDataToCloud ,15000);
    document.getElementById("log").innerHTML="Sending data to cloud. Click stop sending data to stop the process.";

})
document.getElementById('stopSendingData').addEventListener('click', function(){
    clearInterval(intervalId)
    document.getElementById("log").innerHTML="Sending data stopped.";
 })
