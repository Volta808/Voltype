const paragraphs = [
    "Les éléphants sont les plus grands animaux terrestres, pesant jusqu'à 6 tonnes. Ils possèdent des trompes extrêmement flexibles qui leur permettent de saisir des objets, boire de l'eau et se rafraîchir en utilisant des jets d'eau. Ils ont également de grandes oreilles qui les aident à réguler leur température corporelle.",
    "Les dauphins, réputés pour leur intelligence et leurs compétences sociales, vivent en groupes appelés pods. Ces animaux marins utilisent des vocalisations sophistiquées pour communiquer entre eux. Ils jouent également un rôle crucial dans l'écosystème marin, aidant à maintenir l'équilibre des populations de poissons et autres espèces maritimes.",
    "Les tigres sont les plus grands des félins et sont facilement reconnaissables grâce à leurs rayures uniques. Ces marques leur permettent de se camoufler dans la jungle dense, ce qui les aide à chasser. Ils sont des prédateurs solitaires, chassant principalement la nuit pour capturer leur proie.",
    "Les manchots vivent principalement dans l'hémisphère sud, notamment en Antarctique. Leur démarche maladroite sur la terre ferme contraste avec leur incroyable agilité dans l'eau. Ces oiseaux sont d'excellents nageurs, utilisant leurs ailes comme des nageoires pour se déplacer rapidement et efficacement sous l'eau.",
    "Les koalas, marsupiaux emblématiques d'Australie, passent environ 18 heures par jour à dormir. Leur régime alimentaire se compose principalement de feuilles d'eucalyptus, qu'ils mangent lentement pour en extraire les nutriments. Ils passent également beaucoup de temps dans les arbres, où ils se sentent en sécurité.",
    "Les aigles, avec leur vision exceptionnelle, peuvent repérer des proies à plusieurs kilomètres de distance. Leur acuité visuelle est jusqu'à huit fois supérieure à celle des humains. Ces rapaces sont des chasseurs habiles, utilisant leur vue perçante pour localiser les animaux sur lesquels ils se nourrissent.",
    "Les paresseux passent la plupart de leur vie suspendus aux branches des arbres dans les forêts tropicales. Ils se déplacent très lentement, ce qui leur permet d'économiser de l'énergie. Leur métabolisme est très bas, et ils ne descendent des arbres qu'une fois par semaine pour se nourrir et se soulager.",
    "Les pandas géants se nourrissent presque exclusivement de bambou, qu'ils mâchent pendant jusqu'à 14 heures par jour. Ce régime alimentaire leur fournit les nutriments nécessaires, mais ils doivent consommer de grandes quantités pour répondre à leurs besoins énergétiques. Leur habitat est principalement constitué de forêts de bambou.",
    "Les pieuvres sont des créatures marines dotées de capacités étonnantes, telles que l'utilisation d'outils et le camouflage. Elles peuvent changer la couleur et la texture de leur peau pour se fondre dans leur environnement. Leur intelligence remarquable les aide à résoudre des problèmes complexes et à échapper aux prédateurs.",
    "Les girafes, avec le cou le plus long de tous les animaux terrestres, peuvent atteindre les feuilles des arbres les plus élevés. Leur cou est soutenu par un cœur puissant qui pompe le sang jusqu'à leur tête. Elles utilisent également leur langue longue et préhensile pour saisir les feuilles et les branches.",
    "Linux est un système d'exploitation open-source basé sur le noyau Linux, créé par Linus Torvalds en 1991. Il est utilisé dans une variété d'appareils, des serveurs aux smartphones. Sa nature open-source permet aux utilisateurs de modifier et de distribuer le code source, favorisant une communauté de développeurs active.",
    "Les distributions Linux, ou 'distros', sont des variantes du système d'exploitation Linux adaptées à différents besoins. Parmi les plus populaires, on trouve Ubuntu, Fedora et Debian. Chaque distribution a ses propres caractéristiques, outils et gestionnaires de paquets, offrant aux utilisateurs une grande flexibilité selon leurs préférences et exigences.",
    "Le terminal Linux est un outil puissant permettant aux utilisateurs d'interagir avec le système via des commandes textuelles. Il offre une grande flexibilité pour exécuter des tâches, automatiser des processus et résoudre des problèmes. Les commandes comme 'ls', 'cd' et 'grep' sont des éléments de base pour naviguer et manipuler les fichiers.",
    "Linux est réputé pour sa stabilité et sa sécurité, ce qui en fait un choix populaire pour les serveurs. Le système offre des mécanismes robustes de gestion des utilisateurs et des permissions, ce qui aide à protéger les données et à éviter les accès non autorisés. Les mises à jour régulières renforcent également la sécurité du système.",
    "L'écosystème Linux comprend de nombreux environnements de bureau, comme GNOME, KDE et Xfce, chacun offrant une interface graphique différente. Ces environnements permettent aux utilisateurs de personnaliser leur expérience en fonction de leurs préférences en matière de fonctionnalité et d'esthétique, rendant Linux accessible à tous."

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
        const wordCount = typedText.split(/\s+/).filter(Boolean).length;
        const wordsPerMinute = ((wordCount / timeElapsed) * 60).toFixed(2);
        resultElement.innerHTML = `Bravo ! Vous avez terminé en ${timeElapsed.toFixed(2)} secondes.<br>Vitesse: ${wordsPerMinute} mots/minute.`;
        userInput.disabled = true;
    }

    adjustTextareaHeight(); 
});

const MAX_TIME = 30;

function startTimer() {
    timer = setInterval(() => {
        timeElapsed += 0.1;
        timerElement.innerText = `Temps: ${timeElapsed.toFixed(2)}s`;

        if (timeElapsed >= MAX_TIME) {
            stopTimer();
            const wordCount = userInput.value.split(/\s+/).filter(Boolean).length;
            let wordsPerMinute = ((wordCount / MAX_TIME) * 60).toFixed(2);
            if(!selectedParagraph.includes(userInput.value)){
                wordsPerMinute = 0;
            }
            resultElement.innerHTML = `Temps écoulé : 30 secondes.<br>Vitesse: ${wordsPerMinute} mots/minute.`;
            userInput.disabled = true;
        }
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