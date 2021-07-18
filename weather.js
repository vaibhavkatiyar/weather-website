let loc=document.getElementById("location");
let curr_temp=document.getElementById("curr_temp");
let max_temp=document.getElementById("max-temp");
let min_temp=document.getElementById("min-temp");
let wind_speed=document.getElementById("wind-speed");
let humidity=document.getElementById("humidity");
let time=document.getElementById("time");
let date=document.getElementById("date");
let temp_icon=document.getElementById("image");
let des_icon=document.getElementById("icon");
let description=document.getElementById("description");
let sunrise=document.getElementById("sunrise");
let sunset=document.getElementById("sunset");
let latitude=document.getElementById("latitude");
let longitude=document.getElementById("longitude");

let long;
let lat;

const search_input=document.getElementById("search_input");
const search_button=document.getElementById("search_button");

window.addEventListener("load",function(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(async (position)=>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=e48aad263d1e41dc8ce10cefc49a1f73");
        const weatherData = await response.json();
        //prints json format of API in console.
        const city_name = weatherData.name;
        getWeather(city_name);
        
        });
    }
    
})

search_button.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(search_input.value);
    search_input.value = '';
});

const getWeather=async (city) =>
{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
                            &appid=e48aad263d1e41dc8ce10cefc49a1f73`, {mode:'cors'});

        const weatherData = await response.json();
          //prints json format of API in console.
        const messagej = weatherData.message;
        if(messagej=="city not found")
        {
            alert("city not found!");

        }
        
        const name = weatherData.name;
        const des1 = weatherData.weather[0].main;
        const temp = Math.floor(weatherData.main.temp);
        const max_tempj=Math.floor(weatherData.main.temp_max);
        const min_tempj=Math.floor(weatherData.main.temp_min);
        const wind_speedj=weatherData.wind.speed;
        const humidityj=weatherData.main.humidity;
        const latj=weatherData.coord.lat;
        const longj=weatherData.coord.lon;
        const idj=weatherData.weather[0].id;
        const dtj=weatherData.dt;
        const dt=new Date(dtj*1000).toString();
        const day_datej=dt.substring(0,15);
        const timej=dt.substring(16,21);

        if (idj > 800) 
        {
            temp_icon.src = "icons/clear sky.jpg"; 
            des_icon.style.display = "inline";  
            des_icon.src = "icons/sun.png";
        }          
        else if (idj == 800)   
        {
            temp_icon.src = "icons/sunny sky.jpg";
            des_icon.style.display = "inline";
            des_icon.src="icons/sun.png";       
        }  
        else if (idj >= 700)
        {
            temp_icon.src = "icons/cloudy sky.jpg";
            des_icon.style.display = "inline";
            des_icon.src="icons/cloudy.png";
        } 
        else if (idj >= 600 )
        {
            temp_icon.src = "icons/snowy sky.jpg";
            des_icon.style.display = "inline"; 
            des_icon.src="icons/ice.png"
        }    
                   
        else if (idj >= 500 )  
        {
            temp_icon.src = "icons/rainy sky.jpg";
            des_icon.style.display = "inline";
            des_icon.src="icons/rain.png";
        }  
                 
        else if (idj >= 300 )
        {
            temp_icon.src = "icons/drizzle.jpg";
            des_icon.style.display = "inline";  
            des_icon.src="icons/rain.png";
        }    
              
        else if (idj >= 200) 
        {
            temp_icon.src = "icons/thunder storm.jpg"; 
            des_icon.style.display = "inline"; 
            des_icon.src="icons/thunder icon.png" ;
        }    
        
        loc.textContent = name;
        time.textContent=timej;
        description.textContent=des1;
        date.textContent=day_datej;
        curr_temp.textContent=temp-273+'\u00B0';
        max_temp.textContent=max_tempj-273;
        min_temp.textContent=min_tempj-273;
        const wind = (wind_speedj)*18/5;
        wind_speed.textContent=wind.toFixed(1);
        humidity.textContent=humidityj;
        latitude.textContent=latj;
        longitude.textContent=longj;
};


