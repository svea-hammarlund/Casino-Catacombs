
document.addEventListener('keydown', function(event) {
    const character = document.getElementById('character');
    const gameArea = document.querySelector('.game-area');
    const roulette = document.querySelector('.roulette');

    // It's important to use computed style to get the most accurate position
    let left = parseInt(window.getComputedStyle(character).left, 10) || 0;
    let top = parseInt(window.getComputedStyle(character).top, 10) || 0;
    const step = 15; // How many pixels to move the character

    // Bottom left corner coordinates of the roulette
    const rouletteLeft = 20;
    const rouletteTop = gameArea.clientHeight - 50;

    function canInteractWithRoulette() {
        // Adjust the interaction range as needed
        let interactionRange = 50; // Example: 50 pixels
        return left <= rouletteLeft + interactionRange && top >= rouletteTop - interactionRange;
    }

    // Coordinates for different areas
    const topLeftCoordinates = { left: 20, top: 20 };
    const bottomRightCoordinates = { left: gameArea.clientWidth -50, top: gameArea.clientHeight - 50 };
    const topRightCoordinates = { left: gameArea.clientWidth - 50, top: 20 };
    const topMiddleCoordinates = {left: gameArea.clientWidth / 2 - 25, top: 20 };


    function canInteractWithTopLeft() {
        let interactionRange = 50;
        return left <= topLeftCoordinates.left + interactionRange && top <= topLeftCoordinates.top + interactionRange;
    }

    function canInteractWithBottomRight() {
        let interactionRange = 100;
        return left >= bottomRightCoordinates.left - interactionRange &&
               left <= bottomRightCoordinates.left + interactionRange &&
               top >= bottomRightCoordinates.top - interactionRange &&
               top <= bottomRightCoordinates.top + interactionRange;
    }

    function canInteractWithTopRight() {
        let interactionRange = 50;
        return left >= topRightCoordinates.left - interactionRange && top <= topRightCoordinates.top + interactionRange;
    }

    function canInteractWithTopMiddle() {
        let interactionRange = 100;
         return Math.abs(left - topMiddleCoordinates.left) <= interactionRange && top <= topMiddleCoordinates.top + interactionRange;
    }

    
    switch(event.key) {
        case 'ArrowLeft':
        case 'a':
            left = Math.max(-30, left - step); // Prevent moving left out of bounds
            character.style.left = left + 'px';
            character.className = (character.className === 'character-left') ? 'character-left-2' : 'character-left';
            break;
        case 'ArrowRight':
        case 'd':
            let maxLeft = gameArea.clientWidth - character.offsetWidth;
            left = Math.min(maxLeft -73, left + step); // Prevent moving right out of bounds
            character.style.left = left + 'px'; 
            character.className = (character.className === 'character-right') ? 'character-right-2' : 'character-right';
            break;
        case 'ArrowUp':
        case 'w':
            top = Math.max(-30, top - step); // Prevent moving up out of bounds
            character.style.top = top + 'px';
            character.className = (character.className === 'character-up') ? 'character-up-2' : 'character-up';
            break;
        case 'ArrowDown':
        case 's':
            let maxTop = gameArea.clientHeight - character.offsetHeight;
            top = Math.min(maxTop -80, top + step); // Prevent moving down out of bounds
            character.style.top = top + 'px';
            character.className = (character.className === 'character-front') ? 'character-front-2' : 'character-front';
            break;
            
         case 'e':
            if (canInteractWithRoulette()) {
                window.location.href = '/roulette';
                    }
            if (canInteractWithTopLeft()) {
                window.location.href = '/slots';
            } else if (canInteractWithBottomRight()) {
                window.location.href = '/idle';
            } else if (canInteractWithTopRight()) {
                window.location.href = '/blackjack';
            } else if (canInteractWithTopMiddle()) {
                window.location.href = '/pacman';
            }
            break;
    }
           
});

// Function to update the displayed count
function updateCountDisplay() {
    const displayCount = document.getElementById("displayCount");
    const count = parseInt(localStorage.getItem("count")) || 0;
    displayCount.textContent = "Coins: " + count;
}

// Call the updateCountDisplay function initially to set the initial count
updateCountDisplay();

// Set up an interval to update the count display periodically (e.g., every second)
setInterval(updateCountDisplay, 1000);

document.addEventListener('keydown', function(event) {
    // Your existing keydown event listener code here
    // ...
});
