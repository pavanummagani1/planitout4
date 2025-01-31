// Fetch data when the page loads();
document.addEventListener('DOMContentLoaded', getData);

async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    if (city) {
        console.log('City from URL:', city);

        // Check localStorage for preloaded data
        const cachedCityData = localStorage.getItem(city);
        if (cachedCityData) {
            console.log('Using cached data for city:', city);
            populateData(JSON.parse(cachedCityData));
            return;
        }

        // Fetch data if not cached
        try {
            let response = await fetch(`https://false-vivid-feta.glitch.me/${city}`);
            let result = await response.json();
            console.log('Fetched data for city:', result);

            // Cache city-specific data
            localStorage.setItem(city, JSON.stringify(result));
            populateData(result);
        } catch (error) {
            console.error('Error fetching data for city:', city, error);
        }
    } else {
        console.error('City parameter not found in URL');
    }
}

function populateData(data) {
    getButtons(data);
    if (data.Resturants) {
        loadRestaurants(data.Resturants);
    }
}
let dynamicTitle = document.getElementById('dynamicTitle');

function getButtons(res) {
    let btnContainer = document.getElementById('btnContainer');
    btnContainer.innerHTML = ''; // Clear previous buttons

    for (let key in res) {
        let btn = document.createElement('button');
        btn.textContent = key;
        btn.setAttribute('id', `${key}-btn`);
        btnContainer.appendChild(btn);

        btn.addEventListener('click', () => {
            if (key === 'Resturants') {
                dynamicTitle.textContent = 'Search Places to eat';
                loadRestaurants(res[key])
            };
            if (key === 'Hotels') {
                dynamicTitle.textContent = 'Stay somewhere great';
                loadHotels(res[key])
            };
            if (key === 'Places') {
                dynamicTitle.textContent = 'EXPLORE & DO something fun';
                loadPlaces(res[key]);
            }
        });
    }
}

function loadRestaurants(items) {

    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = '';

    items.forEach((item) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.name || 'Image';
            // imgElement.loading = 'lazy'; // Lazy loading
            imageCarousel.appendChild(imgElement);
        });

        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Name: ${item.name || 'No name available'}</span>
            <span>Cuisines: ${item.cuisines || 'No cuisines available'}</span>
            <span>Address: ${item.address.fullAddress || 'No address available'}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;

        // "Book Now" button
        let btnContainer = document.createElement('div')
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        let checkListButton = document.createElement('button');
        checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton)
        btnContainer.appendChild(checkListButton)

        // Append everything to the item container
        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);

        contentContainer.appendChild(itemDiv);
    });
    // Initialize Owl Carousel
    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

// Function to display the HOTELS content when HOTELS button is clicked
function loadHotels(items) {
    // Clear existing content
    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = ''; // Clear previous content

    // Display the hotel items (array of data)
    items.forEach((item) => {
        // Create a container for each hotel item
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.name || 'Image';
            imgElement.loading = 'lazy'; // Lazy loading
            imageCarousel.appendChild(imgElement);
        });

        // Add other details
        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Name: ${item.name || 'No name available'}</span>
            <span>Cuisines: ${item.cuisines || 'No cuisines available'}</span>
            <span>Address: ${item.address.fullAddress || 'No address available'}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;


        // "Book Now" button
        let btnContainer = document.createElement('div')
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        let checkListButton = document.createElement('button');
        checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton)
        btnContainer.appendChild(checkListButton)

        // Append everything to the item container
        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);

        // Append the item container to the content container
        contentContainer.appendChild(itemDiv);
    });
    // Initialize Owl Carousel
    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

// Function to display the Places content when PLACES button is clicked
function loadPlaces(items) {
    // Clear existing content
    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = ''; // Clear previous content

    // Display the places items (array of data)
    items.forEach((item) => {
        // Create a container for each place item
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.name || 'Image';
            imgElement.loading = 'lazy'; // Lazy loading
            imageCarousel.appendChild(imgElement);
        });
        // Add other details
        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Title: ${item.title || 'No name available'}</span>
            <span>Operator: ${item.operator}</span>
            <span class='description'>Description: ${item.description}</span>
            <span>Cuisines: ${item.languages || 'No cuisines available'}</span>
            <span>Address: ${item.category || 'No address available'}</span>
            <span>Cancellation: ${item.cancellation}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;

        // "Book Now" button
        let btnContainer = document.createElement('div')
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        let checkListButton = document.createElement('button');
        checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton)
        btnContainer.appendChild(checkListButton)

        // Append everything to the item container
        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);

        // Append the item container to the content container
        contentContainer.appendChild(itemDiv);
    });
    // Initialize Owl Carousel
    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

//BOOK NOW
// Modal Elements
const modal = document.getElementById('modalContainer');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeModal = document.querySelector('.close');
const confirmMessage = document.getElementById('bookingconfrimMessage');

// Open Modal Function
function openModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Close Modal Function
function closeModalFunc() {
    modal.style.display = 'none';
}

// Attach event listeners to all "BOOK NOW" and "Add to Checklist" buttons
document.addEventListener('click', (event) => {
    if (event.target.textContent.trim() === 'BOOK NOW') {
        openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
    }
});

// Attach Confirm Button Event Listener
confirmBtn.addEventListener('click', () => {
    let date = document.getElementById('date').value;

    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }
    confirmMessage.style.display = 'inline'
    confirmMessage.textContent = `Your trip is successfully booked on ${date}`;
    confirmMessage.style.color = "green"; // Make it visually noticeable
    setTimeout(()=>{
        confirmMessage.style.display = 'none'
    },6000)

    // Close modal after showing the confirmation message
    setTimeout(closeModalFunc, 0); // Delay closing by 1.5 seconds

});

// Close modal events
closeModal.addEventListener('click', closeModalFunc);
cancelBtn.addEventListener('click', closeModalFunc);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModalFunc();
});
