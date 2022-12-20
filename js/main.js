let generated = [];
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
const cardsLength = 16;
let min = 0;
let max = 7;
const appMain = document.querySelector('.app');
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

let point = 0;
const pointItem = document.createElement('div');
pointItem.classList.add('point');
pointItem.innerHTML = 'Количество очков:' + '' + point;
appMain.prepend(pointItem);

const card = document.querySelectorAll('.card');
const num = document.querySelectorAll('.num');
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};
let game = [];

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

function hideCard() {
    for(let cardIndex = 0; cardIndex < card.length; cardIndex++) {
        card[cardIndex].classList.add('card-active');
    };
};
function showCard() {
    for(let cardIndex = 0; cardIndex < card.length; cardIndex++) {
        card[cardIndex].classList.remove('card-active');
    };
};
function checkCard() {
    if(game[0].number === game[1].number) {
        point++;
        pointItem.innerHTML = 'Количество очков:' + ' ' + point;
        game = [];
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