 let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 let current_dayindex;

function nextday() {
    if(current_dayindex==6){
        current_dayindex=0;
        return weekdays[current_dayindex]; 
    }
    return weekdays[++current_dayindex]; 
}
 
function select_description(x){
    if(x=='01d' || x=='01n'){
        return 'Clear Sky';
    }
    else if(x=='02d' || x=='02n'){
        return 'Partly Sunny';
    }
    else if(x=='03d' || x=='03n'){
        return 'Partly Cloudy';
    }
    else if(x=='04d' || x=='04n'){
        return 'Cloudy';
    }
    else if(x=='09d' || x=='09n' || x=='10d' || x=='10n'){
        return 'Rain';
    }
    else if(x=='11d' || x=='11n'){
        return 'Thunderstorm';
    }
    else if(x=='13d' || x=='13n'){
        return 'Snow';
    }
    else{
        return 'Mist';
    }
}
 
function convert_to_centigrade(x) {
    return Math.ceil((x - 32) * 5 / 9);   
}

function UnixToDate(unixTimestamp) {
    const dateObj = new Date(unixTimestamp);
    
    let month = `${dateObj.getMonth()+1}`;
    let day = `${dateObj.getDate()}`;
  
    if(day.length==1){
      day='0'+day;
    }
    if(month.length==1){
      month='0'+month;
    }
  
    return `${day}/${month}`;
}

function UnixToTime(unixTimestamp) {
    const dateObj = new Date(unixTimestamp*1000);
    
    let hour = `${dateObj.getHours()}`;
    let minute = `${dateObj.getMinutes()}`;

    if(hour.length==1){
        hour='0'+hour;
    }
    if(minute.length==1){
        minute='0'+minute;
    }
    
    return ` ${hour}:${minute}`;
}



// Get Air Quality
const option1 = {
        method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': '988a2f653amsh38c71cbc62ba81ap1774acjsn0660dd4b5576',
    		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
        }
};
    
const getAirQuality = (input)=>{
    
    fetch('https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=' + input, option1)
        .then((response) => response.json()) // converting in JSON & returning
        .then((response) => {
    
    
            // console.log(response);
             
             so2.innerHTML = response.SO2.concentration;
             so2_aqi.innerHTML = response.SO2.aqi;
             no2.innerHTML = response.NO2.concentration;
             no2_aqi.innerHTML = response.NO2.aqi;
             co.innerHTML = response.CO.concentration;
             co_aqi.innerHTML = response.CO.aqi;
             o3.innerHTML = response.O3.concentration;
             o3_aqi.innerHTML = response.O3.aqi;
             pm25.innerHTML = response["PM2.5"].concentration;
             pm25_aqi.innerHTML = response["PM2.5"].aqi;
             pm10.innerHTML = response.PM10.concentration;
             pm10_aqi.innerHTML = response.PM10.aqi;

             overall_aqi.innerHTML = response.overall_aqi;
           
        })
        .catch((error) => console.error(error));
    
}
    


// Get Time
const option2 = {
        method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': '988a2f653amsh38c71cbc62ba81ap1774acjsn0660dd4b5576',
		    'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
        }
};
    
const getTime = (input)=>{
    fetch('https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=' + input, option2)
        .then((response) => response.json())
        .then((response) => {
    
            // console.log(response);

            day.innerHTML = response.day;
            month.innerHTML = response.month;
            year.innerHTML = response.year; 
            hour.innerHTML = response.hour;
            minute.innerHTML = response.minute;
            day_of_week.innerHTML = response.day_of_week;


            current_dayindex = weekdays.indexOf(response.day_of_week);
            // console.log(current_dayindex);
            day1_weekday.innerHTML = nextday();
            day2_weekday.innerHTML = nextday();
            day3_weekday.innerHTML = nextday();
            day4_weekday.innerHTML = nextday();
            day5_weekday.innerHTML = nextday();
        
        })
        .catch((err) => console.error(err));
}
    


// Get Live Weather
const apiKey1 = "5dfd872886a5b16a99c8581a7f89f13d";

