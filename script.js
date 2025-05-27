let phrases = [];
let currentSource = "all";
let currentAuthorType = "all";

async function initApp() {
    // Завантажуємо фрази
    phrases = await getAllPhrases();

    // Ініціалізуємо автори
    initAuthors();

    // Додаємо обробники подій
    setupEventListeners();

    // Показуємо привітальне повідомлення
    showWelcomeMessage();
}

function initAuthors() {
    const authorsGrid = document.getElementById('authors-grid');
    const authors = [...new Set(phrases.map(p => p.author))];

    authors.forEach(author => {
        const btn = document.createElement('button');
        btn.className = 'author-btn';
        btn.textContent = author;
        btn.dataset.author = author;
        btn.addEventListener('click', () => showAuthorPhrases(author));
        authorsGrid.appendChild(btn);
    });
}

function setupEventListeners() {
    // Пошук за ключовими словами
    document.getElementById('keyword-search-btn').addEventListener('click', searchByKeyword);

    // Фільтрація за джерелами
    document.querySelectorAll('.source-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSource = this.dataset.source;
            applyFilters();
        });
    });

    // Категорії
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            showCategory(this.dataset.category);
        });
    });
}

function applyFilters() {
    let filtered = [...phrases];

    // Фільтрація за джерелом
    if (currentSource !== "all") {
        const sourceName = SOURCES[currentSource].name;
        filtered = filtered.filter(p => p.source === sourceName);
    }

    // Фільтрація за типом автора
    if (currentAuthorType !== "all") {
        filtered = filtered.filter(p => {
            const authorData = phrasesDatabase.authors[p.author];
            return authorData && authorData.type === currentAuthorType;
        });
    }

    renderResults(filtered);
}

function showAuthorPhrases(author) {
    const filtered = phrases.filter(p => p.author === author);
    renderResults(filtered, `Фрази автора: ${author}`);
}

function showCategory(category) {
    const filtered = phrases.filter(p => p.category === category);
    renderResults(filtered, `Категорія: ${category}`);
}

function searchByKeyword() {
    const keyword = document.getElementById('keyword-input').value.toLowerCase();
    const filtered = phrases.filter(p =>
        p.keywords.some(kw => kw.toLowerCase().includes(keyword)) ||
        p.text.toLowerCase().includes(keyword) ||
        p.author.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)
    );
    renderResults(filtered, `Результати пошуку за: "${keyword}"`);
}

function renderResults(phrasesToShow, title = 'Результати пошуку') {
    const resultsDiv = document.getElementById('results');

    if (phrasesToShow.length === 0) {
        resultsDiv.innerHTML = '<p>Нічого не знайдено. Спробуйте інші критерії пошуку.</p>';
        return;
    }

    resultsDiv.innerHTML = `
        <h3>${title}</h3>
        <div class="results-grid">
            ${phrasesToShow.map(phrase => `
                <div class="phrase-card" data-source="${phrase.source}">
                    <blockquote>"${phrase.text}"</blockquote>
                    <div class="phrase-meta">
                        <span class="author">${phrase.author}</span>
                        <span class="category">${phrase.category}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showWelcomeMessage() {
    document.getElementById('results').innerHTML = `
        <div class="welcome-message">
            <h3>Ласкаво просимо до довідника крилатих фраз!</h3>
            <p>Оберіть автора, категорію, джерело або скористайтесь пошуком</p>
        </div>
    `;
}

// Ініціалізація додатку при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initApp);