// Sample booking data
document.addEventListener('DOMContentLoaded', () =>{
    const bookings = [
        { busId: 'BUS001', route: 'A-B', bookedSeats: 30, availableSeats: 20, departureTime: '14:00' },
        { busId: 'BUS002', route: 'B-C', bookedSeats: 25, availableSeats: 25, departureTime: '15:30' },
        { busId: 'BUS003', route: 'C-A', bookedSeats: 40, availableSeats: 10, departureTime: '16:45' },
    ];
    
    function updateStatistics() {
        document.getElementById('total-booked').textContent = bookings.reduce((sum, booking) => sum + booking.bookedSeats, 0);
        document.getElementById('total-available').textContent = bookings.reduce((sum, booking) => sum + booking.availableSeats, 0);
        document.getElementById('buses-in-service').textContent = bookings.length;
       
    }
    
    function renderBookingList(filteredBookings) {
        const bookingList = document.getElementById('booking-list');
        bookingList.innerHTML = '';
    
        filteredBookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.busId}</td>
                <td>${booking.route}</td>
                <td>${booking.bookedSeats}</td>
                <td>${booking.availableSeats}</td>
                <td>${booking.departureTime}</td>
                <td>
                    <div class="btns">
                        <button class="modify" onclick="modifyBooking('${booking.busId}')">Modify</button>
                        <button class="cancel" onclick="cancelBooking('${booking.busId}')">Cancel</button>
                    </div>
                </td>
            `;
            bookingList.appendChild(row);
        });
    }
    
    function cancelBooking(busId) {
        alert(`Cancelling booking for bus ${busId}`);
        // Implement cancellation logic here
    }
    
    function modifyBooking(busId) {
        alert(`Modifying booking for bus ${busId}`);
        // Implement modification logic here
    }
    
    function printSummary() {
        window.print();
    }
    
    // Initial render
    updateStatistics();
    renderBookingList(bookings);
    
})
