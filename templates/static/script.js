showAllCards();

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

function removeClass(element, name){
    let i, classes;
    classes = element.className.split(" ");
    if (classes.indexOf(name) > -1){
        classes.splice(classes.indexOf(name), 1);
    }

    element.className = classes.join(" ");
}

function addClass(element, name){
    let i, classes;
    classes = element.className.split(" ");
    if (classes.indexOf(name) == -1){
        element.className += " " + name;
    }
}