let phrases = [];
let currentSource = "all";

// Ініціалізація додатку
document.addEventListener('DOMContentLoaded', async () => {
    // Завантажуємо фрази
    phrases = await getAllPhrases();

    // Ініціалізуємо інтерфейс
    initAuthors();
    setupSourceFilter();
    setupEventListeners();

    // Показуємо привітання
    showWelcomeMessage();
});

function initAuthors() {
    const authorsGrid = document.getElementById('authors-grid');
    const authors = getAllAuthors();

    authors.forEach(author => {
        const btn = document.createElement('button');
        btn.className = 'author-btn';
        btn.textContent = author;
        btn.dataset.author = author;
        btn.addEventListener('click', () => showAuthorPhrases(author));
        authorsGrid.appendChild(btn);
    });
}

function setupSourceFilter() {
    const sourcesContainer = document.createElement('div');
    sourcesContainer.className = 'sources-section';
    sourcesContainer.innerHTML = `
        <h2>Джерела</h2>
        <div class="sources-filter">
            <button class="source-btn active" data-source="all">Усі джерела</button>
            ${Object.values(getSources()).map(source => `
                <button class="source-btn" data-source="${source.name}">${source.name}</button>
            `).join('')}
            <button class="source-btn" data-source="Локальна база">Локальна база</button>
        </div>
    `;

    // Вставляємо після категорій
    document.querySelector('.categories-section').after(sourcesContainer);

    // Додаємо обробники для джерел
    document.querySelectorAll('.source-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSource = this.dataset.source;
            applyFilters();
        });
    });
}

function applyFilters() {
    let filtered = [...phrases];

    // Фільтрація за джерелом
    if (currentSource !== "all") {
        filtered = filtered.filter(p => p.source === currentSource);
    }

    // Тут можна додати інші фільтри (автор, категорія тощо)
    // ...

    renderResults(filtered);
}

// Решта функцій залишаються незмінними (showAuthorPhrases, showCategory, renderResults тощо)