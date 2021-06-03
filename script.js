const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreElm = document.getElementById('score')
const timeElm = document.getElementById('time')
const endGame_container = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('btn-setting')
const settingsContainer = document.getElementById('setting-container')
const settingsForm = document.getElementById('setting-form')
let difficultyValue = document.getElementById('difficulty')


let score = 0
let j = 0
let time = 20
let randomWordArr = []
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

difficultyValue.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

const setTime = setInterval(updateTime,1000)

async function getWord(){
    const res = await fetch('https://random-word-api.herokuapp.com/all')
    const data = await res.json()
    for(let i=0;i< 2*time;i++){
        let randomWord= data[Math.floor(Math.random()*data.length)]
        randomWordArr.push(randomWord)
    }

    updateInDom()
    // const timeUpdate = await updateTime()
}


function updateInDom(){
    word.innerHTML = randomWordArr[j]
}

getWord()


function updateScore(){
    score++
    scoreElm.innerHTML=score
}

function updateTime(){
    time--
    timeElm.innerHTML=time + 's'

    if(time===0){
        clearInterval(setTime)
        gameOver()
    }
}

function gameOver(){
    endGame_container.innerHTML=`<h2>Time ran out</h2>
    <p>Your score is '${score}'</p>
    <button class="btn" onclick="location.reload()">Reload</button>`
    endGame_container.style.display = 'flex'
}


text.addEventListener('input', e=>{
    let inputValue = e.target.value

    if(inputValue === randomWordArr[j]){
        j++
        updateInDom()
        updateScore()
        // time+=5

        if(difficulty === 'hard'){
            time+=2
        }else if(difficulty === 'medium'){
            time+=3
        }else{
            time+=5
        }
        updateTime()

        e.target.value=''
    }
})

settingsBtn.addEventListener('click', ()=> settingsContainer.classList.toggle('hide'))

settingsForm.addEventListener('change',(e)=>{
    difficulty = e.target.value
    localStorage.setItem('difficulty',difficulty)
})
