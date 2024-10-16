let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
});


function autoPlay() {
    const button = document.querySelector('.js-auto-play-button');
    const status = document.querySelector('.js-auto-play-status');

    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
        button.innerHTML = 'Stop Playing';
        status.innerHTML = 'Auto Play : <span class="status-on">On</span>';
        
    } else {
        stopAutoPlay();
        button.innerHTML = 'Auto Play';
        status.innerHTML = 'Auto Play : <span class="status-off">Off</span>';
    }
}

function stopAutoPlay() {
    clearInterval(intervalId);
    isAutoPlaying = false;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
        resetConfirmation();
    } else if (event.key === 'a') {
        autoPlay();
    }
})


function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }


    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = `${result}`;

    document.querySelector('.js-moves').innerHTML = `You <img src="/images/${playerMove}-emoji.png" class="move-icon"> <img src="/images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}




function pickComputerMove() {
    const randomNum = Math.random();
    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNum >= 2 / 3 && randomNum < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
    resetConfirmation();
});


let isConfirmationVisible = false;

function resetConfirmation() {
    const resetMessage = document.querySelector('.js-reset-message');

    resetMessage.innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-yes">Yes</button>
    <button class="js-reset-no">No</button>`

    isConfirmationVisible = true;


    document.querySelector('.js-reset-yes').addEventListener('click', () => {
        resetScore();
        resetMessage.innerHTML = '';
        isConfirmationVisible = false;
    });

    document.querySelector('.js-reset-no').addEventListener('click', () => {
        resetMessage.innerHTML = '';
        isConfirmationVisible = false;
    });

    

    document.body.addEventListener('keydown', (event) => {

        if(isConfirmationVisible === true){
            if (event.key === 'y' || event.key === 'Enter') {
                resetScore();
                resetMessage.innerHTML = '';
                isConfirmationVisible = false;
            }else if(event.key === 'n'){
                resetMessage.innerHTML = '';
                isConfirmationVisible = false;
            }
        }
        
    });
}


function resetScore() {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    updateScoreElement();
}

