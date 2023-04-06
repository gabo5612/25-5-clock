
const sessionIncrement=document.querySelector('#session-increment')
const timerLabel=document.querySelector('#timer-label')
const timeLeft=document.querySelector('#time-left')
const start_stop=document.querySelector('#start_stop')
const reset=document.querySelector('#reset')
const beep=document.querySelector('#beep')
const breakDecrement=document.querySelector('#break-decrement')
const breakLength=document.querySelector('#break-length')
const breakIncrement=document.querySelector('#break-increment')
const sessionDecrement=document.querySelector('#session-decrement')
const sessionLength=document.querySelector('#session-length')
let isPaused = true;
let segInterval; 
let globalTime=0
let seg=60
var time=timeLeft.textContent
var breakT=breakLength.textContent
var lengthT=sessionLength.textContent

sessionIncrement.addEventListener('click', ()=>{
    buttonsFSessionLength(1)
})
sessionDecrement.addEventListener('click', ()=>{
    buttonsFSessionLength()
})
function buttonsFSessionLength(value){
    seg=60 
    if(value===1 && lengthT<60){
        lengthT++
        time=lengthT
        timeP=time.toString().padStart(2,'0')
        sessionLength.innerHTML=lengthT
        timeLeft.innerHTML=`${timeP}:00 `
       
    } else if (lengthT>1){
        lengthT--
        time=lengthT
        timeP=time.toString().padStart(2,'0')
        sessionLength.innerHTML=lengthT
        timeLeft.innerHTML=`${timeP}:00 `
      
    } 
    
    
}
breakIncrement.addEventListener('click', ()=>{
    buttonsForBreakLength(1)
})
breakDecrement.addEventListener('click', ()=>{
    buttonsForBreakLength()
})
function buttonsForBreakLength(value){
    seg=60
    if(value===1 && breakT<60){
        breakT++
        breakLength.innerHTML=breakT
        
    } else if(breakT>1){
        breakT--
        breakLength.innerHTML=breakT
    }
   
}

function toNumber(value){
    const digit=parseInt(value)
    return(digit)
   
}


function sessionLengthFN(value){
    let min=toNumber(value)
    globalTime=min
    min=min-1
    globalTime
    
    timerLabel.innerHTML='Session'
    
        segInterval=setInterval(()=>{
            if (isPaused) return;

            seg--
            segP=seg.toString().padStart(2,'0')
            minP=min.toString().padStart(2,'0')
            timeLeft.innerHTML=`${minP}:${segP}`
            
        if (min === 0 && seg===0) {
            segP=seg.toString().padStart(2,'0')
            minP=min.toString().padStart(2,'0')
            timeLeft.innerHTML=`${minP}:${segP}`
            clearInterval(segInterval)
            beep.play()
            breakLengthFN(breakT)
          }else if(min>0 && seg===0){
            min--
            seg=59
            segP=seg.toString().padStart(2,'0')
            minP=min.toString().padStart(2,'0')
            timeLeft.innerHTML=`${minP}:${segP}`
          }
        },1000)

}

function breakLengthFN(value){
    let min=toNumber(value)
    min=min-1
    
    timerLabel.innerHTML='Break'
    
   segInterval=setInterval(()=>{
    if (isPaused) return;
        seg--
        segP=seg.toString().padStart(2,'0')
        minP=min.toString().padStart(2,'0')
        timeLeft.innerHTML=`${minP}:${segP}`
        
    if (min === 0 && seg===0) {
        segP=seg.toString().padStart(2,'0')
        minP=min.toString().padStart(2,'0')
        timeLeft.innerHTML=`${minP}:${segP}`
        clearInterval(segInterval)
        beep.play()
        sessionLengthFN(globalTime)
      }else if(min>0 && seg===0){
        min--
        seg=59
        segP=seg.toString().padStart(2,'0')
        minP=min.toString().padStart(2,'0')
        timeLeft.innerHTML=`${minP}:${segP}`
      }
    },1000)
    
}

start_stop.addEventListener('click', ()=>{
    isPaused = !isPaused;
    if (isPaused === false && seg===60) {
        sessionLengthFN(time);
        sessionIncrement.disabled = true;
        breakDecrement.disabled = true;
        breakIncrement.disabled = true;
        sessionDecrement.disabled=true;
    } 
})

reset.addEventListener('click',()=>{
    breakLength.innerHTML='5'
    sessionLength.innerHTML='25'
    timeLeft.innerHTML='25:00'
    clearInterval(segInterval)
    sessionIncrement.disabled=false
    breakDecrement.disabled=false
    breakIncrement.disabled=false
    sessionDecrement.disabled=false
})