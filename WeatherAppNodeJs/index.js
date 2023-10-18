const http = require('http');
const fs = require('fs');
var requests = require('requests');


const homeFile = fs.readFileSync('home.html', 'utf-8');
 const replaceVal = (tempVal, orgVal)=>{
    let temperature = tempVal.replace('{%tempval%}', orgVal.main.temp);
     temperature = temperature.replace('{%tempmin%}', orgVal.main.temp_min);
     temperature = temperature.replace('{%tempmax%}', orgVal.main.temp_max);
     temperature = temperature.replace('{%location%}', orgVal.name);
     temperature = temperature.replace('{%country%}', orgVal.sys.country);
     temperature = temperature.replace('{%tempstatus%}', orgVal.weather[0].main);    

return temperature;

 };
const server= http.createServer((req, res)=>{
    if(req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=e61ccd15f8b49983d436e3e03cb140b0', 
        )
.on('data', (chunk)=> {
    const objData = JSON.parse(chunk);
 const arrData = [objData];

//   console.log(arrData[0].main.temp);
const realTimeData = arrData.map((val)=>replaceVal(homeFile, val)).join(""); //data array main mil rha hai usko string main convert kra
  


res.write(realTimeData);
// console.log(realTimeData);

})
.on('end',  (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
    else{
        res.end('file not found')
    }
} );

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to server');
});














