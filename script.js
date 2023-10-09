
const firebaseConfig = {
    apiKey: "AIzaSyAYl2TvYWKnf6q1dSq04i6e-K4gFt3HGr8",
  authDomain: "adv97-3b20a.firebaseapp.com",
  databaseURL: "https://adv97-3b20a-default-rtdb.firebaseio.com",
  projectId: "adv97-3b20a",
  storageBucket: "adv97-3b20a.appspot.com",
  messagingSenderId: "988979205423",
  appId: "1:988979205423:web:6c26e8c8b16447b7363dda"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const secretNumber = Math.floor(Math.random() * 100) + 1;

const guessesRef = database.ref('guesses');

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.querySelector('.message');

guessButton.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Enter a valid number between 1 and 100.';
    } else {
        guessesRef.push(userGuess);

        if (userGuess === secretNumber) {
            message.textContent = 'Congratulations! You guessed the correct number.';
        } else if (userGuess < secretNumber) {
            message.textContent = 'Try a higher number.';
        } else {
            message.textContent = 'Try a lower number.';
        }

        guessInput.value = '';
    }
});

guessesRef.on('child_added', (snapshot) => {
    const guess = snapshot.val();
    console.log(`New guess: ${guess}`);
});
