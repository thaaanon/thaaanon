document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const result = document.getElementById('result');
    const currentPercentage = document.getElementById('currentPercentage');
    const classesToBunk = document.getElementById('classesToBunk');
    const classesToAttend = document.getElementById('classesToAttend');

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
        const requiredClasses = Math.ceil((expectedPercentage * totalClasses) / 100);

        currentPercentage.textContent = `Current attendance percentage: ${attendancePercentage.toFixed(2)}%`;

        if (attendancePercentage >= expectedPercentage) {
            const classesCanBunk = presentClasses - requiredClasses;
            classesToBunk.textContent = `You can bunk ${classesCanBunk} more class${classesCanBunk !== 1 ? 'es' : ''} and still maintain ${expectedPercentage}% attendance.`;
            classesToAttend.textContent = '';
        } else {
            const classesNeedToAttend = requiredClasses - presentClasses;
            classesToBunk.textContent = '';
            classesToAttend.textContent = `You need to attend ${classesNeedToAttend} more class${classesNeedToAttend !== 1 ? 'es' : ''} to reach ${expectedPercentage}% attendance.`;
        }

        result.classList.remove('hidden');
    });
});