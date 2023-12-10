const messages = [   
    "                       🎰 You are a very, very, very bad gambler. So much so that you now owe the Catacomb Casino a significant amount of money. Now, in order to escape the casino, you must earn coins in the casino games located at each corner of the casino. Once you've earned enough money, you may enter the catacombs to attempt your escape. However, if you die in the catacombs, there may be good deals waiting for you 😉",
    "🎮 Welcome to the game! - To move your character on the next screen, use the arrow keys or WASD. You can press 'E' at any corner of the map to interact with the different Casino games. Use the back arrow in your window to leave the games!",
];

let currentIndex = 0;

function showNextMessage() {
    const messageElement = document.getElementById('message');
    if (currentIndex < messages.length) {
        messageElement.innerHTML = `<span style="font-size: 1.2em; font-weight: bold; color: #ff9900;">${messages[currentIndex]}</span>`;
        currentIndex++;
    } else {
        // Redirect to the game or perform any other action
        window.location.href = "/casinocatacombs";
    }
}

