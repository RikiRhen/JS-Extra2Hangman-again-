const secretWordList = [
    `VARIABLE`,
    `CONSTANT`,
    `CONTAINER`,
    `CATASTROPHY`,
    `TEST`,
    `STRATAGEM`
];

//Event listener to make sure the DOM content is properly loaded before starting to manipulate it.
document.addEventListener(`DOMContentLoaded`, () => {
    //Body
    let selector = document.querySelector(`body`);
    selector.setAttribute("style", "background-color: darkgray;");
    selector.style.display = `flex`;
    selector.style.justifyContent = `space-evenly`;

    //Divs
    const guessContainer = document.createElement(`div`)
    guessContainer.id = `guess-container`;
    const inputContainer = document.createElement(`div`)
    inputContainer.id = `input-container`;
    const headlineContainer = document.createElement(`div`)
    headlineContainer.id = `headline-container`;
    const hangmanContainer = document.createElement(`div`);
    hangmanContainer.id = `hangman-container`;
    const wordContainer = document.createElement(`div`);
    wordContainer.id = `word-container`;

    selector.insertAdjacentElement(`afterBegin`, guessContainer)
    selector.insertAdjacentElement(`afterBegin`, hangmanContainer);
    guessContainer.insertAdjacentElement(`afterBegin`, inputContainer)
    guessContainer.insertAdjacentElement(`afterBegin`, wordContainer);
    guessContainer.insertAdjacentElement(`afterBegin`, headlineContainer)

    //Hangman SVG-object
    selector = document.querySelector(`#hangman-container`)
    const hangman = document.createElement(`object`);
    hangman.id = "hangman-svg";
    hangman.type = "image/svg+xml";
    hangman.setAttribute(`data`, `hangman.svg`);
    selector.insertAdjacentElement(`afterBegin`, hangman);

    //Guess input
    const guess = document.createElement(`input`);
    guess.classList.add(`guess-input`);
    guess.placeholder = "Make a guess";

    //Submit button
    const submit = document.createElement(`button`);
    submit.innerText = `Guess`;
    submit.classList.add(`submit`)
    submit.style.maxWidth = `fit-content`;

    //Headline
    const headline = document.createElement(`h1`);
    headline.style.fontFamily = "Verdana";
    headline.innerText = `Hangman`;
    headline.classList.add(`headline`);

    //Secret word
    const word = document.createElement(`h2`);
    word.style.fontFamily = `Verdana`;
    word.style.letterSpacing = `15px`;
    word.innerText = secretWordList[Math.floor(Math.random() * secretWordList.length)]
    //console.log(word.innerText);  //Cheater...
    word.classList.add(`secret-word`)

    //Guess-container styling
    selector = document.querySelector(`#guess-container`);
    selector.style.display = `flex`;
    selector.style.justifyContent = `space-evenly`;
    selector.style.alignItems = `center`;
    selector.style.flexDirection = `column`;

    //Add elements to guess-container;
    inputContainer.insertAdjacentElement(`afterBegin`, submit);
    inputContainer.insertAdjacentElement(`afterBegin`, guess);
    headlineContainer.insertAdjacentElement(`afterBegin`, headline);
    wordContainer.insertAdjacentElement(`afterBegin`, word);


    //Event listener to make sure that the SVG object is properly loaded before attempting to manipulate it.
    hangman.addEventListener('load', () => {
        const svgObj = document.querySelector(`#hangman-svg`);
        const svg = svgObj.contentDocument;

        /*
        svg.querySelector(`#scaffold`).style.opacity = 0;
        svg.querySelector(`#head`).style.opacity = 0;
        svg.querySelector(`#body`).style.opacity = 0;
        svg.querySelector(`#arms`).style.opacity = 0;
        svg.querySelector(`#legs`).style.opacity = 0;
        svg.querySelector(`#ground`).style.opacity = 0;
        */


    });

    function anonymize(string) {
        let result = ``;
        for (let i = 0; i < string.length; i++) {
            result += `_`;
        }
        return result;
    }

    const anonymizedWord = anonymize(word.innerText);
    word.innerText = anonymizedWord;






    console.log(selector);
})

