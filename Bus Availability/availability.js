document.addEventListener('DOMContentLoaded', () =>{
    // Sample bus data
    const buses = [
        { id: 'BUS001', route: 'DSR Apapa - Ikeja', status: 'available', capacity: { total: 50, occupied: 0 }, nextDeparture: '14:00', driver: 'Mr. Yinka' },
        { id: 'BUS002', route: 'DSR Apapa - Ikotun', status: 'in-service', capacity: { total: 50, occupied: 30 }, nextDeparture: '14:30', driver: 'Mr. Salami' },
        { id: 'BUS003', route: 'DSR Apapa - Okoko', status: 'under-maintenance', capacity: { total: 50, occupied: 0 }, nextDeparture: '15:00', driver: 'Mr. John' },
        { id: 'BUS004', route: 'DSR Apapa - Ikorodu', status: 'in-transit', capacity: { total: 50, occupied: 45 }, nextDeparture: '15:30', driver: 'Mr. Garuba' },
    ];

    function renderBusList(filteredBuses) {
        const busList = document.getElementById('bus-list');
        busList.innerHTML = '';

        filteredBuses.forEach(bus => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.id}</td>
                <td>${bus.route}</td>
                <td><span class="status ${bus.status}">${bus.status.replace('-', ' ')}</span></td>
                <td>${bus.capacity.occupied}/${bus.capacity.total}</td>
                <td>${bus.nextDeparture}</td>
                <td>${bus.driver}</td>
            `;
            busList.appendChild(row);
        });
    }

    function applyFilters() {
        const statusFilter = document.getElementById('status-filter').value;
        const routeFilter = document.getElementById('route-filter').value;
        const departureFilter = document.getElementById('departure-filter').value;
        const capacityFilter = parseInt(document.getElementById('capacity-filter').value);

        const filteredBuses = buses.filter(bus => {
            return (statusFilter === 'all' || bus.status === statusFilter) &&
                   (routeFilter === 'all' || bus.route === routeFilter) &&
                   (departureFilter === '' || bus.nextDeparture >= departureFilter) &&
                   (bus.capacity.total - bus.capacity.occupied >= capacityFilter);
        });

        renderBusList(filteredBuses);
    }



    // Initial render
    renderBusList(buses);
})