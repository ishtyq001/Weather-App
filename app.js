// If the API request fails due to network issues, the code currently doesn't handle this scenario explicitly.
//To improve, you could add error handling using a try-catch block around the fetch call to catch and handle network errors gracefully.
//https://chatgpt.com/share/e5c2598f-6db7-4d96-9b82-acd65397b822
const apiKey="c638ef5e6d2bfcd26ba850fc94240f0e";
      const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const searchBox= document.querySelector(".search input");
      const searchBtn= document.querySelector(".search button");
      const weatherIcon=document.querySelector(".weather-icon");

            
      //for enter press and search
      searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent form submission or other default actions
              //event.preventDefault() is used to prevent the default behavior, such as form submission or other actions triggered by
              //pressing the Enter key. This allows the app to handle the Enter key press specifically for searching the weather.
          checkWeather(searchBox.value);
        }
      });
      searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
      })
      async function checkWeather(city) {
            
            //await is used to pause the execution of the checkWeather function until the promise returned by fetch and response.json() is resolved. 
            //This allows the code to wait for the API response and then process the JSON data.
          const response = await fetch(apiUrl+city+ `&appid=${apiKey}`);
            //If the city name is incorrect or not found, the response status will be 404. The code then displays an error message by making
            //the .error element visible and hides the .weather element.
          if(response.status==404){
                // These properties are used to control the visibility of elements on the page. style.display = "block" makes the element visible,
                //while style.display = "none" hides it. This is used to show or hide the weather information and error messages based on the API response.
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
            //The app checks the data.weather[0].main value returned by the API, which indicates the
                //weather condition (e.g., "Clouds," "Clear," "Rain"). Depending on this value, it updates the weatherIcon.src with the corresponding image.
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
      
