//VARIABLES ======================================================================================================
///TypeWritter variables =============================
const typer = document.getElementById("feature-text");
var i = 0;
var k = 0;
var cursorPos = 0;

const skills = [
  {text: "Curious", color: "yellow"},
  {text: "Autonomous", color: "orange"},
  {text: "Demon lord", color: "red"},
  {text: "Team Player", color: "blue"},
  {text: "Everything you need", color: "purple"}
]

///Header Variables
const futureHeader = document.querySelector(".bg-text");
const futureHeaderH1 = futureHeader.childNodes[1];



//CODE ===========================================================================================================
typeWriter();


window.addEventListener("scroll", function(){
  if(window.scrollY <= 66){
    futureHeaderWiden();
  }else{
    futureHeader.style.width = "97.5%";
    futureHeader.style.top = window.scrollY-66 + "px";
    //futureHeaderH1.style.top = "-50px";
  }
});





















//FUNCTIONS ======================================================================================================

function typeWriter() {
  if(k >= skills.length){
    k = 0;
  }
  if(i < skills[k].text.length){ //si on est toujours dans le mot actuel alors on continue à écrire
    typer.style.color = skills[k].color;
    setTimeout(() => {
      typer.innerHTML += skills[k].text.charAt(i);
      i++;
      typeWriter();
    }, 100);
  }else{
    setTimeout(() => { //sinon on passe au mot suivant
      i = 0;
      k++;
      typeDeleter();
    }, 1000);
  }
}

function typeDeleter(){
  cursorPos = typer.innerText.length - 1;
  if(cursorPos >= 0){ //Si il reste des lettres on efface lettre par lettre
    setTimeout(() => {
      typer.innerHTML = typer.innerText.substr(0, cursorPos);
      cursorPos--;
      typeDeleter();
    }, 100);
  }else{ //Sinon on lance typeWritter pour écrire le mot suivant
    typeWriter();
  }
}

function futureHeaderWiden(){ //66 à 100%
  futureHeader.style.width = 80+window.scrollY/66*20 + "%"; //80% de base et on ajoute petit à petit jusqu'a ajouter 20% à 66 de scrollY
}