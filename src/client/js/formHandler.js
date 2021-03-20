/*Global variables*/
// classify the information available in the article, like whether 
// the content is subjective (opinion) or objective (fact-based) 
// and whether it is positive, neutral, or negative in tone.
// let baseURL= 'https://api.openweathermap.org/data/2.5/weather?'
// const apiKey = '0f158dfb22b70b189a48a1e8a09deac0';
// classify the information available in the article, like whether 
// the content is subjective (opinion) or objective (fact-based) 
// and whether it is positive, neutral, or negative in tone.

// import { response } from "express";

// URL is "https://api.meaningcloud.com/sentiment-2.1?key=<your_key>&lang=<lang>&txt=<text>"
let baseURL= "https://api.meaningcloud.com/sentiment-2.1?key="
const apiKey= 'ab99c8a4a3d483a5663a0e11da737703';
// const zip = 77487;
const lang = 'en';
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text').value
    // Client.checkForName(formText)
    let isURL = Client.checkForName(formText)
    if (isURL===true){
        const data = {url:formText}
    fetch('http://localhost:8081/sentiment', {method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)})
    // Do i still need this language here since it has tested for it?
    .then(res => res.json())
    
    .then(function(json) {
        console.log(json.data)
    
        // console.log(res.main.temp)
        let textSentiment = json.data
        let finalSentiment = getResponseText(textSentiment) 
        console.log(finalSentiment)
        // const temp = res.main.temp;
        // console.log(temp)
        // document.getElementById('results').innerHTML = 'The temperature of ' + zip + ' is  ' + temp;
        document.getElementById('results').innerHTML = 'The  sentiment of this text is  ' +finalSentiment;
    })
    }
    else{
        alert('!please enterr a valid URL')
    }
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)
// text is formText
    console.log("::: Form Submitted :::")
    
}
// Get function to interprete the response
function getResponseText(textSentiment){
    switch (textSentiment){
        case 'P+':
            return "strong positive";
            break;
        case 'P':
            return "positive";
            break;
        case 'NEU':
            return "neutral"
            break;
        case 'N':
            return "negative"
            break;
        default:
            return "without sentiment"
    }
    // return finalSentiment
}

        

//     The possible values are the following:

//     P+: strong positive
//     P: positive
//     NEU: neutral
//     N: negative
//     N+: strong negative
//     NONE: without sentiment
    // return getResponseText
// }

  

export { handleSubmit }


