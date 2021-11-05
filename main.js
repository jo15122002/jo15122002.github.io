//VARIABLES ======================================================================================================
///TypeWritter variables =============================
const typer = document.getElementById("feature-text");
var i = 0;
var k = 0;
var cursorPos = 0;

const skills = [
  {text: "Happy", color: "green"},
  {text: "Curious", color: "yellow"},
  {text: "Autonomous", color: "orange"},
  {text: "Demon lord", color: "red"},
  {text: "Team Player", color: "blue"},
  {text: "Everything you need", color: "purple"}
]

///Header Variables
const futureHeader = document.querySelector(".bg-text");
const futureHeaderH1 = futureHeader.childNodes[1];

///Custom cursor Variables
const cursor = document.querySelector(".cursor");

///Double arrow variables
const doubleArrowDown = document.querySelector("#double-arrow-down");






//CODE ===========================================================================================================
typeWriter();


window.addEventListener("scroll", function(){
  if(scrollY <= window.innerHeight*(43/941)){
    futureHeader.style.top = "0px";
    doubleArrowDown.style.opacity = (100 - (window.scrollY/(window.innerHeight*(43/941))*100)) + "%";
    futureHeaderWiden();
  }else{
    futureHeader.style.width = ((100 - (3/window.innerWidth)*100)) + "%";
    futureHeader.style.top = window.scrollY - 43 + "px";
  }
});

//Custom Cursor
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX - scrollX + 'px'
  cursor.style.top = e.pageY - scrollY + 'px'
})
///Hide or show the cursor if the mouse is inside or outside the document
document.addEventListener("mouseleave", () =>{
  cursor.style.visibility = "hidden";
})
document.addEventListener("mouseenter", () =>{
  cursor.style.visibility = "visible";
})

















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

function futureHeaderWiden(){ //43 à 100%
  futureHeader.style.width = (80 +(window.scrollY/(window.innerHeight*(43/941)))*20) + "%"; //80% de base et on ajoute petit à petit jusqu'a ajouter 20% à 43 de scrollY
}