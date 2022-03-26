const sendLocalizationBtn =document.querySelector("#sendLocalizationBtn");


//Listener for sendBtn in form
sendLocalizationBtn.addEventListener("click",(e)=>{
    document.querySelector("#localizationForm").style.display="none";
    loadingScreen(".card","flex");
    document.querySelectorAll("i").forEach(element=>{
        element.style.fontSize="1.5em";
        element.style.margin="0 8px";
    })
    loadData();
});




//Listener for backBtn in card
document.querySelector("#backBtn").addEventListener("click",()=>{
    document.querySelector(".card").style.display="none";
    loadingScreen("#localizationForm","flex");
})

//toHide- a DOM element we want to hide, need to be selected like CSS element. For example : ".card"
// displayStyle- taking in a display property you want to style
function loadingScreen(toHide,displayStyle){

    //This is a animation added with spans
    const spans=document.querySelectorAll("span");
    spans.forEach(element => {
        element.style.display="inline-block";
    });

    setTimeout(()=>{
        spans.forEach(element => {
            element.style.display="none";
            document.querySelector(toHide).style.display=displayStyle;
        });
    },2000);
}

function getInput(){
    return document.querySelector("#inputData").value; //taking data from input
}

function loadData(){
    const apiKey="d336e0331793421db9f172819222503";
    //apikey for apiResponse
    
    //loading data for card element
    getData(apiKey,getInput())
    .then(res=>{
       //Loading every card element
       console.log(res)

       //Adding location
       const locationCity=document.querySelector("#locationCity");
       locationCity.innerHTML=`
        ${res.location.name}, ${res.location.country}
        <i class="fa-solid fa-location-dot">
        `;

        //Adding Picture
        const img=document.querySelector("#img");
        img.innerHTML=`
        <img src="${res.current.condition.icon}"></img>
        <h2>${res.current.condition.text}</h2>
        `
       //Adding temperature;
       const temperature=document.querySelector("#temperature");
       temperature.innerHTML=`
       <div>
        Temperature:
        ${res.current.temp_c}
        <i class="fa-solid fa-temperature-high"></i>
       </div>
       `;

        //Adding date
       const date=document.querySelector("#date");
       date.innerHTML=`
       <div>
       Date/Time: ${res.location.localtime}
       </div>
       `;


        //Adding wind and humidity
        const windHumidity=document.querySelector("#windHumidity");
        windHumidity.innerHTML=`
        <div>   
            Wind <i class="fa-solid fa-wind"></i> :
            ${res.current.wind_kph} km/h 
        </div>
        <div>
            Humidity <i class="fa-solid fa-droplet"></i> : ${res.current.humidity}%
        </div>
        `;

        //Adding pressure
        const pressure=document.querySelector("#pressure");
        pressure.innerHTML=`
        Pressure:
        ${res.current.pressure_mb} hPa
        `
    })
    .catch(error=>{
        const card=document.querySelector(".card");
        const location=document.querySelector("#location");

        const alertDiv=document.createElement("div");
        alertDiv.className="alert";
        alertDiv.textContent=`Error:${error}`;
        card.appendChild(alertDiv,location);
        setTimeout(()=>{
            card.removeChild(alertDiv);
        },3000);
        
    });
    

}

async function getData(apiKey,location){
    //getting Url of weather Api site
    const apiResponse=await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`) //fetching weatherApi 
    .then(res=>res.json())    //reversing data to json
    const jsonData=apiResponse;
    // const jsonLocation=await jsonData.location; 
    // const jsonCurrent = await jsonData.current;
    return jsonData;
}
