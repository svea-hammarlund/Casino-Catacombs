window.addEventListener('load', (event) => {

    // ~~~ GLOBAL VARIABLES ~~~
    const animals = [
        'rabbit',
        'horse',
        'iguana',
        'chameleon',
        'shark',
        'crocodile',
        'kangaroo',
        'donkey',
        'badger',
        'beaver',
        'tiger',
        'chinchilla',
        'alligator',
        'gorilla',
        'jackal',
        'weasel',
        'buffalo',
        'raccoon',
        'chicken',
        'llama',
        'armadillo',
        'hedgehog',
        'hippopotamus'
    ];
    const draws = [
        'gallows',
        'head',
        'body',
        'leftArm',
        'rightArm',
        'leftLeg',
        'rightLeg',
        'leftFoot',
        'rightFoot',
    ]
    const canvas = document.getElementById('stickman');
    const context = canvas.getContext('2d');
    let step = 0;
    let answer = '';
    let livesElem = document.getElementById('lives');
    let guessed = [];
    let charArray = [];
    let lives = 9;

    // ~~~ F U N C T I O N S ~~~
    randomWord = () => {
        answer = animals[Math.floor(Math.random() * animals.length)];
        charArray = answer.split('');
    }

    updateLives = () => {
        livesElem.innerHTML = 'You have <span style="color: #69D1C5">' + lives + '</span> lives left';
        if (lives === 1) {
            livesElem.innerHTML = 'You have <span style="color: #69D1C5">' + lives + '</span> life left!';
        } else if (lives === 0){
            livesElem.innerHTML = 'Game Over :(';
        }
    }

    processGuess = (selectedElem, selectedLetter) => {
        if (guessed.indexOf(selectedLetter.toLowerCase()) === -1) {
            guessed.push(selectedLetter.toLowerCase());
        };
        selectedElem.setAttribute('disabled', true);

        if (answer.indexOf(selectedLetter.toLowerCase()) >= 0) {
            guessedWord();
        } else {
            lives--;
            updateLives();
            Draw(draws[step++]);
            if (undefined === draws[step]) this.disabled = true;
        }
    }

    guessedWord = () => {
        let wordStatus = '';

        for (let i = 0; i < charArray.length; i++) {
            let letter = charArray[i];

            if (guessed.indexOf(letter.toLowerCase()) >= 0) {
                wordStatus += letter.toLowerCase();
            } else {
                wordStatus += ' _ ';
            }
        }
        document.getElementById('word').innerHTML = wordStatus;
    }

    toggleKeyboardState = (state) => {
        let keys = document.querySelectorAll('.key');
        keys.forEach(function (e) {
            e.disabled = state;
        });
    }

    reset = () => {
        clearCanvas();
        toggleKeyboardState(false);
        step = 0;
        lives = 9;
        guessed = [];
        updateLives();
        randomWord();
        guessedWord();
    }

    clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    Draw = (part) => {
        switch (part) {
            case 'gallows':
                context.strokeStyle = '#69D1C5';
                context.lineWidth = 5;
                context.beginPath();
                context.moveTo(150, 225);
                context.lineTo(5, 225);
                context.moveTo(25, 225);
                context.lineTo(25, 5);
                context.lineTo(100, 5);
                context.lineTo(100, 25);
                context.stroke();
                break;

            case 'head':
                context.lineWidth = 5;
                context.beginPath();
                context.arc(100, 50, 25, 0, Math.PI * 2, true);
                context.closePath();
                context.stroke();
                break;

            case 'body':
                context.beginPath();
                context.moveTo(100, 75);
                context.lineTo(100, 110);
                context.stroke();
                break;

            case 'leftArm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(140, 100);
                context.stroke();
                break;

            case 'rightArm':
                context.beginPath();
                context.moveTo(100, 85);
                context.lineTo(60, 100);
                context.stroke();
                break;

            case 'leftLeg':
                context.beginPath();
                context.moveTo(100, 110);
                context.lineTo(125, 190);
                context.stroke();
                break;

            case 'leftFoot':
                context.beginPath();
                context.moveTo(122, 190);
                context.lineTo(135, 185);
                context.stroke();
                break;

            case 'rightLeg':
                context.beginPath();
                context.moveTo(100, 110);
                context.lineTo(80, 190);
                context.stroke();
                break;

            case 'rightFoot':
                context.beginPath();
                context.moveTo(82, 190);
                context.lineTo(70, 185);
                context.stroke();
                break;
        }
    };

    async function addSoulPoints(username, pointsToAdd) {
        try {
            const response = await fetch('/api/add_soul_points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, points: pointsToAdd })
            });
            const result = await response.json();
            if (response.ok) {
                return result.new_soul_points;
            } else {
                throw new Error(result.message || "An error occurred while adding soul points.");
            }
        } catch (error) {
            console.error('Error adding soul points:', error);
            alert('An error occurred while adding soul points.');
            return null;
        }
    }

    // ~~~ MAIN GAME LOGIC ~~~
    randomWord();
    guessedWord();
    document.querySelector('#keyboard').addEventListener('click', async function (e) {
        if (e.target.localName === 'button') {
            processGuess(e.target, e.target.innerText);

            // Update the word display after each guess
            guessedWord();

            // Check if the guessed letters complete the word
            let isComplete = charArray.every((letter) => guessed.includes(letter.toLowerCase()));

            if (isComplete && lives > 0) {
                // Disable further input by disabling all keys
                toggleKeyboardState(true);

                // Notify the player of the win
                alert('Congratulations! You guessed the word!');

                // Call addSoulPoints function if the user wins
                const username = localStorage.getItem('username'); // Ensure you have the username stored in localStorage
                if (username) {
                    try {
                        const newSoulPoints = await addSoulPoints(username, 1); // Adjust the number of points as needed
                        alert(`You've earned soul points! New total: ${newSoulPoints}`);
                    } catch (error) {
                        // Error handling if adding soul points fails
                        console.error('Error when adding soul points:', error);
                        alert('An error occurred while adding soul points.');
                    }
                }
            } else if (lives <= 0) {
                // If the player has no lives left, the game is over
                toggleKeyboardState(true);
                alert('Game Over! You\'ve run out of lives!');
            }
        }
    });


    // Restart game if New Game clicked
    document.getElementById('reset').addEventListener('click', reset);
});