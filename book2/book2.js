const btn = document.querySelector('#button');
const timeBar= document.querySelector('#timebar');
const timeFill = document.querySelector('#time');
const bug = document.querySelector('#bug');

const text1 = document.querySelector('#textArea1');
const text2 = document.querySelector('#textArea2');



const texts = document.querySelectorAll('#textArea1,#textArea2');

const originals = [];
for ( let i = 0; i < texts.length; i++){
    originals[i]= texts[i].textContent; // 원본 저장 (백업용)
}
let bugActive = false;

function allEmpty(){
    for( let i = 0; i < texts.length; i++){
        if(texts[i].textContent.length >0) return false; // 하나라도 내용이 있으면 false
    }
    return true;
}
function deleteOne() {
  if (allEmpty()) { // 모두 비어있으면 원본 복원
    for (let i = 0; i < texts.length; i++) {
      texts[i].textContent = originals[i];
    }
    return;
  }

  for (let i = 0; i < texts.length; i++) { 
    const currentText= texts[i].textContent;
    if (currentText.length > 0) {
      texts[i].textContent = currentText.slice(1);
      break;
    }
  }
}
btn.addEventListener('click', deleteOne);




function spawnBug(){
    if(bugActive) return;
    bugActive = true;

    text1.classList.add('blurred');
    text2.classList.add('blurred');

    bug.classList.remove('hidden');

    btn.disable = true;

}

function killBug(){
    bugActive = false;

    text1.classList.remove('blurred');
    text2.classList.remove('blurred');

    btn.disable = false;

    bug.classList.add('hidden');

}
bug.addEventListener('click', killBug);

const bugInterval = setInterval(spawnBug,10000);



let totalTime= 50;
let timeLert = totalTime

