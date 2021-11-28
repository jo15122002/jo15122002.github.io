//VARIABLES ======================================================================================================
///TypeWritter variables =============================
const typer = document.getElementById("feature-text");
let i = 0;
let k = 0;
let cursorPos = 0;

const traits = [
  {text: "Happy", color: "green"},
  {text: "Curious", color: "yellow"},
  {text: "Autonomous", color: "orange"},
  {text: "Persevering", color: "red"},
  {text: "A team Player", color: "blue"},
  {text: "Everything you need", color: "purple"},
  {text: "Looking for an internship :)", color: "#CF7CA9"},
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
let menuDiv = null;
const burgerMenuIcon = document.querySelector("#theRealMenuBurger");
const eachMenuWanted = ["Download my cv", "About me", "My skills", "Experiences", "Projects", "References", "Contact"];
const eachMenuItems = [];
let menuOpened = false;

///Skills variables
const skills = document.querySelectorAll(".round");
const categoryContainers = document.querySelectorAll(".categoryContainer");

///Projects variables
const projectBubbles = document.querySelectorAll(".projectBubble");
let projectBubbleOpened = false;


///Other variables
const allParts = document.querySelector(".allParts");

///Contact form variables
const form = document.querySelector("#Contact form"),
statusTxt = form.querySelector(".button-area span");



//CODE ===========================================================================================================
window.scrollTo(0,0);
typeWriter();
backgroundBubbles(50);


window.addEventListener("scroll", function(){
  if (scrollY <= window.innerHeight * 0.1) {//10% of the height
    futureHeader.classList.remove("bg-text-menu");
    futureHeader.classList.add("bg-text");
    futureHeader.style.top = "";
    doubleArrowDown.style.opacity = (100 - (window.scrollY)) + "%";
    futureHeader.style.backgroundColor = "rgba(0,0,0, 0.4)";
    futureHeaderWiden();
  } else {
    futureHeader.style.width = "";
    futureHeader.classList.add("bg-text-menu");
    futureHeader.classList.remove("bg-text");
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
  if (!menuOpened) {
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
    menuOpened = true;
  } else {
    eachMenuItems.forEach(element => {
      element.remove();
    });
    menuDiv.remove();
    burgerMenuIcon.classList.remove("toCross");
    burgerMenuIcon.classList.add("toArrowDown");
    menuOpened = false;
  }
});

burgerMenuIcon.addEventListener("mouseover", () => {
  if (!menuOpened) {
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

//Projects bubbles
projectBubbles.forEach(element => {
  element.addEventListener("click", () => {
    if (!projectBubbleOpened) {
      element.classList.add("projectFullscreen");
      element.classList.remove("projectBubble");
      element.style.height = (window.innerHeight - myName.clientHeight) + "px";
      projectBubbleOpened = true;
    }else{
      element.classList.remove("projectFullscreen");
      element.classList.add("projectBubble");
      element.style.height = "";
      projectBubbleOpened = false;
    }
  });
});

//Test if element is in viewPort or not
let observer = new IntersectionObserver(handler);
categoryContainers.forEach(element => {
  observer.observe(element);
});









//FUNCTIONS ======================================================================================================

function typeWriter() {
  if(k >= traits.length){
    k = 0;
  }
  if(i < traits[k].text.length){ //si on est toujours dans le mot actuel alors on continue à écrire
    typer.style.color = traits[k].color;
    setTimeout(() => {
      typer.innerHTML += traits[k].text.charAt(i);
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

function backgroundBubbles(nb) {
  for (let i = 0; i <= nb; i++){
    setTimeout(() => {
      let bubble = c('span', allParts, '', 'bubble', 'bubble'+Math.ceil(Math.random()*3));
      bubble.style.left = (Math.random() * allParts.clientWidth) + "px";
    }, Math.random()*15000);
  }
}


//Fonctions réucépérées sur internet
function Circlle(el, color) {
  if ($(el).attr('id') == "french") {
    $(el).circleProgress({ fill: { image: "./images/france-min.png" } })
      .on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(String((stepValue.toFixed(3)*100).toFixed(0)) + '%');
      });
  } else if($(el).attr('id') == "english") {
    $(el).circleProgress({ fill: { image: "./images/english-min.png" } })
      .on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
      });
  } else if($(el).attr('id') == "german") {
    $(el).circleProgress({ fill: { image: "./images/german-min.jpg" } })
      .on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
      });
  }else {$(el).circleProgress({fill: {color: '#ff5c5c'}})
      .on('circle-animation-progress', function(event, progress, stepValue){
    $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
   });
  }
};

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//Handler for observer
function handler(entries, observer) {
  entries.forEach(element => {
    element.target.querySelectorAll(".round").forEach(element => {
      Circlle(element);
    });
  });
}













//WIP ============================================================================================================
///Contact Form in PHP
form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  form.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
     // statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}
