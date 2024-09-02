const paragraphs = [
    "Les éléphants sont les plus grands animaux terrestres et possèdent des trompes très flexibles utilisées pour saisir des objets, boire de l'eau et se rafraîchir.",
    "Les dauphins sont connus pour leur intelligence et leurs compétences sociales. Ils vivent souvent en groupes appelés pods.",
    "Les tigres sont les plus grands des félins, avec des rayures uniques sur leur pelage qui les aident à se camoufler dans la jungle.",
    "Les manchots vivent principalement dans l'hémisphère sud et sont connus pour leur démarche maladroite sur la terre mais sont d'excellents nageurs.",
    "Les koalas sont des marsupiaux d'Australie qui dorment environ 18 heures par jour et se nourrissent principalement de feuilles d'eucalyptus.",
    "Les aigles ont une vision exceptionnelle, leur permettant de repérer des proies à plusieurs kilomètres de distance.",
    "Les paresseux passent la plupart de leur vie suspendus aux branches des arbres et se déplacent très lentement pour économiser de l'énergie.",
    "Les pandas géants se nourrissent presque exclusivement de bambou et passent jusqu'à 14 heures par jour à le mâcher.",
    "Les pieuvres sont des créatures très intelligentes avec des capacités étonnantes, comme l'utilisation d'outils et le camouflage.",
    "Les girafes ont le cou le plus long de tous les animaux terrestres, ce qui leur permet d'atteindre les feuilles des arbres les plus hauts."
];

const textElement = document.getElementById("text-to-type");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let selectedParagraph = "";
let timer;
let timeElapsed = 0;
let isTimerRunning = false;


function selectRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
}


function initializeGame() {
    selectedParagraph = selectRandomParagraph();
    textElement.innerText = selectedParagraph;
    userInput.value = "";
    userInput.disabled = false;
    resultElement.innerText = "";
    timerElement.innerText = "Temps: 0.00s";
    timeElapsed = 0;
    isTimerRunning = false;
    clearInterval(timer);
    adjustTextareaHeight();
}

userInput.addEventListener("input", () => {
    const typedText = userInput.value;

    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
    }

    let displayText = "";
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === selectedParagraph[i]) {
            displayText += `<span class="correct">${typedText[i]}</span>`;
        } else {
            displayText += `<span class="incorrect">${typedText[i]}</span>`;
        }
    }

    displayText += `<span class="gray">${selectedParagraph.substring(typedText.length)}</span>`;
    textElement.innerHTML = displayText;

    if (typedText === selectedParagraph) {
        stopTimer();
        const wordCount = selectedParagraph.split(' ').length;
        const wordsPerMinute = ((wordCount / timeElapsed) * 60).toFixed(2);
        resultElement.innerHTML = `Bravo ! Vous avez terminé en ${timeElapsed.toFixed(2)} secondes.<br>Vitesse: ${wordsPerMinute} mots/minute.`;
        userInput.disabled = true;
    }

    adjustTextareaHeight(); 
});

function startTimer() {
    timer = setInterval(() => {
        timeElapsed += 0.1;
        timerElement.innerText = `Temps: ${timeElapsed.toFixed(2)}s`;
    }, 100);
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function adjustTextareaHeight() {
    userInput.style.height = 'auto'; 
    userInput.style.height = `${userInput.scrollHeight}px`;
}

restartButton.addEventListener("click", initializeGame);

initializeGame();
