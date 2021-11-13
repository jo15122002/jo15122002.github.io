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

///Header variables
const futureHeader = document.querySelector(".bg-text");
const futureHeaderH1 = futureHeader.childNodes[1];

///Custom cursor variables
const cursor = document.querySelector(".cursor");

///Double arrow variables
const doubleArrowDown = document.querySelector("#double-arrow-down");

///Menu variable
const myName = document.querySelector("#myName");
const burgerMenuIcon = document.querySelector("#theRealMenuBurger");
const eachMenuWanted = ["Download my cv", "About me", "My skills"]
const eachMenuItems = [];
var opened = false;




//CODE ===========================================================================================================
typeWriter();


window.addEventListener("scroll", function(){
  if (scrollY <= window.innerHeight * 0.1) {//10% de la hauteur
    futureHeader.classList.remove("bg-text-menu");
    futureHeader.classList.add("bg-text");
    futureHeader.style.top = "10%";
    doubleArrowDown.style.opacity = (100 - (window.scrollY/(window.innerHeight*(43/941))*100)) + "%";
    futureHeader.style.backgroundColor = "rgba(0,0,0, 0.4)";
    futureHeaderWiden();
  } else {
    futureHeader.style.width = "";
    futureHeader.classList.add("bg-text-menu");
    futureHeader.classList.remove("bg-text");
    
    futureHeader.style.top = scrollY + "px";
    futureHeader.style.backgroundColor = "rgb(0,0,0)";
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

//Burger menu
burgerMenuIcon.addEventListener("click", () =>{
  if(!opened){
    eachMenuWanted.forEach(element => {
      eachMenuItems.push(c("div", myName, element, "menu-item"));
      burgerMenuIcon.classList.add("toCross");
      burgerMenuIcon.classList.remove("toArrowDown");
    });
    opened = true;
  }else{
    eachMenuItems.forEach(element => {
      element.remove();
    });
    burgerMenuIcon.classList.remove("toCross");
    opened = false;
  }
});

burgerMenuIcon.addEventListener("mouseover", () => {
  if (!opened) {
    burgerMenuIcon.classList.add("toArrowDown");
  }
});

burgerMenuIcon.addEventListener("mouseleave", () => {
  burgerMenuIcon.classList.remove("toArrowDown");
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

function futureHeaderWiden(){ //10% de la hauteur en scroll à 100% de largeur
  futureHeader.style.width = (80 + scrollY/window.innerHeight*100*2) + "%"; //80% de base et on ajoute petit à petit jusqu'a ajouter 20% à 43 de scrollY
}

function c(tag, parent, text=null, classs=null, pId=null){
  let element = document.createElement(tag);
  if(text){
      element.appendChild(document.createTextNode(text));
  }
  if(classs){
      element.classList.add(classs);
  }
  if(pId){
      element.id = pId;
  }
  parent.appendChild(element)

  return element;
};