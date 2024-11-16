document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const result = document.getElementById('result');
    const currentPercentage = document.getElementById('currentPercentage');
    const classesToBunk = document.getElementById('classesToBunk');
    const classesToAttend = document.getElementById('classesToAttend');
    const funnyMessage = document.getElementById('funnyMessage');

    ['presentClasses', 'totalClasses', 'expectedPercentage'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', (e) => {
            if (e.target.value.includes('.')) {
                const [whole, decimal] = e.target.value.split('.');
                e.target.value = `${whole}.${decimal.slice(0, 2)}`;
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const presentClasses = Number(document.getElementById('presentClasses').value).toFixed(2);
        const totalClasses = Number(document.getElementById('totalClasses').value).toFixed(2);
        const expectedPercentage = Number(document.getElementById('expectedPercentage').value).toFixed(2);

        const presentNum = Number(presentClasses);
        const totalNum = Number(totalClasses);
        const expectedNum = Number(expectedPercentage);

        if (presentNum > totalNum) {
            alert("Present classes cannot be more than total classes!");
            return;
        }

        if (isNaN(presentNum) || isNaN(totalNum) || isNaN(expectedNum)) {
            alert("Please enter valid numbers!");
            return;
        }

        const attendancePercentage = (presentNum / totalNum * 100);
        currentPercentage.textContent = `Current attendance percentage: ${attendancePercentage.toFixed(2)}%`;

        // Clear previous messages
        classesToBunk.textContent = '';
        classesToAttend.textContent = '';
        let funnyText = '';

        // Case when attendance exactly matches expected
        if (Math.abs(attendancePercentage - expectedNum) < 0.01) {
            funnyText = "Perfectly balanced attendance! Lord Attree will be pleased with your mathematical precision! 📐👑";
            classesToBunk.textContent = "Your attendance is exactly at the target percentage - all set for the admit card! ✅";
        } 
        // Case when attendance is higher than expected
        else if (attendancePercentage > expectedNum) {
            let maxBunkableClasses = 0;
            let newTotal = totalNum;
            
            while ((Number((presentNum / newTotal * 100).toFixed(2))) >= expectedNum) {
                maxBunkableClasses++;
                newTotal++;
            }
            maxBunkableClasses--; // Adjust for the last increment

            if (maxBunkableClasses <= 0) {
                classesToBunk.textContent = "You're right at the threshold - better not risk any bunks!";
                funnyText = "Lord Attree is watching your attendance like a hawk! Keep it steady! 🦅👀";
            } else {
                classesToBunk.textContent = `You can bunk ${maxBunkableClasses} more class${maxBunkableClasses !== 1 ? 'es' : ''} and still maintain ${expectedNum}% attendance.`;
                
                const difference = Number((attendancePercentage - expectedNum).toFixed(2));
                if (difference >= 20) {
                    funnyText = "Lord Attree might make you the official attendance monitor at this rate! 👑📊";
                } else if (difference >= 15) {
                    funnyText = "Your admit card is practically pre-signed by Lord Attree! Just don't go on a bunking spree! 📝✨";
                } else if (difference >= 10) {
                    funnyText = "Lord Attree would be proud! Keep this up and you might get VIP treatment at the admit card signing! 🎖️";
                } else if (difference >= 5) {
                    funnyText = "Looking good for the admit card! Lord Attree might even smile while signing it! 😊✍️";
                } else {
                    funnyText = "You're in Lord Attree's good books, but remember - attendance is like chai, better not let it get cold! ☕";
                }
            }
        } 
        // Case when attendance is lower than expected
        else {
            let additionalClasses = 0;
            let newTotal = totalNum;
            let newPresent = presentNum;
            
            while (Number((newPresent / newTotal * 100).toFixed(2)) < expectedNum) {
                newTotal++;
                newPresent++;
                additionalClasses++;
            }

            classesToAttend.textContent = `You need to attend ${additionalClasses} more class${additionalClasses !== 1 ? 'es' : ''} to reach ${expectedNum}% attendance.`;

            const deficit = Number((expectedNum - attendancePercentage).toFixed(2));
            if (deficit >= 20) {
                funnyText = "Lord Attree might need a magnifying glass to find your attendance percentage! Time for a comeback! 🔍😅";
            } else if (deficit >= 15) {
                funnyText = "Your admit card is giving Lord Attree trust issues! Quick, attend some classes! 📝❌";
            } else if (deficit >= 10) {
                funnyText = "Lord Attree's pen is getting hesitant about signing that admit card! Better hurry! ✒️😰";
            } else if (deficit >= 5) {
                funnyText = "Almost there! Lord Attree is warming up the signing hand! Just a few more classes! ✍️🎯";
            } else {
                funnyText = "You're this close to getting Lord Attree's signature! Don't let that admit card down! 📝👀";
            }
        }

        funnyMessage.textContent = funnyText;
        result.classList.remove('hidden');
    });
});
