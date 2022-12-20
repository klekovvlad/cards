let generated = [];
const cardsLength = 16;
let min = 1;
let max = 99;
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
    const cardNum = document.createElement('span');
    cardNum.classList.add('num');
    cardsItem.append(card);
    card.append(cardNum);
    if(generated.length <= (cardsLength - 2)) {
        while(x <= 2) {
            generated.push(random);
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
    num[index].innerHTML = generated[index];
    el.addEventListener('click', () => {
        el.classList.add('card-active');
        num[index].classList.add('num-active');
        let number = num[index].innerHTML;
        game.push({number, index});
        if(game.length === 2) {
            if(+game[0].number === +game[1].number) {
                point++;
                pointItem.innerHTML = 'Количество очков:' + ' ' + point;
                game = [];
            }else{
                card[game[0].index].classList.remove('card-active');
                num[game[0].index].classList.remove('num-active');
                card[game[1].index].classList.remove('card-active');
                num[game[1].index].classList.remove('num-active');
                game = [];
            };
        };
    });
});
