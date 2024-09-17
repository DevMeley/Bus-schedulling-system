// Sample data for bus schedules
let schedules = [
    { id: 1, date: '2024-09-14', busNumber: 'BUS001', route: 'DSR Apapa - Ikotun', departureTime: '08:00', arrivalTime: '09:30', driver: 'Mr. Yinka' },
    { id: 2, date: '2024-09-14', busNumber: 'BUS002', route: 'DSR Apapa - Ikeja', departureTime: '10:00', arrivalTime: '11:15', driver: 'Mr. Jude' },
];

// DOM Elements
const scheduleTable = document.getElementById('schedule-table');
const createScheduleBtn = document.getElementById('create-schedule');
const scheduleModal = document.getElementById('schedule-modal');
const scheduleForm = document.getElementById('schedule-form');
const cancelScheduleBtn = document.getElementById('cancel-schedule');
const dateFilter = document.getElementById('date-filter');
const routeFilter = document.getElementById('route-filter');
const driverFilter = document.getElementById('driver-filter');


// Event Listeners
createScheduleBtn.addEventListener('click', openModal);
cancelScheduleBtn.addEventListener('click', closeModal);
scheduleForm.addEventListener('submit', saveSchedule);
dateFilter.addEventListener('input', applyFilters);
routeFilter.addEventListener('input', applyFilters);
driverFilter.addEventListener('input', applyFilters);
// actionModal.addEventListener('click', openActionModal)

// Initialize Flatpickr for date inputs
flatpickr("#schedule-date", {
    dateFormat: "Y-m-d",
});

flatpickr("#date-filter", {
    dateFormat: "Y-m-d",
});

// Initialize calendar view
const calendar = flatpickr("#schedule-calendar", {
    inline: true,
    mode: "multiple",
    dateFormat: "Y-m-d",
    onValueUpdate: (selectedDates) => {
        // Update the schedule list based on selected dates
        updateScheduleTable(schedules.filter(schedule => 
            selectedDates.some(date => date.toISOString().split('T')[0] === schedule.date)
        ));
    }
});

// Functions
function openModal() {
    scheduleModal.style.display = 'block';
    scheduleForm.reset();
    scheduleForm.removeAttribute('data-id');
}

function closeModal() {
    scheduleModal.style.display = 'none';
}

function saveSchedule(e) {
    e.preventDefault();
    const formData = new FormData(scheduleForm);
    const scheduleData = Object.fromEntries(formData.entries());
    
    if (scheduleForm.hasAttribute('data-id')) {
        // Edit existing schedule
        const id = parseInt(scheduleForm.getAttribute('data-id'));
        const index = schedules.findIndex(schedule => schedule.id === id);
        schedules[index] = { id, ...scheduleData };
    } else {
        // Create new schedule
        const id = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
        schedules.push({ id, ...scheduleData });
    }

    updateScheduleTable(schedules);
    updateCalendar();
    closeModal();
}

function updateScheduleTable(filteredSchedules) {
    const tbody = scheduleTable.querySelector('tbody');
    tbody.innerHTML = '';

    filteredSchedules.forEach(schedule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.date}</td>
            <td>${schedule.busNumber}</td>
            <td>${schedule.route}</td>
            <td>${schedule.departureTime}</td>
            <td>${schedule.arrivalTime}</td>
            <td>${schedule.driver} <i class="fa-solid fa-ellipsis-vertical"></i></td> 
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', editSchedule);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteSchedule);
    });
}

function editSchedule(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
        scheduleForm.setAttribute('data-id', id);
        document.getElementById('schedule-date').value = schedule.date;
        document.getElementById('bus-number').value = schedule.busNumber;
        document.getElementById('route').value = schedule.route;
        document.getElementById('departure-time').value = schedule.departureTime;
        document.getElementById('arrival-time').value = schedule.arrivalTime;
        document.getElementById('driver').value = schedule.driver;
        openModal();
    }
}

function deleteSchedule(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    schedules = schedules.filter(schedule => schedule.id !== id);
    updateScheduleTable(schedules);
    updateCalendar();
}

function applyFilters() {
    const dateValue = dateFilter.value;
    const routeValue = routeFilter.value.toLowerCase();
    const driverValue = driverFilter.value.toLowerCase();

    const filteredSchedules = schedules.filter(schedule => 
        (!dateValue || schedule.date === dateValue) &&
        (!routeValue || schedule.route.toLowerCase().includes(routeValue)) &&
        (!driverValue || schedule.driver.toLowerCase().includes(driverValue))
    );

    updateScheduleTable(filteredSchedules);
}

function updateCalendar() {
    const scheduleDates = schedules.map(schedule => schedule.date);
    calendar.setDate(scheduleDates);
}

// const openActionModal = () =>{
//     scheduleModal.style.display = 'block';
    
// }

openActionModal()

// Initial table population and calendar update
updateScheduleTable(schedules);
updateCalendar();