// Weather and geocoding go through same-origin `/api/*` proxy (see server.js). No API key in the browser.
const API_BASE = '/api';
const ICON_URL = 'https://openweathermap.org/img/wn';
const DEGREE = '\u00B0';

async function parseJsonSafe(response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locateBtn = document.getElementById('locate-btn'); // ✅ NEW
const weatherContainer = document.getElementById('weather-container');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

// Create suggestions dropdown
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'suggestions-container hidden';
cityInput.parentNode.insertBefore(suggestionsContainer, cityInput.nextSibling);

// Weather data elements
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const sunPhase = document.getElementById('sun-phase');
const sunMarker = document.getElementById('sun-marker');
const sunProgress = document.getElementById('sun-progress');
const solarNoon = document.getElementById('solar-noon');
const forecastContainer = document.getElementById('forecast-container');
const forecastGraph = document.getElementById('forecast-graph');
const forecastSummary = document.getElementById('forecast-summary');
const graphRange = document.getElementById('graph-range');
let sunTimeline = null;

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
locateBtn.addEventListener('click', handleLocate);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        hideSuggestions();
        handleSearch();
    }
});

// Autocomplete functionality
let debounceTimer;
cityInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (query.length < 2) {
        hideSuggestions();
        return;
    }

    debounceTimer = setTimeout(() => fetchCitySuggestions(query), 300);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        hideSuggestions();
    }
});

// ✅ AUTO LOAD (UPDATED)
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (navigator.geolocation) {
        handleLocate();
    } else {
        fetchWeatherData('London');
    }
});

// 🔍 SEARCH
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
}

// 📍 LOCATE ME FEATURE
async function handleLocate() {
    if (!navigator.geolocation) {
        showError("Geolocation is not supported by your browser.");
        return;
    }

    showLoading();
    hideError();
    hideWeather();

    locateBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(null, { lat: latitude, lon: longitude });
            locateBtn.disabled = false;
        },
        (error) => {
            let msg = "Unable to retrieve your location.";
            if (error.code === error.PERMISSION_DENIED) {
                msg = "Location access denied. Please allow location permissions in your browser settings to use this feature.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                msg = "Location information is unavailable.";
            } else if (error.code === error.TIMEOUT) {
                msg = "Request to get user location timed out.";
            }
            
            showError(msg);
            hideLoading();
            locateBtn.disabled = false;
            
            // Fallback to default city if first load
            if (!cityName.textContent || cityName.textContent === 'City') {
                fetchWeatherData('London');
            }
        },
        { timeout: 10000 }
    );
}

// 🌐 FETCH WEATHER (REFACTORED)
async function fetchWeatherData(city = null, coords = null) {
    showLoading();
    hideError();
    hideWeather();

    try {
        let queryParams = '';
        if (coords) {
            queryParams = `lat=${coords.lat}&lon=${coords.lon}`;
        } else if (city) {
            queryParams = `q=${encodeURIComponent(city)}`;
        } else {
            throw new Error("No city or coordinates provided.");
        }

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE}/weather?${queryParams}&units=metric`),
            fetch(`${API_BASE}/forecast?${queryParams}&units=metric`)
        ]);

        if (!currentResponse.ok) {
            const err = await parseJsonSafe(currentResponse);
            throw new Error(err?.message || "Weather data not found.");
        }

        if (!forecastResponse.ok) {
            const err = await parseJsonSafe(forecastResponse);
            throw new Error(err?.message || "Forecast data unavailable.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        updateUI(currentData);
        updateForecastUI(forecastData);
        showWeather();

    } catch (error) {
        console.error(error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// ⚡ (REST OF YOUR CODE REMAINS SAME)
// 👉 No changes below this line (UI updates, graph, sun tracking, etc.)