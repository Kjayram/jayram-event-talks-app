// generateSchedule.js
const generateSchedule = (talks, eventStartTime = "10:00", talkDuration = 60, transitionDuration = 10, lunchDuration = 60) => {
    const schedule = [];
    let currentTime = new Date(`2000/01/01 ${eventStartTime}`); // Use an arbitrary date for time calculations

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    let talkIndex = 0;
    while (talkIndex < talks.length) {
        // Handle lunch break after the third talk
        if (talkIndex === 3) {
            const lunchStartTime = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + lunchDuration);
            schedule.push({
                type: "break",
                name: "Lunch Break",
                startTime: formatTime(lunchStartTime),
                endTime: formatTime(currentTime),
                duration: lunchDuration
            });
        }

        // Add talk to schedule
        const talkStart = new Date(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + talkDuration);
        schedule.push({
            type: "talk",
            id: `talk-${talkIndex + 1}`,
            startTime: formatTime(talkStart),
            endTime: formatTime(currentTime),
            ...talks[talkIndex]
        });

        talkIndex++;

        // Add transition if not the last talk
        if (talkIndex < talks.length) {
            const transitionStart = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + transitionDuration);
            schedule.push({
                type: "transition",
                name: "Transition",
                startTime: formatTime(transitionStart),
                endTime: formatTime(currentTime),
                duration: transitionDuration
            });
        }
    }

    return schedule;
};

module.exports = generateSchedule;