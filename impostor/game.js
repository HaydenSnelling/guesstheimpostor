const categoriesData = {
    "categories": {
        "Animals": [
            "Elephant", "Giraffe", "Penguin", "Kangaroo", "Lion",
            "Tiger", "Bear", "Zebra", "Gorilla", "Panda",
            "Hippopotamus", "Rhinoceros", "Cheetah", "Sloth", "Otter",
            "Wolf", "Fox", "Eagle", "Dolphin", "Whale",
            "Seal", "Moose", "Bison", "Squirrel", "Bat",
            "Koala", "Hyena", "Lemur", "Wombat", "Capybara"
        ],
        "Famous People": [
            "Elon Musk", "Bill Gates", "Jeff Bezos", "Mark Zuckerberg", "Taylor Swift",
            "Kanye West", "Rihanna", "Ariana Grande", "Zendaya", "Chris Hemsworth",
            "Robert Downey Jr.", "Scarlett Johansson", "Ryan Reynolds", "Jennifer Lawrence", "Shawn Mendes",
            "Drake", "Kylie Jenner", "Justin Bieber", "Emma Watson", "Gordon Ramsay",
            "Keanu Reeves", "Dwayne Johnson", "Miley Cyrus", "Bruno Mars", "Lady Gaga"
        ],
        "Countries": [
            "France", "Japan", "Brazil", "Australia", "Canada",
            "Italy", "Germany", "South Africa", "India", "Russia",
            "China", "Mexico", "United Kingdom", "Argentina", "Egypt"
        ],
        "Movies": [
            "Inception", "The Matrix", "The Godfather", "Titanic", "Pulp Fiction",
            "The Shawshank Redemption", "The Dark Knight", "Forrest Gump", "Fight Club", "Gladiator",
            "Interstellar", "The Lord of the Rings", "Parasite", "The Silence of the Lambs", "Casablanca"
        ],
        "Books": [
            "1984", "To Kill a Mockingbird", "Pride and Prejudice", "The Catcher in the Rye", "Moby Dick",
            "The Great Gatsby", "War and Peace", "The Hobbit", "Brave New World", "Jane Eyre",
            "Crime and Punishment", "Catch-22", "Fahrenheit 451", "The Odyssey", "Les Misérables"
        ],
        "Music": [
            "Beethoven Symphony No. 9", "Mozart's Requiem", "Bach's Brandenburg Concertos", "The Beatles' Abbey Road", "Michael Jackson's Thriller",
            "Pink Floyd's Dark Side of the Moon", "Nirvana's Nevermind", "Queen's A Night at the Opera", "Miles Davis' Kind of Blue", "Beyoncé's Lemonade",
            "Madonna's Like a Virgin", "David Bowie's The Rise and Fall of Ziggy Stardust", "Elvis Presley's Elvis Presley's Christmas Album", "Adele's 21", "Taylor Swift's 1989"
        ],
        "Sports": [
            "Soccer", "Basketball", "Tennis", "Cricket", "Baseball",
            "Hockey", "Rugby", "Golf", "Swimming", "Track and Field",
            "Volleyball", "Boxing", "MMA", "Cycling", "Skiing",
            "Figure Skating", "Wrestling", "Badminton", "Rowing", "Sailing"
        ]
    }
};

let playerCount = 3;
let currentPlayer = 1;
let selectedWord = '';
let selectedCategory = '';
let revealedPlayers = [];

document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const playerScreen = document.getElementById('player-screen');
    const playerInstruction = document.getElementById('player-instruction');
    const revealWordButton = document.getElementById('reveal-word');
    const playerCountSpan = document.getElementById('player-count');
    const categoriesDiv = document.getElementById('categories');
    const increasePlayersButton = document.getElementById('increase-players');
    const decreasePlayersButton = document.getElementById('decrease-players');

    // Populate categories
    for (const category in categoriesData.categories) {
        const categoryButton = document.createElement('button');
        categoryButton.className = 'bg-gray-200 text-gray-800 px-4 py-2 rounded mb-2 w-full';
        categoryButton.textContent = category;
        categoryButton.addEventListener('click', () => startGame(category));
        categoriesDiv.appendChild(categoryButton);
    }

    // Increase player count
    increasePlayersButton.addEventListener('click', () => {
        if (playerCount < 10) {
            playerCount++;
            playerCountSpan.textContent = playerCount;
        }
    });

    // Decrease player count
    decreasePlayersButton.addEventListener('click', () => {
        if (playerCount > 3) {
            playerCount--;
            playerCountSpan.textContent = playerCount;
        }
    });

    // Start game
    function startGame(category) {
        selectedCategory = category;
        const words = categoriesData.categories[category];
        selectedWord = words[Math.floor(Math.random() * words.length)];
        revealedPlayers = Array(playerCount).fill(false);
        revealedPlayers[Math.floor(Math.random() * playerCount)] = true;
        currentPlayer = 1;
        mainScreen.classList.add('hidden');
        playerScreen.classList.remove('hidden');
        playerInstruction.textContent = `Hand to player ${currentPlayer}`;
        revealWordButton.textContent = 'Tap to reveal';
        revealWordButton.removeEventListener('click', handleRevealWord);
        revealWordButton.addEventListener('click', handleRevealWord);
    }

    // Handle reveal word button click
    function handleRevealWord() {
        if (revealedPlayers[currentPlayer - 1]) {
            playerInstruction.textContent = '?';
        } else {
            playerInstruction.textContent = selectedWord;
        }
        revealWordButton.textContent = 'Next';
        revealWordButton.removeEventListener('click', handleRevealWord);
        revealWordButton.addEventListener('click', nextPlayer);
    }

    // Move to next player
    function nextPlayer() {
        currentPlayer++;
        if (currentPlayer > playerCount) {
            mainScreen.classList.remove('hidden');
            playerScreen.classList.add('hidden');
            revealWordButton.textContent = 'Tap to reveal';
            revealWordButton.removeEventListener('click', nextPlayer);
        } else {
            playerInstruction.textContent = `Hand to player ${currentPlayer}`;
            revealWordButton.textContent = 'Tap to reveal';
            revealWordButton.removeEventListener('click', nextPlayer);
            revealWordButton.addEventListener('click', handleRevealWord);
        }
    }
});