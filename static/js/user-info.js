document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('username');
  if (username) {
    getUserInfo(username)
      .then(userInfo => {
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = `
          <p>Logged in as: ${userInfo.username}</p>
        `;
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
      });
  } else {
    // Handle case when user is not logged in
  }
});

async function getUserInfo(username) {
  const res = await fetch(`/api/get_user_info?username=${username}`);
  const data = await res.json();
  return data;
}
