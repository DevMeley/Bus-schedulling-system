document.addEventListener('DOMContentLoaded', () => {

    const generateReport = () => {
        const reportType = document.getElementById('reportType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const busRoute = document.getElementById('busRoute').value;

        // Placeholder data - replace with actual data fetching logic
        const data = [
            { date: '2023-01-01', busRoute: 'Bus 1', metric: 'Passengers', value: 100 },
            { date: '2023-01-02', busRoute: 'Bus 1', metric: 'Passengers', value: 120 },
            { date: '2023-01-03', busRoute: 'Bus 2', metric: 'Passengers', value: 90 },
            { date: '2023-01-04', busRoute: 'Bus 2', metric: 'Passengers', value: 110 },
        ];

        updateTable(data);
        updateChart(data);
        updateSummary(data);
    }

    const updateTable = (data) => {
        const tableBody = document.getElementById('reportBody');
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${row.busRoute}</td>
                <td>${row.metric}</td>
                <td>${row.value}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    const updateChart = (data) => {
        const chart = document.getElementById('reportChart').getContext('2d');
        
        // if (chart) {
        //     chart.destroy();
        // }
        
        new Chart(chart, {
            type: 'bar',
            data: {
                labels: data.map(row => row.date),
                datasets: [{
                    label: 'Passengers',
                    data: data.map(row => row.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    const updateSummary = (data) => {
        const totalPassengers = data.reduce((sum, row) => sum + row.value, 0);
        const averagePassengers = totalPassengers / data.length;
        
        document.getElementById('summary').textContent = `
            Total Passengers: ${totalPassengers}
            Average Passengers per Day: ${averagePassengers.toFixed(2)}
        `;
    }

    const exportReport = (format) => {
        alert(`Exporting report as ${format.toUpperCase()} `);
    }

    generateReport()


})    