//grap elements
const gameSection = document.querySelector(".game")
const lives = document.querySelector(".lives")
const restartBtn = document.querySelector(".restart")
const readyBtn = document.querySelector(".ready")

let liveCount = 3;
lives.textContent = liveCount;

let sixPairs = 0

//create cards
const cards = [
    {color: 'red', name: 'red'},
    {color: 'blue', name: 'blue'},
    {color: 'yellow', name: 'yellow'},
    {color: 'green', name: 'green'},
    {color: 'gray', name: 'gray'},
    {color: 'black', name: 'black'},
    {color: 'red', name: 'red'},
    {color: 'blue', name: 'blue'},
    {color: 'yellow', name: 'yellow'},
    {color: 'green', name: 'green'},
    {color: 'gray', name: 'gray'},
    {color: 'black', name: 'black'}
]

const cardData = cards


const randomize = () => {
  return cardData.sort(() => Math.floor(Math.random() - 0.5))
}

const generateCard = () => {
    randomize()
    cardData.forEach(item => {
        const card = document.createElement('div')
        gameSection.append(card)
        card.setAttribute('name', item.name)
        // console.log(card)
        card.classList.add(item.name)
        card.setAttribute('style', `background-color:${item.name}`)
       
        card.style.pointerEvents = 'none'
        
        
        card.addEventListener('click', (e) => {
            let clickedCard = e.target
            clickedCard.setAttribute('style', `background-color:${item.name}`)
            checkMatch(e)
        })
    })

    const allGameCards = document.querySelectorAll('.game div')
    readyBtn.onclick = () => {
        readyBtn.classList.add('readyBtnHide')
        allGameCards.forEach(card => {
            card.removeAttribute('style')
            card.style.pointerEvents = 'all'
        })
    }
}

const checkMatch = (e) => {
    let clickedCard = e.target
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll('.flipped')
    if (flippedCards.length == 2) {
            if(flippedCards[0].getAttribute('name') == flippedCards[1].getAttribute('name')) {
                console.log('you win')
                sixPairs++
                flippedCards.forEach(flippedCard => {
                    flippedCard.classList.remove('flipped')
                })
            } else {
                console.log('you lose')
                flippedCards.forEach(flippedCard => {
                    setTimeout(() => {
                        flippedCard.removeAttribute('style')
                        flippedCard.classList.remove('flipped')
                    }, 200)
                })

                liveCount--
                lives.textContent = liveCount
            }
    }
    //if lives are over
    if(liveCount == 0) {
        MatchStatus("Sorry😢, You lose Try Again", '😪 Loser')
    }

    //when win
    if(sixPairs == 3) {
        setTimeout(() => {
            MatchStatus("Yeah🤓, You Won", "😎 I Won")
        }, 1000)
        sixPairs = 0
    }

}

const MatchStatus = (text, emoji) => {
        document.querySelectorAll('div').forEach(item => item.remove())
        gameSection.textContent = emoji
        gameSection.style.fontSize = '4rem'
        window.alert(text)
        restartBtn.classList.add('appearBtn')
        liveCount = 3
        lives.textContent = liveCount

        restartBtn.onclick = () => {
            gameSection.textContent = ''
            generateCard()
            restartBtn.classList.remove('appearBtn')
            readyBtn.classList.remove('readyBtnHide')
        }
}

generateCard()
