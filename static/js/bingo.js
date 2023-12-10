window.addEventListener('load', (event) => {
    async function awardSoulPoints(username, pointsToAdd) {
        try {
            const response = await fetch('/api/add_soul_points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, points: pointsToAdd }),
            });
            const result = await response.json();
            if (response.ok) {
                soulPoints += pointsToAdd;
                soulPointsDisplay.textContent = `Soul Points: ${soulPoints}`;
                alert(`You've earned soul points! New total: ${result.new_soul_points}`);
            } else {
                throw new Error(result.message || 'An error occurred while adding soul points.');
            }
        } catch (error) {
            console.error('Error adding soul points:', error);
            alert('An error occurred while adding soul points.');
        }
    }

});
