async function getCount() {
    const username = localStorage.getItem('username');
    const res = await fetch(`/api/get_count?username=${username}`);
    const data = await res.json();  // <-- Add this line
    document.getElementById('countDisplay').innerText = `Count: ${data.count}`;
  }

async function addSoulPoints(username, pointsToAdd) {
  const response = await fetch('/api/add_soul_points', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, points: pointsToAdd })
  });

  const result = await response.json();
  return result.new_soul_points;
}

async function incrementCount() {
    const username = localStorage.getItem('username');
    const res = await fetch('/api/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
    });
    const data = await res.json();  // <-- Add this line
    document.getElementById('countDisplay').innerText = `Count: ${data.new_count}`;
    const logBase4 = Math.log(data.new_count) / Math.log(4);
    if (Number.isInteger(logBase4)) {
        const newSoulPoints = await addSoulPoints(username, 3);
        alert(`New soul points: ${newSoulPoints}`);
    }
  }

document.addEventListener('DOMContentLoaded', (event) => {
      getCount();
  });
