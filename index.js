/*const secretWordList = [
    `VARIABLE`,
    `CONSTANT`,
    `CONTAINER`,
    `CATASTROPHY`,
    `TEST`,
    `STRATAGEM`
];*/
const secretWordList = [
    `TEST`
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

    //Guess form
    const form = document.createElement(`form`);
    form.autocomplete = `off`;

    //Guess input
    const guess = document.createElement(`input`);
    guess.id = `guess-input`;
    guess.classList.add(`guess-input`);
    guess.placeholder = "Make a guess";

    //Submit button
    const submit = document.createElement(`button`);
    submit.innerText = `Guess`;
    submit.type = `submit`;
    submit.classList.add(`submit`)
    submit.style.maxWidth = `fit-content`;

    //Headline
    const headline = document.createElement(`h1`);
    headline.style.fontFamily = "Verdana";
    headline.innerText = `Hangman`;
    headline.classList.add(`headline`);

    //Secret word
    let word = document.createElement(`h2`);
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
    inputContainer.insertAdjacentElement(`afterBegin`, form);
    form.insertAdjacentElement(`afterBegin`, submit);
    form.insertAdjacentElement(`afterBegin`, guess);
    headlineContainer.insertAdjacentElement(`afterBegin`, headline);
    wordContainer.insertAdjacentElement(`afterBegin`, word);

    const secretWord = word.innerText;
    const anonymizedWord = anonymize(word.innerText);
    word.innerText = anonymizedWord;


    //Event listener to make sure that the SVG object is properly loaded before attempting to manipulate it.
    hangman.addEventListener('load', () => {
        let triesLeft = 6;
        const svgObj = document.querySelector(`#hangman-svg`);
        const svg = svgObj.contentDocument;

        svg.querySelector(`#scaffold`).style.opacity = 0;
        svg.querySelector(`#head`).style.opacity = 0;
        svg.querySelector(`#body`).style.opacity = 0;
        svg.querySelector(`#arms`).style.opacity = 0;
        svg.querySelector(`#legs`).style.opacity = 0;
        svg.querySelector(`#ground`).style.opacity = 0;


        document.addEventListener(`submit`, (event) => {
            event.preventDefault();

            let guessedLetter = document.querySelector(`#guess-input`).value.toUpperCase();

            //Correctly guessed letter
            if (secretWord.includes(guessedLetter)) {
                const indexes = findEachIndex(secretWord, guessedLetter);
                let finalWord = word.innerText.split('');

                indexes.forEach(index => {
                    finalWord[index] = guessedLetter;
                });

                word.innerText = finalWord.join(``);
            }
            //Incorrectly guessed letter
            else if (!secretWord.includes(guessedLetter)) {
                triesLeft--;
                console.log(triesLeft);
                updateHangman(triesLeft);
            }

            console.log(guessedLetter);
            form.reset();
        })


    });

    function anonymize(string) {
        let result = ``;
        for (let i = 0; i < string.length; i++) {
            result += `_`;
        }
        return result;
    }

    function findEachIndex(string, letter) {
        let result = [];
        for (let i = 0; i < string.length; i++) {
            if (string[i] === letter) {
                result.push(i);
            }
        }
        return result;
    }

    function updateHangman(triesLeft) {
        const svgObj = document.querySelector(`#hangman-svg`);
        const svg = svgObj.contentDocument;

        switch (triesLeft) {
            case 6:
                svg.querySelector(`#scaffold`).style.opacity = 0;
                svg.querySelector(`#head`).style.opacity = 0;
                svg.querySelector(`#body`).style.opacity = 0;
                svg.querySelector(`#arms`).style.opacity = 0;
                svg.querySelector(`#legs`).style.opacity = 0;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 5:
                svg.querySelector(`#scaffold`).style.opacity = 1;
                svg.querySelector(`#head`).style.opacity = 0;
                svg.querySelector(`#body`).style.opacity = 0;
                svg.querySelector(`#arms`).style.opacity = 0;
                svg.querySelector(`#legs`).style.opacity = 0;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 4:
                svg.querySelector(`#head`).style.opacity = 1;
                svg.querySelector(`#body`).style.opacity = 0;
                svg.querySelector(`#arms`).style.opacity = 0;
                svg.querySelector(`#legs`).style.opacity = 0;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 3:
                svg.querySelector(`#body`).style.opacity = 1;
                svg.querySelector(`#arms`).style.opacity = 0;
                svg.querySelector(`#legs`).style.opacity = 0;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 2:
                svg.querySelector(`#arms`).style.opacity = 1;
                svg.querySelector(`#legs`).style.opacity = 0;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 1:
                svg.querySelector(`#legs`).style.opacity = 1;
                svg.querySelector(`#ground`).style.opacity = 0;
                break;
            case 0:
                svg.querySelector(`#ground`).style.opacity = 1;
                break;
            default:
                break;
        }
    }

})