async function getWeatherByLocation(city){
     
         const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}`, {
             origin: "cros" });
         const response = await resp.json();
       
        //  console.log(response);

        temp.innerHTML = Math.floor(response.main.temp - 273.15);
        temp_min.innerHTML = Math.floor(response.main.temp_min - 274.15);
        temp_max.innerHTML = Math.floor(response.main.temp_max - 273.15);
        humidity.innerHTML = response.main.humidity;
        windspeed.innerHTML = response.wind.speed;
        visibility.innerHTML = Math.floor(response.visibility/1000);
        cityName.innerHTML = response.name;
        country.innerHTML = response.sys.country;
        weather_description_text.innerHTML = select_description(response['weather']['0']['icon']);
        air_pressure.innerHTML = response.main.pressure;
        sunrise.innerHTML = UnixToTime(response.sys.sunrise);
        sunset.innerHTML = UnixToTime(response.sys.sunset);

        live_weather_logo.innerHTML = ` <h1><img src="https://openweathermap.org/img/wn/${response['weather']['0']['icon'].replace('n','d')}@4x.png" /></h1> `;
};



// 5 Day Forecast
const apiKey2 = "916945d4d5ce791aceca848a6a2e2744";

async function getWeatherForecast(city){
     
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}`, {
        origin: "cros" });
        const response = await resp.json();
       
        //console.log(response['list']);

        day1_windspeed.innerHTML = Math.ceil(response['list']['3']['wind']['speed']);
        day2_windspeed.innerHTML = Math.ceil(response['list']['10']['wind']['speed']);
        day3_windspeed.innerHTML = Math.ceil(response['list']['18']['wind']['speed']);
        day4_windspeed.innerHTML = Math.ceil(response['list']['31']['wind']['speed']);
        day5_windspeed.innerHTML = Math.ceil(response['list']['39']['wind']['speed']);

        day1_humidity.innerHTML = response['list']['3']['main']['humidity'];
        day2_humidity.innerHTML = response['list']['10']['main']['humidity'];
        day3_humidity.innerHTML = response['list']['20']['main']['humidity'];
        day4_humidity.innerHTML = response['list']['31']['main']['humidity'];
        day5_humidity.innerHTML = response['list']['39']['main']['humidity'];

        day1_description.innerHTML = select_description(response['list']['3']['weather']['0']['icon']);
        day2_description.innerHTML = select_description(response['list']['11']['weather']['0']['icon']);
        day3_description.innerHTML = select_description(response['list']['20']['weather']['0']['icon']);
        day4_description.innerHTML = select_description(response['list']['31']['weather']['0']['icon']);
        day5_description.innerHTML = select_description(response['list']['39']['weather']['0']['icon']);

        day1_logo.innerHTML = `<img src="https://openweathermap.org/img/wn/${response['list']['3']['weather']['0']['icon'].replace('n','d')}@2x.png" />`
        day2_logo.innerHTML = `<img src="https://openweathermap.org/img/wn/${response['list']['11']['weather']['0']['icon'].replace('n','d')}@2x.png" />`
        day3_logo.innerHTML = `<img src="https://openweathermap.org/img/wn/${response['list']['20']['weather']['0']['icon'].replace('n','d')}@2x.png" />`
        day4_logo.innerHTML = `<img src="https://openweathermap.org/img/wn/${response['list']['31']['weather']['0']['icon'].replace('n','d')}@2x.png" />`
        day5_logo.innerHTML = `<img src="https://openweathermap.org/img/wn/${response['list']['39']['weather']['0']['icon'].replace('n','d')}@2x.png" />`
  
};



// 5 Day Forecast(Temp,Date)
const option3 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '988a2f653amsh38c71cbc62ba81ap1774acjsn0660dd4b5576',
		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
	}
};

const getWeatherForecast2 = (city) => {
     fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${city}&contentType=json&unitGroup=us&shortColumnNames=true`,option3)
     .then((response) => response.json()) // converting in JSON & returning
     .then((response) => {
        // console.log(response);
        day1_temp.innerHTML = convert_to_centigrade(response['locations'][`${city}`]['values']['1']['temp']);
        day2_temp.innerHTML = convert_to_centigrade(response['locations'][`${city}`]['values']['2']['temp']);
        day3_temp.innerHTML = convert_to_centigrade(response['locations'][`${city}`]['values']['3']['temp']);
        day4_temp.innerHTML = convert_to_centigrade(response['locations'][`${city}`]['values']['4']['temp']);
        day5_temp.innerHTML = convert_to_centigrade(response['locations'][`${city}`]['values']['5']['temp']);

        day1_date.innerHTML = UnixToDate(response['locations'][`${city}`]['values']['1']['datetime']);
        day2_date.innerHTML = UnixToDate(response['locations'][`${city}`]['values']['2']['datetime']);
        day3_date.innerHTML = UnixToDate(response['locations'][`${city}`]['values']['3']['datetime']);
        day4_date.innerHTML = UnixToDate(response['locations'][`${city}`]['values']['4']['datetime']);
        day5_date.innerHTML = UnixToDate(response['locations'][`${city}`]['values']['5']['datetime']);
     })
     .catch((error) => console.error(error));
}




submit.addEventListener("click",(e) =>{
    e.preventDefault();

    let city = input.value;
    if(city){
        getAirQuality(input.value);
        getTime(input.value);
        getWeatherByLocation(input.value);
        getWeatherForecast(input.value);
        getWeatherForecast2(input.value);
    }
    else{
        alert("Enter a Location");
    }
});

getAirQuality("kolkata");
getTime("kolkata");
getWeatherByLocation("kolkata");
getWeatherForecast("kolkata");
getWeatherForecast2("kolkata");


