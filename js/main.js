let score
const rsp_game = document.querySelectorAll('.rsp-game')
const house = ['rock','scissors','paper']
const scoreText = document.querySelector('#score')
const win = document.querySelector('#how-win')
const userSelectedImg = document.querySelector('#user-selected')
const houseSelectedImg = document.querySelector('#house-selected')
const game = document.querySelector('.game')
const results = document.querySelector('.results')
const reset = document.querySelector('#reset')

score = (localStorage.getItem('rsp'))?localStorage.getItem('rsp'):0
scoreText.innerHTML = score

console.log(score)

const getRandomHouse = () => {
    return house[Math.floor(Math.random() * 3)]
}

const userWin = (userSelected, houseSelected) => {
    score++
    localStorage.setItem('rsp',score)
    scoreText.innerHTML = score
    win.innerHTML = 'YOU WIN'

    userSelectedImg.src = `./images/icon-${userSelected}.svg`
    houseSelectedImg.src = `./images/icon-${houseSelected}.svg`

    houseSelectedImg.parentNode.classList.add(houseSelected)
    userSelectedImg.parentNode.classList.add(userSelected)

    game.classList.add('hide')
    results.classList.remove('hide')
}

const houseWin = (userSelected, houseSelected) => {
    score--
    localStorage.setItem('rsp',score)
    scoreText.innerHTML = score
    win.innerHTML = 'HOUSE WIN'

    houseSelectedImg.src = `./images/icon-${houseSelected}.svg`
    userSelectedImg.src = `./images/icon-${userSelected}.svg`

    houseSelectedImg.parentNode.classList.add(houseSelected)
    userSelectedImg.parentNode.classList.add(userSelected)

    game.classList.add('hide')
    results.classList.remove('hide')
}

const tie = (userSelected, houseSelected) => {
    win.innerHTML = 'TIE'
    houseSelectedImg.src = `./images/icon-${houseSelected}.svg`
    userSelectedImg.src = `./images/icon-${userSelected}.svg`

    houseSelectedImg.parentNode.classList.add(houseSelected)
    userSelectedImg.parentNode.classList.add(userSelected)

    game.classList.add('hide')
    results.classList.remove('hide')
}

rsp_game.forEach(element => {
    element.addEventListener('click', e => {
        let userSelected = e.currentTarget.id
        console.log('seleccion de usuario: '+ userSelected)

        let houseSelected = getRandomHouse()
        console.log('seleccion pc: '+houseSelected)

        if(
            (userSelected === 'rock' && houseSelected === 'scissors') ||
            (userSelected === 'scissors' && houseSelected === 'paper') ||
            (userSelected === 'paper' && houseSelected === 'rock')
        ){
            userWin(userSelected, houseSelected)
        }else if(
            (houseSelected === 'rock' && userSelected === 'scissors') ||
            (houseSelected === 'scissors' && userSelected === 'paper') ||
            (houseSelected === 'paper' && userSelected === 'rock')
        ){
            houseWin(userSelected, houseSelected)
        }else{
            tie(userSelected, houseSelected)
        }

    })
})

reset.addEventListener('click', e => {
    e.preventDefault()
    game.classList.remove('hide')
    results.classList.add('hide')
    
    houseSelectedImg.parentNode.classList.value=''
    userSelectedImg.parentNode.classList.value=''
})