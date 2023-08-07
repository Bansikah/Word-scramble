const wordText = document.querySelector(".word");
hintText = document.querySelector(".hint span");
timeText = document.querySelector(".time b");
inputField = document.querySelector("input");
refreshBtn = document.querySelector(".refresh-word");
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() =>{
      if(maxTime > 0){
         maxTime--;//decrease time if it is less than 0
        return timeText.innerText = maxTime;
      }
      clearInterval(timer);
      alert('Time off! ${correctWord.toUpperCase()} was the correct word'); 
      initGame();
    },1000);
}

const initGame = () => {
    initTimer(30);// calling the timer function with passing 30s as maxTime value 
   let randomObj = words[Math.floor(Math.random() * words.length)];//getting random objects from words
   let wordArray = randomObj.word.split("");//splitting each letter of random word
   for(let i = wordArray.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1)); // getting random numbers
     // shuffling and swiping wordArray letters randomly
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
   }
   wordText.innerText = wordArray.join("");// passing shuffled word as word text
   hintText.innerText = randomObj.hint;// passing random objects to class hint
   correctWord = randomObj.word.toLowerCase();//passing random word to correct word
   inputField.value = "";
   inputField.setAttribute("maxlength", correctWord.length);//setting the maxlenth attr value to word length
   //console.log(randomObj);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
   if(!userWord) return alert('Please enter a word check')
    if(userWord !== correctWord)return alert("Oops! that is not a correct word");
   alert("Congrats! that is the correct word"); 
   //console.log(userWord);
   initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);