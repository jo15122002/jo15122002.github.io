const typer = document.getElementById("feature-text");
var i = 0;
var k = 0;
var cursorPos = 0;

const skills = [
  {text: "Curious", color: "yellow"},
  {text: "Autonomous", color: "orange"},
  {text: "Demon lord", color: "red"},
  {text: "Everything you need", color: "purple"}
]

typeWriter();



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
  if(cursorPos >= 0){
    setTimeout(() => {
      typer.innerHTML = typer.innerText.substr(0, cursorPos);
      cursorPos--;
      typeDeleter();
    }, 100);
  }else{
    typeWriter();
  }
}