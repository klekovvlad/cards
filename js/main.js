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
reload.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
})
// reload.href = window.location.reload();
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
    const rulesButton = document.createElement('button');
    rulesButton.classList.add('start-button', 'rules-button');
    rulesButton.innerHTML = 'Правила игры';
    const developer = document.createElement('a');
    developer.classList.add('developer');
    developer.href = 'https://t.me/Klekov';
    developer.innerHTML = 'Vladislav Klekov';
    start.append(startHeader, startButton, rulesButton);
    appMain.append(start, developer);
    startButton.addEventListener('click', () => {
        checkEasy();
    });
    rulesButton.addEventListener('click', () => {
        start.innerHTML = '';
        startHeader.innerHTML = 'Правила игры';
        reload.innerHTML = 'Назад'
        const rulesText = document.createElement('p');
        rulesText.classList.add('rules-text');
        rulesText.innerHTML = 'Ваша цель - найти пары картинок, всего 8 пар. Но это не все - сверху тикает таймер, когда он закончится - вы проиграете! Время вы выбираете сами. Легкий уровень - 60 сек., Сложный уровень - 30 сек., Свободный - от 0 сек. до 999 сек. <br> Приятной игры!'
        start.append(startHeader, rulesText, reload);
    });
};

function checkEasy() {
    const start = document.querySelector('.start');
    const startHeader = document.querySelector('.start-header');
    const startButton = document.querySelector('.start-button');
    const rulesButton = document.querySelector('.rules-button');
    const startButtonHard = document.createElement('button');
    startButtonHard.classList.add('start-button');
    startButton.innerHTML = 'Легкий';
    startButtonHard.innerHTML = 'Сложный';
    startHeader.innerHTML = 'Выбери уровень сложности';
    const startButtonFree = document.createElement('button');
    startButtonFree.classList.add('start-button');
    startButtonFree.innerHTML = 'Свободный';
    start.append(startButtonFree, startButtonHard);
    rulesButton.remove();
    startButton.addEventListener('click', () => {
        startGame();
    });
    startButtonHard.addEventListener('click', () => {
        timer = 30;
        startGame();
    });
    startButtonFree.addEventListener('click', () => {
        start.innerHTML = '';
        start.append(startHeader);
        startHeader.innerHTML = 'Введи необходимое время';
        startButton.innerHTML = 'Начать игру';
        const startImput = document.createElement('input');
        startImput.classList.add('start-input');
        startImput.type = 'num';
        startImput.maxLength = '3';
        start.append(startImput, startButton);
        console.log(startImput);
        startImput.addEventListener('keyup', () => {
            startImput.value = startImput.value.replace(/[^\d]/g, "");
        });
        startButton.addEventListener('click', () => {
            // if(startImput.value > 90) {
            //     startImput.value = '';
            // }else if(startImput.value < 10) {
            //     startImput.value = '';
            // }else{

            // }
            if(startImput.value === '') {
                timer = 60;
            }else{
                timer = +startImput.value;
                
            }
            startGame();
        });
    });
}

function startTimer() {
    const timerItem = document.createElement('div');
    timerItem.classList.add('timer');
    timerItem.innerHTML = timer;
    function timerUpdate() {
        if (timer === 0) {
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
    appMain.append(cardsItem, reload);
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