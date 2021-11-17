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
  {text: "Persevering", color: "red"},
  {text: "A team Player", color: "blue"},
  {text: "Everything you need", color: "purple"}
]

///Header variables
const futureHeader = document.querySelector(".bg-text");
const futureHeaderH1 = futureHeader.childNodes[1];

///Custom cursor variables
const cursor = document.querySelector(".cursor");

///Double arrow variables
const doubleArrowDown = document.querySelector("#double-arrow-down");

///Menu variables
const myName = document.querySelector("#myName");
let menuDiv;
const burgerMenuIcon = document.querySelector("#theRealMenuBurger");
const eachMenuWanted = ["Download my cv", "About me", "My skills", "Experiences", "Projects", "Contact"];
const eachMenuItems = [];
var opened = false;

///Other variables
const allParts = document.querySelector(".allParts");


//CODE ===========================================================================================================
typeWriter();
backgroundStars(500);


window.addEventListener("scroll", function(){
  if (scrollY <= window.innerHeight * 0.1) {//10% de la hauteur
    futureHeader.classList.remove("bg-text-menu");
    futureHeader.classList.add("bg-text");
    futureHeader.style.top = "10%";
    doubleArrowDown.style.opacity = (100 - (window.scrollY)) + "%";
    futureHeader.style.backgroundColor = "rgba(0,0,0, 0.4)";
    futureHeaderWiden();
  } else {
    futureHeader.style.width = "";
    futureHeader.classList.add("bg-text-menu");
    futureHeader.classList.remove("bg-text");
    futureHeader.style.top = scrollY + "px";
    futureHeader.style.backgroundColor = "rgb(0,0,0)";
    doubleArrowDown.style.opacity = "0%";
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
  if (!opened) {
    menuDiv = c("div", myName, "", "menuDiv");
    eachMenuWanted.forEach(element => {
      //Create each menu items
      let menuItem = c("div", menuDiv, "", "menu-item")
      let menuItemHref = c("a", menuItem, element);

      //Set href for each menu items
      if (element == "Download my cv") {
        menuItemHref.setAttribute('href', './assets/Cv_Joyce_WAGNER.pdf');
      } else {
        menuItemHref.setAttribute('href', '#'+element);
      }

      //Smooth scroll
      menuItemHref.addEventListener('click', function (e) {
        e.preventDefault();
        if (menuItemHref.getAttribute('href') == './assets/Cv_Joyce_WAGNER.pdf') {
          window.location.href = "./assets/Cv_Joyce_WAGNER.pdf"
        }
        let element = document.getElementById((menuItemHref.getAttribute('href')).substr(1));
        //creating an anchor to consider menu height while scrolling
        if (scrollY <= window.innerHeight * 0.1) {
          futureHeader.style.width = "";
          futureHeader.classList.add("bg-text-menu");
          futureHeader.classList.remove("bg-text");
        }
        let anchor = c("div", element, "", "anchor");
        anchor.style.top = -1 * futureHeader.clientHeight + "px";


        anchor.scrollIntoView({
          behavior: 'smooth',
        });
        anchor.remove();

      });
      
      //Store each menu items for later use
      eachMenuItems.push(menuItem);
      eachMenuItems.push(menuItemHref);
    });
    burgerMenuIcon.classList.add("toCross");
    burgerMenuIcon.classList.remove("toArrowDown");
    opened = true;
  } else {
    eachMenuItems.forEach(element => {
      element.remove();
    });
    menuDiv.remove();
    burgerMenuIcon.classList.remove("toCross");
    burgerMenuIcon.classList.add("toArrowDown");
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

document.querySelectorAll('href').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
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

function c(tag, parent, text=null, pClass=null, pId=null){
  let element = document.createElement(tag);
  if(text){
      element.appendChild(document.createTextNode(text));
  }
  if(pClass){
      element.classList.add(pClass);
  }
  if(pId){
      element.id = pId;
  }
  parent.appendChild(element)

  return element;
};

function backgroundStars(nb) {
  for (let i = 0; i <= nb; i++){
    setTimeout(() => {
      let star = c('span', allParts, '', 'star', 'star'+Math.ceil(Math.random()*3));
      star.style.left = (Math.random() * allParts.clientWidth) + "px";
      star.style.top = (Math.random() * allParts.clientHeight) + "px";
    }, Math.random()*15000);
  }
}