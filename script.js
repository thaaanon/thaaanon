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
            const classesCanBunk = Math.floor(presentClasses - (expectedPercentage / 100 * totalClasses));
            classesToBunk.textContent = `You can bunk ${classesCanBunk} more class${classesCanBunk !== 1 ? 'es' : ''} and still maintain ${expectedPercentage}% attendance.`;
            classesToAttend.textContent = '';

            if (classesCanBunk > 5) {
                funnyText = "Party time! You're killing it! 🎉";
            } else if (classesCanBunk > 0) {
                funnyText = "Nice! A few days off won't hurt. 😎";
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
