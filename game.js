let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')

// when the page loads, select an element at random from the countriesAndCodes array
// This array is defined in the countries.js file. Your browser treats all
// JavaScript files as one big file, organized in the order of the script tags
// so countriesAndCodes is available to this file
//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available

function getRandomIndex(max) {
  return Math.floor(Math.random() * max)
}
// display the country's name in the randomCountryElement
var countryInfo = countriesAndCodes[getRandomIndex(countriesAndCodes.length)];
randomCountryElement.innerHTML = countryInfo.name;
console.log(countryInfo);

// add a click event handler to the submitButton.
// When the user clicks the button,
// Extract the capital city from the World Bank API response
// Compare it to the user's answer.
submitButton.addEventListener("click", function() {
  // read the text from the userAnswerElement
  var code = countryInfo["alpha-2"];
  var capital = '';
  // Use fetch() to make a call to the World Bank API with the country code (from countriesAndCodes)
  let url = `http://api.worldbank.org/v2/country/${code}?format=json`
  fetch(url).then( (response) => {
    // response contains JSON as a string
    // response.json() returns a promise, handled in next then block
    return response.json()
  }).then( (data) => {
    // data is a JS object
    // the resolved result of response.json()
    //console.log(data);
    capital = data[1][0]['capitalCity']
    console.log("Capital: " + capital);
    let userAnswer = userAnswerElement.value
    var msg = ''
    msg += `The capital of ${countryInfo.name} is ${capital}<br>`;
    console.log(msg);
    msg += `Your answer is ${userAnswer}<br>`;
    if (capital.toLowerCase() === userAnswer.toLowerCase()){
      msg += 'You are correct!';
    } else {
      msg += 'Sorry, your answer is incorrect!';
    }
    console.log(msg);
    resultTextElement.innerHTML = msg;
  }).catch( (error) => {
    // promise is rejected if error occurs
    console.log('Error!', error);
  })
})
//      You can decide how correct you require the user to be. A basic solution requires
//      the user's answer to be exactly the same as the World Bank answer. If you want
//      to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Display an appropriate result in the resultTextElement.
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"
playAgainButton.addEventListener("click", function() {
  // clear fields
  resultTextElement.innerHTML = '';
  userAnswerElement.value = '';
  // display the country's name in the randomCountryElement
  countryInfo = countriesAndCodes[getRandomIndex(countriesAndCodes.length)];
  randomCountryElement.innerHTML = countryInfo.name;
  console.log(countryInfo);
})
