const buses = [
    { id: 1, number: "101", route: "DSR Apapa - Ikotun", driver: "Mr. Yinka", status: "moving", speed: 40, position: [6.54433, 3.26379] },
    { id: 2, number: "202", route: "DSR Apapa - Okoko", driver: "Mr. Yinka", status: "stopped", speed: 0, position: [ 6.4478069,  3.3625318] },
    { id: 3, number: "303", route: "DSR Apapa - Ikeja", driver: "Mr. Yinka", status: "moving", speed: 55, position: [6.4553, 3.3641] },
    { id: 4, number: "404", route: "DSR Apapa - Ikorodu", driver: "Mr. Yinka", status: "stopped", speed: 0, position: [6.4478069, 3.3625318] },
];

const lagos = [6.5244, 3.3792];

let map, markers = {};

function initMap() {
    map = L.map('map').setView(lagos, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function createBusItem(bus) {
    return `
        <div class="bus-item">
            <strong>Bus ${bus.number}</strong>
            <span class="bus-status ${bus.status}">${bus.status}</span>
            <div>Route: ${bus.route}</div>
            <div>Driver: ${bus.driver}</div>
            <div>Speed: ${bus.speed} km/h</div>
        </div>
    `;
}

function renderBusList() {
    const busList = document.getElementById('bus-list');
    busList.innerHTML = buses.map(createBusItem).join('');
}

function updateMap() {
    buses.forEach(bus => {
        if (markers[bus.id]) {
            markers[bus.id].setLatLng(bus.position);
        } else {
            markers[bus.id] = L.marker(bus.position).addTo(map)
                .bindPopup(`
                    <b>Bus ${bus.number}</b><br>
                    Route: ${bus.route}<br>
                    Driver: ${bus.driver}<br>
                    Status: ${bus.status}<br>
                    Speed: ${bus.speed} km/h
                `);
        }
    });
}

function populateFilters() {
    const routeFilter = document.getElementById('route-filter');
    const driverFilter = document.getElementById('driver-filter');
    
    const routes = [...new Set(buses.map(bus => bus.route))];
    const drivers = [...new Set(buses.map(bus => bus.driver))];
    
    routes.forEach(route => {
        const option = document.createElement('option');
        option.value = option.textContent = route;
        routeFilter.appendChild(option);
    });
    
    drivers.forEach(driver => {
        const option = document.createElement('option');
        option.value = option.textContent = driver;
        driverFilter.appendChild(option);
    });
}

function applyFilters() {
    const routeFilter = document.getElementById('route-filter').value;
    const driverFilter = document.getElementById('driver-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    buses.forEach(bus => {
        const marker = markers[bus.id];
        const shouldShow = 
            (!routeFilter || bus.route === routeFilter) &&
            (!driverFilter || bus.driver === driverFilter) &&
            (!statusFilter || bus.status === statusFilter);
        
        if (shouldShow) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderBusList();
    updateMap();
    populateFilters();

    document.querySelectorAll('.filters select').forEach(select => {
        select.addEventListener('change', applyFilters);
    });

    // Simulating real-time updates
    setInterval(() => {
        buses.forEach(bus => {
            if (Math.random() > 0.5) {
                bus.status = bus.status === 'moving' ? 'stopped' : 'moving';
                bus.speed = bus.status === 'moving' ? Math.floor(Math.random() * 60) + 20 : 0;
                bus.position = [
                    bus.position[0] + (Math.random() - 0.5) * 0.01,
                    bus.position[1] + (Math.random() - 0.5) * 0.01
                ];
            }
        });
        renderBusList();
        updateMap();
    }, 5000); // Update every 5 seconds
});
