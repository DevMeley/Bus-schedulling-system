const chartData = {
    punctuality: {
        onTime: 85,
        delayed: 15
    },
    busUsage: {
        inService: 65,
        maintenance: 15,
        idle: 20
    }
};

// Function to create punctuality bar chart
function createPunctualityChart() {
    const ctx = document.getElementById('punctualityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['On Time', 'Delayed'],
            datasets: [{
                label: 'Percentage',
                data: [chartData.punctuality.onTime, chartData.punctuality.delayed],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Bus Punctuality'
                }
            }
        }
    });
}

// Function to create bus usage pie chart
function createBusUsageChart() {
    const ctx = document.getElementById('busUsageChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['In Service', 'Maintenance', 'Idle'],
            datasets: [{
                data: [chartData.busUsage.inService, chartData.busUsage.maintenance, chartData.busUsage.idle],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Bus Usage Distribution'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Function to initialize charts
function initializeCharts() {
    createPunctualityChart();
    createBusUsageChart();
}

initializeCharts()
// // Initialize dashboard
// function initDashboard() {
//     updateWidgets();
//     initializeCharts();

//     // Existing event listeners remain the same
// }

// Run initialization when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', initDashboard);