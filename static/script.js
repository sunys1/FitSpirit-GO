// Author: Yizhou Sun
showAllCards();

let completion = 0;
let headDiv = document.getElementById("toggle");
let quoteRegion = document.getElementById("quote-container");
quoteRegion.style.display = "none";

// Get the modal
let modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementById("myImg");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");

function filterCards(type){
    let filter, filters, cards;
    //Get the checkbox(in button shape)
    filter = document.getElementById(type);
    filters = document.getElementsByClassName("cardfilter");
    //Get all activity cards
    cards = document.getElementsByClassName("card");

    let filterList = [];
    for(let i = 0; i < filters.length; i++){
        if(filters[i].checked){
            filterList.push(filters[i].id);
        }
    }

    if(filter.checked == true){
        showCardsFiltered(filterList);
    }else if(filter.checked == false){
        if(filterList.length > 0){
            showCardsFiltered(filterList);
        }else{
            //If all the filters are unchecked, show all cards
            showAllCards();
        }
    }
}

function showCardsFiltered(filterList){
    let cards = document.getElementsByClassName("card");
    
    for(let i = 0; i < filterList.length; i++){
        //show all cards with filter keywords in the argument
        for(let j = 0; j < cards.length; j++){
            removeClass(cards[j], "show");
            if(cards[j].className.indexOf(filterList[i]) > -1){
                addClass(cards[j], "show");
                
            }
            
        }
    }
}

function showAllCards(){
    let filters, cards;
    cards = document.getElementsByClassName("card");

    for(let j = 0; j < cards.length; j++){
        addClass(cards[j], "show");
    }
}

function hideAllCards(){
    let filters, cards;
    cards = document.getElementsByClassName("card");

    for(let j = 0; j < cards.length; j++){
        removeClass(cards[j], "show");
    }
}

function removeClass(element, name){
    let i, classes;
    classes = element.className.split(" ");
    if (classes.indexOf(name) > -1){
        classes.splice(classes.indexOf(name), 1);
    }

    element.className = classes.join(" ");
}

function addClass(element, name){
    let classes = element.className.split(" ");
    if (classes.indexOf(name) == -1){
        element.className += " " + name;
    }
}

//Generate unique css id
function genID(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addID(element){
    let newID = genID();
    if(!element.id){
        element.id = newID;
    }
}

function triggerActivity(btnPressed){
    //Get parent card id
    let parentID, card;
    card = btnPressed.parentNode.parentNode;
    parentID = card.id;
    
    if(card.className.indexOf("ongoing") == -1){
        //if the activity is not active, we set a new active session
        if(!parentID){
            addID(card);
            parentID = card.id;
        }
        //Onclick "start" button, display the current card only
        hideAllCards();
        addClass(card, "show");
        addClass(card, "ongoing");

        btnPressed.innerHTML = `Session ${completion + 1} started. Press to finish.`
        changeColor(btnPressed);

        //toggle off the header and show insprational quotes
        let headDiv = document.getElementById("toggle");
        headDiv.style.display = "none"; 
        quoteRegion.style.display = "block";

    }else {
        //if the activity is onging, on 2nd click we show the modal iamge, finish it and set it back to the original state.
        btnPressed.onclick = function(){
            modal.style.display = "block";
            modalImg.src = img.src.substr(img.src.indexOf('assets'));
            captionText.innerHTML = img.alt;
          }
          
          // Get the <span> element that closes the modal
          let span = document.getElementsByClassName("close")[0];
          
          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
            modal.style.display = "none";
            removeClass(card, "ongoing");
            btnPressed.innerHTML = "Start a new session"
            btnPressed.style.background = "#3b1bff";
            headDiv.style.display = "block"; 
            quoteRegion.style.display = "none"; 
            showAllCards();
          }
        
    }

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function getRandomGradient() {
        return 'linear-gradient('+(Math.random()*360)+'deg, '+getRandomColor()+' 0%, '+getRandomColor()+' 100%)';
    }
    
    function changeColor(element) {
        element.style.background = getRandomGradient();
    }

}