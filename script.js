const words = [
    { text: "כראמל", group: 1 },
    { text: "גארפילד", group: 1 },
    { text: "חתולתעלול", group: 1 },
    { text: "מיצי", group: 1 },
    { text: "אדםצעיר", group: 2 },
    { text: "עיניים", group: 2 },
    { text: "אצבעוני", group: 2 },
    { text: "בראששלברוש", group: 2 },
    { text: "שוקולד", group: 3 },
    { text: "קפה", group: 3 },
    { text: "אמא", group: 3 },
    { text: "מיטה", group: 3 },
    { text: "ג'ף", group: 4 },
    { text: "עיזה", group: 4 },
    { text: "ג'ימבו", group: 4 },
    { text: "מנגו", group: 4 }
];

const groups = {
    1: "חתולים",
    2: "כתבי עת לילדים",
    3: "דברים שאבא לא חולק בהם",
    4: "כלבים שחיו אצלנו בחצר"
};

let selectedWords = [];
let correctSelections = 0;

const wordContainer = document.getElementById('word-container');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

// Shuffle words
words.sort(() => Math.random() - 0.5);

// Render words
words.forEach(word => {
    const button = document.createElement('button');
    button.innerText = word.text;
    button.classList.add('word');
    button.addEventListener('click', () => selectWord(word, button));
    wordContainer.appendChild(button);
});

function selectWord(word, button) {
    if (selectedWords.includes(word)) return;

    selectedWords.push({ word, button });
    button.style.backgroundColor = '#28a745'; // Change color to green when selected

    if (selectedWords.length === 4) {
        checkSelection();
    }
}

function checkSelection() {
    const firstGroup = selectedWords[0].word.group;
    const allSameGroup = selectedWords.every(({ word }) => word.group === firstGroup);

    if (allSameGroup) {
        messageElement.innerText = `נכון! הקשר הוא: ${groups[firstGroup]}`;
        correctSelections++;
        selectedWords.forEach(({ button }) => {
            button.style.backgroundColor = '#FFD700'; // Change color to gold when correct
            button.disabled = true; // Disable the button
        });

        // Move correct words to a new line
        const correctLine = document.createElement('div');
        correctLine.classList.add('correct-line');
        selectedWords.forEach(({ button }) => correctLine.appendChild(button));
        wordContainer.appendChild(correctLine);
    } else {
        messageElement.innerText = 'לא נכון, נסה שוב!';
    }

    if (correctSelections === 4) {
        messageElement.innerText = 'כל הכבוד! מצאת את כל הקשרים!';
        restartButton.style.display = 'block';
    }

    selectedWords = [];
    wordContainer.querySelectorAll('.word').forEach(button => {
        if (!button.disabled) {
            button.style.backgroundColor = '#007bff'; // Reset button colors for non-disabled buttons
        }
    });
}

restartButton.addEventListener('click', () => {
    window.location.reload();
});
