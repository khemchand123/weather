const request = require('request');
const key = require('../../Key/forcastKey.js');

const Weather = (cityName,callback) => {
   const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`;

   request({url:url,json:true},(error,response)=>{
         if (error) {
            callback(`Unable to connect Weather Server(Network Problem)`,undefined);
         } else if(response.body.cod == 404) {
            callback(`${response.body.message}`,undefined);
         }  else {

          let rain = "rain" in response.body.list[1];
          if(rain){
                 rain = response.body.list[1].rain['3h'];
          }else{
                rain = `No rain`;
          }
          let unit = '';
          if(rain != 'No rain'){
              unit = 'mm';
          }

           callback(undefined,`Weather Forcast:- ${rain} ${unit} , ${response.body.list[1].weather[0].description}  ,Temperature :  ${Math.floor(response.body.list[0].main.temp-273.15)} °C `  );
         }
  });
}

module.exports = Weather;
