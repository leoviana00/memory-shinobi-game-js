const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


// Personagens
const figures = [
    'kakashi',
    'shikamaru',
    'gaara',
    'sasuke',
    'naruto',
    'jiraiya',
    'tobi',
    'asuma',
    'rocklee',
    'itachi',
]

const playSounds = (audioName) => {
    let audio = new Audio(`/src/assets/audio/${audioName}.m4a`);
    audio.volume = 0.8;
    audio.play();
}

// função para criar os elementos
const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';



// Função para checar se todos os cards foram desabilitados
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === figures.length * 2){
        clearInterval(this.loop);
        alert(`Parabésn, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}  `);

    }

}

// Função para verificar se os cards são iguais
const checkCards = () => {

    const firstFigure = firstCard.getAttribute('data-figure');
    const secondFigure = secondCard.getAttribute('data-figure');

    if(firstFigure === secondFigure) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        playSounds("flip");

        firstCard = '';
        secondCard = '';

        checkEndGame();
 
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            playSounds("flipback");
            
            firstCard = '';
            secondCard = '';
        },500);
    }
    
}

// Função para revelação dos cards
const revelCard = ({target}) => {
    // Checando se o card já possue a classe reveal-card com includes, caso ela possua é pq já foi revelada, se já foi revelada, não iremos fazer nada.
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards(); 

    } 

    const bgm = document.getElementById("bgm");
    bgm.play(); 
    
}

// função para criar os cards
const createCard = (figure) => {
    const card = createElement('div', 'card');
    const card__front = createElement('div', 'card__front face');
    const card__back = createElement('div', 'card__back face');

    card__front.style.backgroundImage = `url(./src/assets/images/${figure}.gif)`

    card.appendChild(card__front);
    card.appendChild(card__back);

    card.addEventListener('click', revelCard);
    // Adicionando um atributo ao card - figureName
    card.setAttribute('data-figure', figure)

    return card;
};

// função para criar os cards coms suas respectivas figuras no back e montar os cards no grid
const loadGame = () => {
    // Utilizando Spred Operator para espalhar os elemenos do array e duplicando os personagens
    const duplicatesFigures = [ ...figures, ...figures ];

    // Utilizando o método sort para embaralhar as cartas - O sort precisa de um número > 0 e < 0 (Gerar um número aleatorio positivo e negativo)
    const shuffledArray = duplicatesFigures.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((figure) => {
        const card = createCard(figure);
        grid.appendChild(card);
    });
}

// Função para start do time
const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    },1000);
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');    
    startTimer();
    loadGame();

}

