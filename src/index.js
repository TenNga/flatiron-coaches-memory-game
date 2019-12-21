document.addEventListener('DOMContentLoaded',() => {

const cards = document.querySelectorAll('.memory-card');
const cardContents = []
const minute = document.querySelector('#minute');
const second = document.querySelector('#second');
const userRecord = document.querySelector('.user-records')
const userFrom = document.querySelector('#user-form')
const userNameInput = document.querySelector('#username')
const username = "";
let time = "";
let removeInterval = null;
let lock = false;

startTimer = () => {
    removeInterval = setInterval(()=>{
        if(parseInt(second.innerText) < 9)
            second.innerText = "0" + (parseInt(second.innerText) + 1);
        else if(second.innerText === "59"){
            second.innerText = "00"
            minuteIncrease(); 
        }
        else
            second.innerText = parseInt(second.innerText) + 1;
        
    },1000)
} // end of startTimer

stopTimer = () => {
    console.log("stop timer")
    clearInterval(removeInterval);
}

minuteIncrease = () => {
    if(parseInt(minute.innerText) < 9)
            minute.innerText = "0" + (parseInt(minute.innerText) + 1);
        else if(minute.innerText === "59"){
            minute.innerText = "00"
        }
        else
            minute.innerText = parseInt(minute.innerText) + 1;
}

listRecord = () => {
    userRecord.insertAdjacentHTML("beforeend",`
        <li>${userNameInput.value} ${time}</li>
    `)
}

document.addEventListener('keydown', (event)=>{
    if(event.keyCode === 32 && lock === false){
        startTimer();
        lock = true;
    } else if (event.keyCode === 32 && lock === true){
        time = `${minute.innerText} m : ${second.innerText} s`;
        stopTimer();
        listRecord(time);
        lock = false;
    }
})

userFrom.addEventListener('submit',(event)=>{
    event.preventDefault();
    username = userNameInput.value;
})


for(let i = 0;i < 12; i++){
    cardContents.push()
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

flipCard = (event) => {
    if(lockBoard) return;
    if(event.target.parentNode === firstCard) return;
    event.target.parentNode.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = event.target.parentNode;
        return;
    } 
    //second click
    secondCard = event.target.parentNode;

    checkForMatch();
} //end of flipCard

checkForMatch = () => {
    isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? disableCard() : unflipCards();
} //end of checkMatch

disableCard = () => {
    // console.log("match....")
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

unflipCards = () => {
    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        },1000);
}

resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null]
}

(shuffle = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click',flipCard))


})