const appMain = document.querySelector('.app');
let images = [
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png',
];
let generated = [];
let game = [];
let point = 0;
const cardsLength = 16;
timer = 60;
const reload = document.createElement('a');
reload.classList.add('reload');
reload.innerHTML = 'Начать заново';
reload.href = '/';
startMenu();

function startMenu() {
    const start = document.createElement('div');
    start.classList.add('start');
    const startHeader = document.createElement('h1');
    startHeader.classList.add('start-header');
    startHeader.innerHTML = 'Найди пару'
    const startButton = document.createElement('button');
    startButton.classList.add('start-button');
    startButton.innerHTML = 'Новая игра';
    start.append(startHeader, startButton);
    appMain.append(start);
    startButton.addEventListener('click', () => {
        checkEasy();
    });
};

function checkEasy() {
    const start = document.querySelector('.start');
    const startHeader = document.querySelector('.start-header');
    const startButton = document.querySelector('.start-button');
    const startButtonHard = document.createElement('button');
    startButtonHard.classList.add('start-button');
    startButton.innerHTML = 'Легкая';
    startButtonHard.innerHTML = 'Сложная';
    startHeader.innerHTML = 'Выбери уровень сложности';
    start.append(startButtonHard);
    startButton.addEventListener('click', () => {
        startGame();
    });
    startButtonHard.addEventListener('click', () => {
        timer = 30;
        startGame();
    })
}

function startTimer() {
    const timerItem = document.createElement('div');
    timerItem.classList.add('timer');
    timerItem.innerHTML = timer;
    function timerUpdate() {
        if (timer === 1) {
            clearInterval(time);
            loose();
        }
        timer--
        timerItem.innerHTML = timer;
    }
    time = setInterval(timerUpdate, 1000);
    appMain.prepend(timerItem);
}

function startGame() {
    appMain.innerHTML = '';
    startTimer();
    let min = 0;
    let max = 7;
    const cardsItem = document.createElement('div');
    cardsItem.classList.add('cards');
    appMain.prepend(cardsItem);
    let x = 1;
    let i = 1;
    while(i <= cardsLength) {
        let random = Math.floor(Math.random() * (max - min) + min);
        const card = document.createElement('div');
        card.classList.add('card');
        const cardNum = document.createElement('img');
        cardNum.classList.add('num');
        cardsItem.append(card);
        card.append(cardNum);
        if(generated.length <= (cardsLength - 2)) {
            while(x <= 2) {
                let image = images[random];
                generated.push({random, image});
                x++;
            }
            x = 1;
        }
        i++;
    };
    const pointItem = document.createElement('div');
    pointItem.classList.add('point');
    pointItem.innerHTML = 'Количество очков:' + '' + point;
    appMain.prepend(pointItem);
    const card = document.querySelectorAll('.card');
    const num = document.querySelectorAll('.num');
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    };
    shuffle(generated); 
    shuffle(generated);
    card.forEach(function(el, index) {
        num[index].src = generated[index].image;
        el.addEventListener('click', () => {
            el.classList.add('card-animation');
            el.classList.add('card-active');
            num[index].classList.add('num-active');
            let number = generated[index].image;
            game.push({number, index});
            if(game.length === 2) {
                hideCard();
                setTimeout(showCard, 1000);
                setTimeout(checkCard, 1000);
            };
        });
    });
};

function hideCard() {
    const card = document.querySelectorAll('.card');
    for(let cardIndex = 0; cardIndex < card.length; cardIndex++) {
        card[cardIndex].classList.add('card-active');
    };
};
function showCard() {
    const card = document.querySelectorAll('.card');
    for(let cardIndex = 0; cardIndex < card.length; cardIndex++) {
        card[cardIndex].classList.remove('card-active');
    };
};
function checkCard() {
    const card = document.querySelectorAll('.card');
    const num = document.querySelectorAll('.num');
    const pointItem = document.querySelector('.point');
    if(game[0].number === game[1].number) {
        point++;
        pointItem.innerHTML = 'Количество очков:' + ' ' + point;
        game = [];
        console.log(point)
        if (point >= (cardsLength / 2)) {
            clearInterval(time);
            winner();
        }
    }else{
        card[game[0].index].classList.remove('card-active');
        num[game[0].index].classList.remove('num-active');
        card[game[1].index].classList.remove('card-active');
        num[game[1].index].classList.remove('num-active');
        card[game[0].index].classList.remove('card-animation');
        card[game[1].index].classList.remove('card-animation');
        game = [];
    };
};

function createMessage() {
    appMain.innerHTML = '';
    const message = document.createElement('div');
    message.classList.add('winner');
    const messageHeader = document.createElement('span');
    messageHeader.classList.add('winner-header');
    message.append(messageHeader, reload);
    appMain.append(message);
    messageHeader;
};

function winner() {
    createMessage();
    const messageHeader = document.querySelector('.winner-header');
    messageHeader.innerHTML = 'Игра пройдена!';

};

function loose() {
    createMessage();
    const messageHeader = document.querySelector('.winner-header');
    messageHeader.innerHTML = 'Вы проиграли!';
};