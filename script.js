// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Schedule data will be globally available from the injected script
    // const schedule = [ ... ];

    const scheduleList = document.getElementById('schedule-list');
    const categorySearchInput = document.getElementById('category-search');

    function renderSchedule(filterCategory = '') {
        scheduleList.innerHTML = ''; // Clear current schedule

        const filteredSchedule = schedule.filter(item => {
            if (filterCategory === '') return true;
            if (item.type === 'talk') {
                return item.category.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()));
            }
            return true; // Always show breaks and transitions
        });

        filteredSchedule.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('schedule-item', item.type);

            let content = `<span class="time">${item.startTime} - ${item.endTime}</span>`;

            if (item.type === 'talk') {
                content += `<h3>${item.title}</h3>`;
                if (item.speakers && item.speakers.length > 0) {
                    content += `<p class="speakers">Speaker(s): ${item.speakers.join(', ')}</p>`;
                }
                if (item.category && item.category.length > 0) {
                    content += '<p>';
                    item.category.forEach(cat => {
                        content += `<span class="category">${cat}</span>`;
                    });
                    content += '</p>';
                }
                content += `<p class="description">${item.description}</p>`;
            } else if (item.type === 'break' || item.type === 'transition') {
                content += `<h3>${item.name} (${item.duration} min)</h3>`;
            }

            itemElement.innerHTML = content;
            scheduleList.appendChild(itemElement);
        });
    }

    // Initial render
    renderSchedule();

    // Search functionality
    categorySearchInput.addEventListener('input', (event) => {
        renderSchedule(event.target.value.trim());
    });
});