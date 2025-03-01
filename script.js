// Blood donation button action
function donateBlood() {
    alert("Thank you for your willingness to donate blood! We will send you more information soon.");
}

let map;
let userLocation;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 0, lng: 0 }
    });
}

function findLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Center map on user's location
    map.setCenter(userLocation);

    // Add a marker for the user's location
    new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location'
    });

    // Call function to find nearby blood donation centers (mock data)
    findNearbyCenters(userLocation);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function findNearbyCenters(location) {
    // For demonstration, using static mock data for blood donation centers.
    // In a real-world scenario, this data would come from a database or an API.
    const centers = [
        { name: "Center A", lat: location.lat + 0.01, lng: location.lng + 0.01 },
        { name: "Center B", lat: location.lat - 0.02, lng: location.lng - 0.02 },
        { name: "Center C", lat: location.lat + 0.03, lng: location.lng - 0.03 }
    ];

    centers.forEach(center => {
        new google.maps.Marker({
            position: { lat: center.lat, lng: center.lng },
            map: map,
            title: center.name
        });
    });
}

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form from reloading the page
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send data to the server
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

