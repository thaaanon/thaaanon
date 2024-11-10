document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const result = document.getElementById('result');
    const currentPercentage = document.getElementById('currentPercentage');
    const classesToBunk = document.getElementById('classesToBunk');
    const classesToAttend = document.getElementById('classesToAttend');
    const funnyMessage = document.getElementById('funnyMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const presentClasses = parseFloat(document.getElementById('presentClasses').value);
        const totalClasses = parseFloat(document.getElementById('totalClasses').value);
        const expectedPercentage = parseFloat(document.getElementById('expectedPercentage').value);

        // Input validation
        if (presentClasses > totalClasses) {
            alert("Present classes cannot be more than total classes!");
            return;
        }

        if (isNaN(presentClasses) || isNaN(totalClasses) || isNaN(expectedPercentage)) {
            alert("Please enter valid numbers!");
            return;
        }

        const attendancePercentage = (presentClasses / totalClasses) * 100;
        currentPercentage.textContent = `Current attendance percentage: ${attendancePercentage.toFixed(2)}%`;

        let funnyText = '';

        if (Math.abs(attendancePercentage - expectedPercentage) < 0.01) {
            funnyText = "Perfect balance! Thanos would be proud! 👌✨";
            classesToBunk.textContent = "You're exactly at your target percentage!";
            classesToAttend.textContent = "";
        } else if (attendancePercentage >= expectedPercentage) {
            let maxBunkableClasses = 0;
            let newTotal = totalClasses;
            
            while (((presentClasses / newTotal) * 100) >= expectedPercentage) {
                maxBunkableClasses++;
                newTotal++;
            }
            maxBunkableClasses--; // Adjust for the last increment

            classesToBunk.textContent = `You can bunk ${maxBunkableClasses} more class${maxBunkableClasses !== 1 ? 'es' : ''} and still maintain ${expectedPercentage}% attendance.`;
            classesToAttend.textContent = '';

            // Funny messages for good attendance
            if (attendancePercentage - expectedPercentage >= 20) {
                funnyText = "You're so regular, the classroom furniture thinks you're part of the inventory! 🪑😂";
            } else if (attendancePercentage - expectedPercentage >= 15) {
                funnyText = "Your attendance is higher than my phone's battery ever gets! 🔋💯";
            } else if (attendancePercentage - expectedPercentage >= 10) {
                funnyText = "Time to write a book: 'The Art of Professional Class Bunking' - you're qualified! 📚😎";
            } else if (attendancePercentage - expectedPercentage >= 5) {
                funnyText = "You've got enough buffer to start your own mini-vacation! 🏖️🎉";
            } else {
                funnyText = "Looking good! But remember, attendance is like pizza - more is better! 🍕";
            }
        } else {
            let additionalClasses = 0;
            let newTotal = totalClasses;
            let newPresent = presentClasses;
            
            while (((newPresent / newTotal) * 100) < expectedPercentage) {
                newTotal++;
                newPresent++;
                additionalClasses++;
            }

            classesToBunk.textContent = '';
            classesToAttend.textContent = `You need to attend ${additionalClasses} more class${additionalClasses !== 1 ? 'es' : ''} to reach ${expectedPercentage}% attendance.`;

            // Funny messages for low attendance
            const deficit = expectedPercentage - attendancePercentage;
            if (deficit >= 20) {
                funnyText = "Your attendance is so low, even your shadow has stopped following you to class! 👻📚";
            } else if (deficit >= 15) {
                funnyText = "The classroom thinks you're playing an intense game of hide and seek! 🙈🎮";
            } else if (deficit >= 10) {
                funnyText = "Your Wi-Fi has better attendance than you! Time to compete! 📶😅";
            } else if (deficit >= 5) {
                funnyText = "The morning alarm clock has filed a complaint for being ignored! ⏰😴";
            } else {
                funnyText = "Almost there! The finish line is closer than your next nap! 🏃‍♂️💤";
            }
        }

        funnyMessage.textContent = funnyText;
        result.classList.remove('hidden');
    });
});
