
// let baseURL= "https://api.meaningcloud.com/sentiment-2.1?key="
// const apiKey= 'ab99c8a4a3d483a5663a0e11da737703';
// // const zip = 77487;
// const lang = 'en';
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

    .then(res => res.json())
    
    .then(function(json) {
        console.log(json.data)
        let textSentiment = json.data
        let finalSentiment = getResponseText(textSentiment) 
        console.log(finalSentiment)
        
        document.getElementById('results').innerHTML = 'The  sentiment of this text is  ' +finalSentiment;
    })
    }
    else{
        alert('!please enter a valid URL')
    }
    
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
   
}

  

export { handleSubmit }


