async function getLocations() {
    try {
        let response = await fetch('https://square-pouncing-asphalt.glitch.me/Locations');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();

        // Cache data in localStorage for reuse
        localStorage.setItem('locations', JSON.stringify(result));

        // Populate locations immediately
        createLocationContainer(result);
    } catch (err) {
        console.error('Error fetching locations:', err);
    }
}

function createLocationContainer(data) {
    let locations = document.getElementById('locations');
    data.forEach((element) => {
        let item = document.createElement('div');
        item.id = `location-${element.id}`;
        item.style.backgroundImage = `url('${element.image}')`;
        item.innerHTML = `<span>${element.city}</span>`;
        item.addEventListener('click', () => {
            // Navigate to the next page with the selected city
            navigateToCity(element.city);
        });
        locations.appendChild(item);
    });
}

// Get Popular Restaurants
async function getResturants() {
    try {
        let response = await fetch('https://walnut-spectacular-nation.glitch.me/PopularResturants');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Restaurants data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createLocationButton(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayRestaurants(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching restaurants:', err);
    }
}

function createLocationButton(location, restaurants) {
    let locationNames = document.getElementById('restaurantNames'); // Corrected ID
    let locationBtn = document.createElement('button');
    locationBtn.textContent = location;

    locationBtn.onclick = function () {
        displayRestaurants(restaurants);
    };

    locationNames.appendChild(locationBtn);
}

function displayRestaurants(restaurants) {
    let restaurantsContainer = document.getElementById('restaurants'); // Corrected ID
    restaurantsContainer.innerHTML = ''; // Clear previous content

    restaurants.forEach(restaurant => {
        let restaurantDiv = document.createElement('div');
        restaurantDiv.style.backgroundImage = `url(${restaurant.ResturantBannerImage})`;
        restaurantDiv.innerHTML = `<h3>${restaurant.ResturantName}</h3>`;
        restaurantsContainer.appendChild(restaurantDiv);
    });
}

getResturants();

// Get Popular Hotels
async function getHotels() {
    try {
        let response = await fetch('https://pattern-vanilla-switch.glitch.me/Hotels');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Hotels data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createHotelLocationButton(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayHotels(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching hotels:', err);
    }
}

function createHotelLocationButton(location, hotels) {
    let locationNames = document.getElementById('hotelNames'); // Corrected ID
    let locationBtn = document.createElement('button');
    locationBtn.textContent = location;

    locationBtn.onclick = function () {
        displayHotels(hotels);
    };

    locationNames.appendChild(locationBtn);
}

function displayHotels(hotels) {
    let hotelContainer = document.getElementById('hotels'); // Corrected ID
    hotelContainer.innerHTML = ''; // Clear previous content

    hotels.forEach(hotel => {
        let hotelDiv = document.createElement('div');
        hotelDiv.style.backgroundImage = `url(${hotel.HotelBannerImage})`;
        hotelDiv.innerHTML = `<h3>${hotel.HotelName}</h3>`;
        hotelContainer.appendChild(hotelDiv);
    });
}

getHotels();



// Get Popular Locations
async function getPopularLocations() {
    try {
        let response = await fetch('https://pattern-vanilla-switch.glitch.me/Hotels');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Locations data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createLocationButtons(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayLocations(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching Locations:', err);
    }
}

function createLocationButtons(location, locations) {
    let popularLocation = document.getElementById('locationNames'); // Corrected ID
    let locationButton = document.createElement('button');
    locationButton.textContent = location;

    locationButton.onclick = function () {
        displayLocations(locations);
    };

    popularLocation.appendChild(locationButton);
}

function displayLocations(locations) {
    let locationContainer = document.getElementById('popularLocations'); // Corrected ID
    locationContainer.innerHTML = ''; // Clear previous content

    locations.forEach(location => {
        let locationDiv = document.createElement('div');
        locationDiv.style.backgroundImage = `url(${location.HotelBannerImage})`;
        locationDiv.innerHTML = `<h3>${location.HotelName}</h3>`;
        locationContainer.appendChild(locationDiv);
    });
}

getPopularLocations();

function navigateToCity(city) {
    window.location.href = `../dataPage/index.html?city=${encodeURIComponent(city)}`;
}

// Load cached data if available
document.addEventListener('DOMContentLoaded', () => {
    const cachedLocations = localStorage.getItem('locations');
    if (cachedLocations) {
        createLocationContainer(JSON.parse(cachedLocations));
    } else {
        getLocations();
    }
});