document.getElementById('searchButton').addEventListener('click', function() { 
    const query = document.getElementById('searchInput').value;
    const apiKey = 'AIzaSyCFdGGb7xR7sWo5vK1ERs7P2uRdHRtQal0'; // Sustituye con tu clave de API
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=36&q=${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('resultsContainer');
            resultsContainer.innerHTML = ''; // Limpiar resultados previos
            data.items.forEach(item => {
                const videoTitle = item.snippet.title;
                const videoId = item.id.videoId;

                const resultItem = createResultItem(videoTitle, videoId);
                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al realizar la búsqueda.');
        });
});

function createResultItem(videoTitle, videoId) {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    
    const videoPlayer = document.createElement('div');
    videoPlayer.className = 'video-player'; // Nueva clase para el reproductor

    resultItem.innerHTML = `
        <span>${videoTitle}</span>
        <button class="enlist-button">Enlistar</button>
        <button class="play-button">Reproducir</button>
    `;

    resultItem.appendChild(videoPlayer); // Añadir el reproductor de video al resultado

    resultItem.querySelector('.enlist-button').addEventListener('click', () => {
        addSelectedVideo(videoTitle);
    });

    resultItem.querySelector('.play-button').addEventListener('click', () => {
        playAudio(videoId, videoPlayer); // Pasar el contenedor específico del reproductor
    });

    return resultItem;
}

function addSelectedVideo(videoTitle) {
    const selectedVideosList = document.getElementById('selectedVideosList');
    const listItem = document.createElement('li');
    listItem.textContent = videoTitle;
    selectedVideosList.appendChild(listItem);
}

let currentPlayer = null; // Variable para almacenar el reproductor activo

function playAudio(videoId, videoPlayer) {
    // Si hay un reproductor activo, limpia y detiene
    if (currentPlayer) {
        currentPlayer.innerHTML = ''; // Limpia el reproductor
    }

    // Asignar el nuevo reproductor activo
    currentPlayer = videoPlayer;

    // Crear y configurar el nuevo iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;

    // Añadir el nuevo iframe al reproductor
    videoPlayer.appendChild(iframe);
}

document.getElementById('exportButton').addEventListener('click', function() {
    const selectedVideos = Array.from(document.querySelectorAll('#selectedVideosList li')).map(item => item.textContent);
    const blob = new Blob([selectedVideos.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'videos_seleccionados.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

const suggestions = [
    // A
    "Alex Campos",
    "Américo",
    "Ana Tijoux",
    "Arturo Álvarez",
    "Andrés Calamaro",
    "Cumbia",

    // B
    "Bareto",
    "Black Fido",
    "Bomba Estéreo",
    "Bruno Mars",
    "Bachata Rosa",
    "Blues",

    // C
    "Cristian Castro",
    "Carlos Vives",
    "Cañaveral",
    "Cynthia",
    "Chacalón",
    "Cumbia",

    // D
    "Damaris",
    "Daniela Darcourt",
    "David Bisbal",
    "Dólar",
    "Damas Gratis",
    "Dance",

    // E
    "Eva Ayllón",
    "Erick Elera",
    "Eros Ramazzotti",
    "El Gran Combo",
    "Edwin Sierra",
    "Electro",

    // F
    "Fernando Armas",
    "Fuego",
    "Félix Figueroa",
    "Franco de Vita",
    "Felipe Pimentel",
    "Folk",

    // G
    "Gian Marco",
    "Grupo 5",
    "Greeicy",
    "Gipsy Kings",
    "Gloria Trevi",
    "Gospel",

    // H
    "Héctor Lavoe",
    "Hilary Duff",
    "Héctor Acosta",
    "Helmut Lotti",
    "Horacio Palencia",
    "Hip Hop",

    // I
    "Iván Cruz",
    "Inka Runners",
    "Inka Kola",
    "Illya Kuryaki",
    "Ismael Miranda",
    "Indie Rock",

    // J
    "Juanes",
    "Joaquín Sabina",
    "José José",
    "J Balvin",
    "Joaquín de la Torre",
    "Jazz",

    // K
    "Kany García",
    "Kurt Calleja",
    "Kumbia Kings",
    "Karol G",
    "Kali Uchis",
    "K-Pop",

    // L
    "Los Bukis",
    "Los Chicos de la Cumbia",
    "La Sonora Dinamita",
    "Los Tigres del Norte",
    "Los Ángeles Azules",
    "Latin Jazz",

    // M
    "Marco Antonio Solís",
    "Micky González",
    "Marc Anthony",
    "Maluma",
    "Miranda!",
    "Metal",

    // N
    "Naty Botero",
    "Nico Montenegro",
    "Noah Cyrus",
    "Natalia Lafourcade",
    "Nicky Jam",
    "New Age",

    // O
    "Orquesta Candela",
    "Ozuna",
    "Omar Enrique",
    "Olga Tañón",
    "Orishas",
    "Opera",

    // P
    "Pedro Suárez Vértiz",
    "Pablo Alborán",
    "Panta Rhei",
    "Pablo Ruiz",
    "Polo Montañez",
    "Pop",

    // Q
    "Qanela",
    "Quimby",
    "Quito",
    "Q-Rex",
    "Quimi Portet",
    "Quiet Storm",

    // R
    "Ricardo Arjona",
    "Ricky Martin",
    "Raúl Romero",
    "Residente",
    "Río Roma",
    "Reggaeton",

    // S
    "Susana Baca",
    "Sandro",
    "Sofia Reyes",
    "Shakira",
    "Samantha Fox",
    "Salsa",

    // T
    "Tito Nieves",
    "Tremendo",
    "Tommy Torres",
    "Tres de Copas",
    "Tito y su Torbellino",
    "Trap",

    // U
    "Urbano",
    "Ulises",
    "Uva",
    "Unión",
    "Urbano Baila",
    "Underground",

    // V
    "Viniloversus",
    "Vico C",
    "Verónica Castro",
    "Viento de Agua",
    "Voz Propia",
    "Vallenato",

    // W
    "Wisin",
    "Willie Colón",
    "Wendy Sulca",
    "Wham!",
    "Wanda",
    "World",

    // X
    "Xuxa",
    "Ximena Sariñana",
    "X Factor",
    "Xpresión",
    "X-Dream",
    "Xhosa Music"
];



function showSuggestions(input) {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = ''; // Limpiar sugerencias previas

    // Filtrar sugerencias que comienzan con la entrada actual
    suggestions.forEach(suggestion => {
        if (suggestion.toLowerCase().startsWith(input.toLowerCase())) {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.onclick = () => {
                document.getElementById('searchInput').value = suggestion; // Rellenar el input
                suggestionBox.innerHTML = ''; // Limpiar sugerencias
            };
            suggestionBox.appendChild(suggestionItem);
        }
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    showSuggestions(e.target.value);
});
function playAudio(videoId, videoPlayer) {
    if (currentPlayer) {
        currentPlayer.innerHTML = ''; // Limpia el reproductor
    }

    currentPlayer = videoPlayer;

    // Crear y configurar el nuevo iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;

    // Manejo de errores
    iframe.onerror = () => {
        console.error('Error al cargar el video:', videoId);
        alert('El video no está disponible.');
    };

    videoPlayer.appendChild(iframe);
}
