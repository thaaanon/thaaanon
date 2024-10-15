document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const result = document.getElementById('result');
    const currentPercentage = document.getElementById('currentPercentage');
    const classesToBunk = document.getElementById('classesToBunk');
    const classesToAttend = document.getElementById('classesToAttend');
    const funnyMessage = document.getElementById('funnyMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const presentClasses = parseInt(document.getElementById('presentClasses').value);
        const totalClasses = parseInt(document.getElementById('totalClasses').value);
        const expectedPercentage = parseInt(document.getElementById('expectedPercentage').value);

        if (presentClasses > totalClasses) {
            alert("Present classes cannot be more than total classes!");
            return;
        }

        const attendancePercentage = (presentClasses / totalClasses) * 100;
        
        currentPercentage.textContent = `Current attendance percentage: ${attendancePercentage.toFixed(2)}%`;

        let funnyText = '';

        if (attendancePercentage >= expectedPercentage) {
            let maxBunkableClasses = 0;
            let newTotal = totalClasses;
            
            while ((presentClasses / newTotal) * 100 >= expectedPercentage) {
                maxBunkableClasses++;
                newTotal++;
            }
            maxBunkableClasses--; // Adjust for the last increment that broke the condition

            classesToBunk.textContent = `You can bunk ${maxBunkableClasses} more class${maxBunkableClasses !== 1 ? 'es' : ''} and still maintain ${expectedPercentage}% attendance.`;
            classesToAttend.textContent = '';

            if (maxBunkableClasses > 10) {
                funnyText = "Woohoo! Time for a vacation! Just don't forget where the campus is. 🏖️😎";
            } else if (maxBunkableClasses > 5) {
                funnyText = "Nice! A few days off won't hurt. Maybe learn a TikTok dance? 💃🕺";
            } else if (maxBunkableClasses > 0) {
                funnyText = "You've got some wiggle room. Use it wisely, young Padawan! 🧘‍♂️";
            } else {
                funnyText = "Phew! You're just making it. Stay sharp! 😅";
            }
        } else {
            let additionalClasses = 0;
            let newTotal = totalClasses;
            let newPresent = presentClasses;
            
            while ((newPresent / newTotal) * 100 < expectedPercentage) {
                newTotal++;
                newPresent++;
                additionalClasses++;
            }

            classesToBunk.textContent = '';
            classesToAttend.textContent = `You need to attend ${additionalClasses} more class${additionalClasses !== 1 ? 'es' : ''} to reach ${expectedPercentage}% attendance.`;

            if (additionalClasses > 10) {
                funnyText = "Oh snap! Time to fake some illnesses! 🤒";
            } else if (additionalClasses > 5) {
                funnyText = "Uh-oh! Better start making friends with the attendance monitor! 😬";
            } else {
                funnyText = "Don't worry, you got this! Just a few more early mornings! ☕";
            }
        }

        funnyMessage.textContent = funnyText;
        result.classList.remove('hidden');
    });
});
