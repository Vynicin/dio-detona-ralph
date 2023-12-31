const state  = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        livesLeft: document.querySelector('#life'),
    },

    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function clearSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });
};

function gameOver () {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    clearSquare();
    alert("Game Over! You have made: " + state.values.result + " points");
};

function lostByLife () {
    if (state.values.currentLives === 0) {
        state.values.currentTime = 0;
    }
}

function countDown (){
    if (state.values.currentTime > 0) {
       state.values.currentTime--; 
    }
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        gameOver();
    };
};

function randomSquare () {
    clearSquare();
    let randomNumber = Math.floor(Math.random() * 9);
    let square = state.view.squares[randomNumber];
    square.classList.add('enemy');
    state.values.hitPosition = square.id;
};

function playSound(sound){
    let audio = new Audio(`./assets/sounds/${sound}`);
    audio.volume = 0.2;
    audio.play();
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
                clearSquare();
            }
            else if (square.id != state.values.hitPosition){
                if (state.values.currentLives > 0) {
                    state.values.currentLives--;
                };
                state.view.livesLeft.textContent = `x${state.values.currentLives}`;
                lostByLife();
            };
        });
    });
};


(function () {
    addListenerHitBox();
})();