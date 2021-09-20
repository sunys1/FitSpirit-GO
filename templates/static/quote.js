// Author: Yizhou Sun

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

let apiQuotes = [];

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new quote
function newQuote() {
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    //Check if the author field is blank and replace it with 'Unknown'.
    if (!quote.author){
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }

    //Check quote length to determine the font styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    //Once loading complete, hide loader and dipslay quote.
    quoteText.textContent = quote.text;
    complete();
}

//Gets Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(newQuote());
    } catch (error) {
        //Catch error here
    }
}

//On load
getQuotes();


