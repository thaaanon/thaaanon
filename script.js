document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const result = document.getElementById('result');
    const currentPercentage = document.getElementById('currentPercentage');
    const classesToBunk = document.getElementById('classesToBunk');
    const classesToAttend = document.getElementById('classesToAttend');
    const funnyMessage = document.getElementById('funnyMessage');

    // Add input event listeners to force decimal precision
    ['presentClasses', 'totalClasses', 'expectedPercentage'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', (e) => {
            // Ensure value maintains decimals
            if (e.target.value.includes('.')) {
                const [whole, decimal] = e.target.value.split('.');
                e.target.value = `${whole}.${decimal.slice(0, 2)}`;
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Force decimal parsing with parseFloat and toFixed
        const presentClasses = Number(document.getElementById('presentClasses').value).toFixed(2);
        const totalClasses = Number(document.getElementById('totalClasses').value).toFixed(2);
        const expectedPercentage = Number(document.getElementById('expectedPercentage').value).toFixed(2);

        // Convert back to numbers for calculations
        const presentNum = Number(presentClasses);
        const totalNum = Number(totalClasses);
        const expectedNum = Number(expectedPercentage);

        // Input validation
        if (presentNum > totalNum) {
            alert("Present classes cannot be more than total classes!");
            return;
        }

        if (isNaN(presentNum) || isNaN(totalNum) || isNaN(expectedNum)) {
            alert("Please enter valid numbers!");
            return;
        }

        // Calculate with high precision
        const attendancePercentage = (presentNum / totalNum * 100);
        currentPercentage.textContent = `Current attendance percentage: ${attendancePercentage.toFixed(2)}%`;

        let funnyText = '';

        // Use precise comparison
        if (Math.abs(attendancePercentage - expectedNum) < 0.01) {
            funnyText = "Perfect balance! Thanos would be proud! 👌✨";
            classesToBunk.textContent = "You're exactly at your target percentage!";
            classesToAttend.textContent = "";
        } else if (attendancePercentage >= expectedNum) {
            let maxBunkableClasses = 0;
            let newTotal = totalNum;
            
            // Use precise decimal comparison
            while ((Number((presentNum / newTotal * 100).toFixed(2))) >= expectedNum) {
                maxBunkableClasses++;
                newTotal++;
            }
            maxBunkableClasses--; // Adjust for the last increment

            classesToBunk.textContent = `You can bunk ${maxBunkableClasses} more class${maxBunkableClasses !== 1 ? 'es' : ''} and still maintain ${expectedNum}% attendance.`;
            classesToAttend.textContent = '';

            // Funny messages based on precise percentage difference
            const difference = Number((attendancePercentage - expectedNum).toFixed(2));
            if (difference >= 20) {
                funnyText = "You're so regular, the classroom furniture thinks you're part of the inventory! 🪑😂";
            } else if (difference >= 15) {
                funnyText = "Your attendance is higher than my phone's battery ever gets! 🔋💯";
            } else if (difference >= 10) {
                funnyText = "Time to write a book: 'The Art of Professional Class Bunking' - you're qualified! 📚😎";
            } else if (difference >= 5) {
                funnyText = "You've got enough buffer to start your own mini-vacation! 🏖️🎉";
            } else {
                funnyText = "Looking good! But remember, attendance is like pizza - more is better! 🍕";
            }
        } else {
            let additionalClasses = 0;
            let newTotal = totalNum;
            let newPresent = presentNum;
            
            // Use precise decimal comparison
            while (Number((newPresent / newTotal * 100).toFixed(2)) < expectedNum) {
                newTotal++;
                newPresent++;
                additionalClasses++;
            }

            classesToBunk.textContent = '';
            classesToAttend.textContent = `You need to attend ${additionalClasses} more class${additionalClasses !== 1 ? 'es' : ''} to reach ${expectedNum}% attendance.`;

            // Funny messages based on precise percentage difference
            const deficit = Number((expectedNum - attendancePercentage).toFixed(2));
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
