// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const searchBar = document.querySelector('.search-bar input');
    const filterSelect = document.querySelector('.filter select');
    const starIcon = document.querySelector('.fa-star');
    const deleteIcon = document.querySelector('.delete-icon');
    const notifications = document.querySelectorAll('.notification');

    // Search functionality
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        notifications.forEach(notification => {
            const text = notification.textContent.toLowerCase();
            notification.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // Filter functionality
    filterSelect.addEventListener('change', () => {
        const filterValue = filterSelect.value;
        notifications.forEach(notification => {
            switch(filterValue) {
                case 'All':
                    notification.style.display = 'flex';
                    break;
                case 'New':
                    // Assuming 'New' notifications have a specific class or attribute
                    notification.style.display = notification.classList.contains('new') ? 'flex' : 'none';
                    break;
                case 'Older':
                    // Assuming 'Older' notifications have a specific class or attribute
                    notification.style.display = notification.classList.contains('older') ? 'flex' : 'none';
                    break;
            }
        });
    });

    // Star toggle functionality
    notifications.forEach(notification => {
        starIcon.addEventListener('click', () => {
            starIcon.classList.toggle('starred');
            // Rquest to backend to update notification
        });
    });

    // Delete notification functionality
    notifications.forEach(notification => {
        deleteIcon.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this notification?')) {
                notification.remove();
                // Rquest to backend to delete notification
            }
        });
    });

    // Sidebar toggle functionality (for mobile responsiveness)
    // const menuToggle = document.querySelector('.menu-toggle');
    // const sidebar = document.querySelector('.side-nav');
    // menuToggle.addEventListener('click', () => {
    //     sidebar.classList.toggle('show');
    // });

    // Logout functionality
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            // Perform logout action (redirect to login page)
            window.location.href = '/login'; // Replace with actual login page URL
        }
    });
});