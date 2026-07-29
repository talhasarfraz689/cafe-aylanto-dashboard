function updateDateTime() {
    const dateElement = document.getElementById('current-date');
    const dayElement = document.getElementById('current-day');
    const timeElement = document.getElementById('current-time');

    const now = new Date();

    // Format Date: e.g., 29 July 2025
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-GB', optionsDate);

    // Format Day: e.g., Tuesday
    const optionsDay = { weekday: 'long' };
    dayElement.textContent = now.toLocaleDateString('en-US', optionsDay);

    // Format Time: e.g., 03:15 PM
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
    timeElement.textContent = now.toLocaleTimeString('en-US', optionsTime);
}

// Update immediately on load
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);
