const readLine = require("readline-sync");

const words = ['javascript', 'jest', 'przecietnie', 'przyjaznym', 'jezykiem', 'programowania', 'czesto', 'dziala', 'nieintuicyjnie'];
const word = [...selectRandomWordToGuess()];
let hiddenWord = Array.from('_'.repeat(word.length));

function selectRandomWordToGuess() {
  return words[Math.floor(Math.random() * words.length)].toLocaleUpperCase();
};

function askForLetter() {
  let isLetterCorrect = false;
  let letter = '';

  do {
    letter = readLine.question(`\nProsze podac litere: `).toUpperCase();

    if (hiddenWord.includes(letter)) {
      console.log('Była! Podaj inną.');
    } else if (/^[A-Z]$/.test(letter)) {
      isLetterCorrect = true;
    } else if (letter.length > 1) {
      console.log('LITERĘ, jedną, proszę.');
    } else {
      console.log('LITERĘ, proszę o literę.');
    }
  } while (isLetterCorrect == false)
  console.log(`Podano literę: ${letter}\n`);
  return letter;
};

function checkIfLetterMatch(letterToCheck) {
  let letterMatched = false;

  word.forEach((letter, i) => {
    if (letter === letterToCheck) {
      hiddenWord[i] = letterToCheck;
      letterMatched = true;
    };
  });

  return letterMatched;
};

function checkIfGameIsWon() {
  return hiddenWord.includes('_') ? false : true
};

function startTheGame(attempts) {
  console.log(`Cześć! Zagrajmy w wisielca, masz ${attempts} prób, aby odgadnąć poniższe słowo.`);
  console.log('PS. Dla ułatwienia nie stostujemy poslkich znaków diakrytycznych.\n');

  do {
    console.log(`Odgadywane słowo: ${hiddenWord.join(' ')}\nPozostała ilość prób: ${attempts}`);

    const letter = askForLetter();

    checkIfLetterMatch(letter) ? console.log(`Brawo, litera ${letter} pasuje!`) : attempts--;

    if (checkIfGameIsWon()) return console.log(`WYGRAŁEŚ! GRATULACE! POZOSTAŁY CI JESZCZE ${attempts} PRÓBY.`);
  } while (attempts > 0);

  return console.log(`TWOJE SZANSE SIĘ SKOŃCZYŁY. PRZEGRAŁEŚ, NOOBIE. Poszukiwane słowo to ${word.join('')}`);
};

startTheGame(6);
