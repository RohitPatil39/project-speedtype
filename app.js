const TextToDisplay = 'https://api.quotable.io/random'
const DisplayText = document.getElementById('TextToShow')
const InputTxt = document.getElementById('InputText')
const TimerCount = document.getElementById('Timer')
const feedback = document.getElementById('Feedback')
const wpm = document.getElementById('WPM')
const errors = document.getElementById('Mistakes')
const accuracy = document.getElementById('Accuracy')
const container = document.getElementById('Container')
const refreshpage = document.getElementById('TryAgain')
const welcome = document.getElementById('welcomeMsg')

TimerCount.innerText="Start typing..."

InputText.value = null

let started = true
let correctWords = 0
let mistakes = 0
let charArray
let typedArray

InputTxt.addEventListener('input', () => {
    charArray = DisplayText.querySelectorAll('span')
    typedArray = InputTxt.value.split('')

    charArray.forEach((char, index) => {
        
        const InputChar = typedArray[index]

        if(InputChar == null){
            char.classList.remove('correct')
            char.classList.remove('incorrect')
            correct = false
        }
        else{
            if(started) startTimer()
            started = false
            if(InputChar === char.innerText){
                char.classList.add('correct')
                char.classList.remove('incorrect')
            }
            else{
                char.classList.remove('correct')
                char.classList.add('incorrect')
                correct = false
            }
        } 
    })
   
    if(charArray.length-20 == typedArray.length){
        getNextLine()
    }
    
})


function findwpm(){
    let flag=true
    charArray = DisplayText.querySelectorAll('span')
    typedArray = InputTxt.value.split('')
    typedArray.forEach((char, index) => {

        const InputChar = charArray[index]

            if(InputChar.innerText != char){
                flag =false
            }
            else if((InputChar.innerText == ' ' || InputChar.innerText == '.') && flag == true ){
                correctWords ++
            }
            else
            flag = true
    })

    charArray.forEach((char) => {
        if(char.classList.contains('incorrect'))
        mistakes ++
    } )
}
function getText() {
    return fetch(TextToDisplay)
    .then(response => response.json())
    .then(data => data.content)
}

let spacechar=document.createElement('span')
spacechar.innerText=' '
async function getNextLine(){
    if(!started)
    DisplayText.appendChild(spacechar)
    const FetchedLine =  await getText()
    console.log(FetchedLine)
    FetchedLine.split('').forEach(element => {
        const char = document.createElement('span')
        char.innerText = element
        DisplayText.appendChild(char)
    });
}

let startTime
function startTimer() {
  TimerCount.innerText = 0
  startTime = new Date()
  setInterval(() => {
    TimerCount.innerText = getTimerTime()
  }, 1000)
}
let f=0

function getTimerTime() {
    if(TimerCount.innerText < 60)
  return Math.floor((new Date() - startTime) / 1000)
  else{
    findwpm()

    if(correctWords > 28){
        feedback.innerText = "You are Fast! \n"
        var img=document.createElement('img');
        img.classList.add('img')
        img.src = './fast.png' 
        feedback.appendChild(img);
    }
    else{
        feedback.innerText = "\n You are slow! \n"
        var img=document.createElement('img');
        img.classList.add('img')
        img.src = './turtle.png' 
        feedback.appendChild(img);
    }
    welcome.style.visibility = "hidden"; 
    DisplayText.style.visibility = "hidden"; 
    InputTxt.style.visibility = "hidden"; 
    container.style.visibility = "hidden"; 
    TimerCount.style.visibility = "hidden"; 
    refreshpage.style.visibility = "visible"
    errors.style.visibility = "visible"
    accuracy.style.visibility = "visible"
    feedback.style.visibility = "visible"
    wpm.style.visibility = "visible"
    wpm.innerText = "\n Your Speed : "+correctWords +" wpm."
    document.getElementById('Result').style.visibility = "visible"
    errors.innerText = "\n Errors : "+ mistakes +" letters."
    const percentAccuracy = (100*(1-mistakes/typedArray.length)).toFixed(2)
    console.log(mistakes)
    console.log(typedArray.length)
    accuracy.innerText =  "\n Accuracy : "+ percentAccuracy +" %."
    
    return "Time is Up !"
}
}
getNextLine()