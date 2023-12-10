async function initializeAppButton(container, appName, appCost, appRoute) {
    // Create and initialize a Flexbox item wrapper for each game
    const flexItem = document.createElement('div');
    flexItem.classList.add('flex-item');
    container.appendChild(flexItem);

    // Create and initialize the Buy button
    const buyButton = document.createElement('button');
    buyButton.id = `buy-${appName}`;
    buyButton.innerText = `Buy ${appName}`;
    flexItem.appendChild(buyButton);

    // Create and initialize the Link
    const link = document.createElement('a');
    link.id = `${appName}-link`;
    link.innerText = `Go to ${appName}`;
    flexItem.appendChild(link);

    const username = localStorage.getItem('username');

    // Fetch user data from backend during page load
    const hasAccessResponse = await fetch(`/api/has_access?username=${username}&app_name=${appName}`);
    const hasAccessData = await hasAccessResponse.json();
    let hasAccess = hasAccessData.has_access;

    const pointsResponse = await fetch(`/api/soul_points?username=${username}`);
    const pointsData = await pointsResponse.json();
    let userSoulPoints = pointsData.soul_points;

    if (hasAccess) {
        buyButton.disabled = true;
        link.setAttribute('href', appRoute);
    }

    buyButton.addEventListener('click', async function() {
        if (userSoulPoints >= appCost) {
            const response = await fetch('/api/purchase_app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, app_name: appName, app_cost: appCost })
            });

            const result = await response.json();

            if (result.status === 'success') {
                userSoulPoints -= appCost;
                hasAccess = true;
                buyButton.disabled = true;
                link.setAttribute('href', appRoute);
                alert('Purchase successful');
            }
        } else {
            alert('Not enough soul points to purchase this game.');
        }
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    const gameContainer = document.getElementById('game-container'); 
    gameContainer.classList.add('flex-container');
    initializeAppButton(gameContainer, 'CounterGame', 0, '/countergame');

    initializeAppButton(gameContainer, 'bingo', 0, '/bingo');
    initializeAppButton(gameContainer, 'pacman', 0, '/pacman');
    
    initializeAppButton(gameContainer, 'Tic Tac Toe', 2, '/tictactoe');
    initializeAppButton(gameContainer, 'Connect Four',3, '/connectfour');
    initializeAppButton(gameContainer, 'Hangman', 4, '/hangman');
    initializeAppButton(gameContainer, 'Roulette', 5, '/roulette');
    initializeAppButton(gameContainer, 'Casino Catacombs', 0, '/casinocatacombs');

     initializeAppButton(gameContainer, 'Instruction', 0, '/instruction');
    // initializeAppButton(gameContainer, 'snake', 4, /snake);
});







// document.addEventListener('DOMContentLoaded', async function() {
//     const buyCounterButton = document.getElementById('buy-counter');
//     const counterLink = document.getElementById('counter-link');

//     // Initially disable the CounterGame link
//     counterLink.removeAttribute('href');

//     let userSoulPoints;
//     let hasPurchasedCounterGame;

//     const username = localStorage.getItem('username');

//     // Fetch user data from backend during page load
//     const userResponse = await fetch(`/api/has_access?username=${username}&app_name=CounterGame`);
//     const userData = await userResponse.json();
//     hasPurchasedCounterGame = userData.has_access;

//     const pointsResponse = await fetch(`/api/soul_points?username=${username}`);
//     const pointsData = await pointsResponse.json();
//     userSoulPoints = pointsData.soul_points;

//     // If the user has purchased the CounterGame, disable the "Buy" button and enable the link
//     if (hasPurchasedCounterGame) {
//         buyCounterButton.disabled = true; // Disable the button
//         counterLink.setAttribute('href', '/countergame'); // Enable the link
//     }

//     // Attach button click event listener
//     if (!hasPurchasedCounterGame) {
//         buyCounterButton.addEventListener('click', async function() {
//             // Check if the user has enough soul points
//             if (userSoulPoints >= 0) {
//                 // Make an API call to purchase the CounterGame
//                 const response = await fetch('/api/purchase_app', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ username, app_name: 'CounterGame', app_cost: 0 }) // Replace 0 with the cost of the game
//                 });

//                 const result = await response.json();

//                 // If purchase is successful, update user's soul points and enable the CounterGame link
//                 if (result.status === 'success') {
//                     userSoulPoints = userSoulPoints - 0; // Replace 0 with the actual cost if you decide to charge soul points
//                     hasPurchasedCounterGame = true;
//                     buyCounterButton.disabled = true;  // Disable the button
//                     counterLink.setAttribute('href', '/countergame'); // Replace with your game's URL
//                     alert('Purchase successful');
//                 }
//             } else {
//                 alert('Not enough soul points to purchase this game.');
//             }
//         });
//     }


// });
