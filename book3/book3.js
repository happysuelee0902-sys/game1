const btn = document.querySelector('#button');
const timeBar= document.querySelector('#timebar');
const timeFill = document.querySelector('#time');
const time = document.querySelector('#time');

const bug = document.querySelector('#bug');

const winOverlay = document.querySelector('#winOverlay');
const retryBtn = document.querySelector('#retryBtn');
const homeBtn = document.querySelector('#homeBtn');

const countdownEl = document.querySelector('#countdown');
const countText = document.querySelector('#countText');

const text1= document.querySelector('#textArea1');
const text2 = document.querySelector('#textArea2');
const texts = document.querySelectorAll('#textArea1,#textArea2');

const originals = [];
for ( let i = 0; i < texts.length; i++){
    originals[i]= texts[i].textContent; // 원본 저장 (백업용)
}
let bugActive = false;

let bugInterval;
let bugPosition = 30;

function allEmpty(){
    for( let i = 0; i < texts.length; i++){
        if(texts[i].textContent.length >0) return false; // 하나라도 내용이 있으면 false
    }
    return true;
}
function deleteOne() {
if (winOverlay && !winOverlay.classList.contains('hidden')) return; // 이미 승리상태면 무시해

if (!countdownEl.classList.contains('hidden')) return;
  for (let i = 0; i < texts.length; i++) { 
    const currentText= texts[i].textContent;
    if (currentText.length > 0) {
      texts[i].textContent = currentText.slice(1);
      break;
    }
  }
  if (allEmpty()) showResult('win');
}
btn.addEventListener('click', deleteOne);




function spawnBug(){
    if(bugActive) return;
    bugActive = true;

    text1.classList.add('blurred');
    text2.classList.add('blurred');

    bug.classList.remove('hidden');
    bugPosition += 50; 
    bug.style.right = bugPosition + 'px';

    btn.disabled = true;

}

function killBug(){
    bugActive = false;

    text1.classList.remove('blurred');
    text2.classList.remove('blurred');

    btn.disabled = false;

    bug.classList.add('hidden');

}
bug.addEventListener('click', killBug);





function startCountdown(callback) {
  const seq = ['3','2','1','start'];
  let i = 0;
  countdownEl.classList.remove('hidden'); // 카운트다운 보이게
  countdownEl.style.pointerEvents = 'auto';
  countText.textContent = seq[i];

  (function next(){
      const delay = 1000; 
      setTimeout(() => {
          i++;
          if (i < seq.length) {
              countText.textContent = seq[i];
              next();
          } else {
              setTimeout(() => { 
                  countdownEl.classList.add('hidden'); // 숨기기
                  countdownEl.style.pointerEvents = 'none';
                  if (callback) callback();
              }, 500);
          }
      }, delay);
  })();
}

let timerInterval;
let timeLeft = 45;
let totalTime = 45;

function startTimer(seconds) {
    timeLeft = seconds;
    totalTime = seconds;
    timeFill.style.width = '100%';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const percent = (timeLeft / totalTime) * 100;
        timeFill.style.width = percent + '%';
        
        if (timeLeft <= 0) {
            stopTimer();
            showResult('lose');
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}


function startGame() {

  btn.disabled = false;
  startTimer(50);

  bugPosition = 30;
  bug.style.right = bugPosition + 'px';

  if (bugInterval) {
    clearInterval(bugInterval);
}
  
 
  bugInterval = setInterval(spawnBug, 10000);
}

function showWin(){
  stopTimer();
  if (bugInterval) {
    clearInterval(bugInterval);
}

  btn.disabled = true;
  winOverlay.classList.remove('hidden');
}
retryBtn.addEventListener('click',()=>{
  for (let i =0; i < texts.length; i++)texts[i].textContent = originals[i]; // 글 복구
  
  btn.disabled = false;
  winOverlay.classList.add('hidden'); 

  startCountdown(()=>{
    startTimer(45);
    restartBugs();
    bugActive = false;
    bug.classList.add('hidden');
    bugPosition = 30;
    bug.style.right = bugPosition + 'px';
    text1.classList.remove('blurred');
    text2.classList.remove('blurred');

    startCountdown(()=>{
        startGame();
    });
  });
});
function restartBugs(){
    if (bugInterval) {
        clearInterval(bugInterval);
    }
    bugInterval = setInterval(spawnBug,10000);
}
btn.disabled = true;
startCountdown(() => {
  startGame();
});
function onTimeUp(){
  showResult('lose');
}

function showResult(mode){
  stopTimer();
  if(bugInterval)clearInterval(bugInterval);
  btn.disabled = true;

  const titleEl = document.querySelector('#winOverlay h2');
  titleEl.textContent= (mode==='win')? '쉽네ㅋ': '오늘따라 집중이..';

  winOverlay.classList.remove('hidden');
}
