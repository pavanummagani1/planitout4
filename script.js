// Get Locations
async function getLocations() {
    try {
        const loader = document.getElementById('locationLoader');
        let response = await fetch('https://square-pouncing-asphalt.glitch.me/Locations');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        // console.log('Locations data:', result);
        createLocationcontainer(result);
    } catch (err) {
        console.error('Error fetching locations:', err);
    } finally {
        document.getElementById('locationLoader').style.display = 'none'; // Hide the loader
    }
}


// Creates the Locations in Dashboard
function createLocationcontainer(data) {
    let locations = document.getElementById('locations');
    data.forEach(element => {
        let item = document.createElement('div');
        item.id = `location-${element.id}`;
        item.style.backgroundImage = `url('${element.image}')`;
        item.innerHTML = `<span>${element.city}</span>`;
        item.addEventListener('click', () => {
            console.log(`${element.city} is clicked`);
        });
        locations.appendChild(item);
    });
}

getLocations();

// Get Popular Restaurants
async function getResturants() {
    try {
        const loader = document.getElementById('restaurantLoader');
        let response = await fetch('https://walnut-spectacular-nation.glitch.me/PopularResturants');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Restaurants data:', result);

        let isFirstCity = true;
        for (let location in result) {
            createLocationButton(location, result[location]);
            if (isFirstCity) {
                displayRestaurants(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching restaurants:', err);
    } finally {
        document.getElementById('restaurantLoader').style.display = 'none'; // Hide the loader
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
        const loader = document.getElementById('hotelLoader');
        let response = await fetch('https://pattern-vanilla-switch.glitch.me/Hotels');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Hotels data:', result);

        let isFirstCity = true;
        for (let location in result) {
            createHotelLocationButton(location, result[location]);
            if (isFirstCity) {
                displayHotels(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching hotels:', err);
    } finally {
        document.getElementById('hotelLoader').style.display = 'none'; // Hide the loader
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


//GET POPULARLOCATIONS
async function getPopularLocations() {
    try {
        const loader = document.getElementById('popularLocationLoader');
        let response = await fetch('https://pattern-vanilla-switch.glitch.me/Hotels');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Popular locations data:', result);

        let isFirstCity = true;
        for (let location in result) {
            createLocationButtons(location, result[location]);
            if (isFirstCity) {
                displayLocations(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching popular locations:', err);
    } finally {
        document.getElementById('popularLocationLoader').style.display = 'none'; // Hide the loader
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


function onLogin(){
    window.location.href = '../Login&Signup/login.html'
}

function loginAlert(){
    let loginAlert = document.getElementById('loginAlert');
    loginAlert.style.display = 'inline'
    setTimeout(()=>{
        loginAlert.style.display = 'none'
    },3000)
}
function onclickHamburger() {
    let sidebar = document.querySelector('.sidebar');
    sidebar.style.display = sidebar.style.display === 'flex' ? 'none' : 'flex';
}
