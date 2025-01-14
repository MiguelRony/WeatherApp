
const search = document.getElementById('search');
const searchButton = document.getElementById('searchBtn');
const publicApiKey = '8MTN3S7BARCVRTK6XPE5C8M5Z';
const temp = document.getElementById('temp');
const conditionsText = document.getElementById('conditionsText');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const sensation = document.getElementById('sensation');
const resolvedAddress = document.getElementById('resolvedAddress');
const dimensionBtn = document.getElementById('dimension');
let unitGroup = 'us'; 

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = search.value;
    console.log(city);
    getWeather(city);
    search.value = '';
});

dimensionBtn.addEventListener('click', () => {
    if(unitGroup === 'us') {
        unitGroup = 'metric';
        dimensionBtn.textContent = '°F';
    } else {
        unitGroup = 'us';
        dimensionBtn.textContent = '°C';
    }
    getWeather(resolvedAddress.textContent);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${publicApiKey}&unitGroup=${unitGroup}`, {mode: 'cors'});
        const data = await response.json();
        temp.classList.remove('error');
        conditionsText.classList.remove('error');
        humidity.classList.remove('error');
        description.classList.remove('error');
        sensation.classList.remove('error');
        resolvedAddress.classList.remove('error');

        temp.textContent = data.currentConditions.temp + ' °C';
        conditionsText.textContent = data.currentConditions.conditions;
        humidity.textContent = data.currentConditions.humidity + ' %';
        description.textContent = data.description;
        sensation.textContent = data.currentConditions.feelslike + ' °C';
        resolvedAddress.textContent = data.resolvedAddress;
        
    } catch (error) {
        const errorMessage = 'No information available';
        temp.textContent = errorMessage;
        temp.classList.add('error');
        conditionsText.textContent = errorMessage;
        conditionsText.classList.add('error');
        humidity.textContent = errorMessage;
        humidity.classList.add('error');
        description.textContent = errorMessage;
        description.classList.add('error');
        sensation.textContent = errorMessage;
        sensation.classList.add('error');
        resolvedAddress.textContent = errorMessage;
        resolvedAddress.classList.add('error');
    }
    
}