const apiKey="c638ef5e6d2bfcd26ba850fc94240f0e";
      const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const searchBox= document.querySelector(".search input");
      const searchBtn= document.querySelector(".search button");
      const weatherIcon=document.querySelector(".weather-icon");


      //for enter press and search
      searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent form submission or other default actions
          checkWeather(searchBox.value);
        }
      });
      searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
      })
      async function checkWeather(city) {
          const response = await fetch(apiUrl+city+ `&appid=${apiKey}`);
          if(response.status==404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
          }
          else{
            var data= await response.json();

          

          //data.name aur data.temp islye qki API me variable isee naam se h
          //.city aur .temp html ka div access krne k lye
         document.querySelector(".city").innerHTML = data.name;
         //qki temp main k andar hai
         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "ºc";
        document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
         document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

         if(data.weather[0].main == "Clouds"){
            weatherIcon.src= "images/clouds.png";
         }
         else if(data.weather[0].main == "Clear"){
            weatherIcon.src= "images/clear.png";
         }
         else if(data.weather[0].main == "Rain"){
            weatherIcon.src= "images/rain.png";
         }
         else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src= "images/drizzle.png";
         }
         else if(data.weather[0].main == "Mist"){
            weatherIcon.src= "images/mist.png";
         }

         document.querySelector(".weather").style.display = "block";
         document.querySelector(".error").style.display="none";
          }
          
      }
      