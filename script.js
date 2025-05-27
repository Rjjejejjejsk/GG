// Отримуємо всі фрази та авторів
const phrases = getAllPhrases();
const authors = getAllAuthors();

// Ініціалізуємо сторінку
document.addEventListener('DOMContentLoaded', () => {
    // Додаємо авторів у сітку
    const authorsGrid = document.getElementById('authors-grid');
    authors.forEach(author => {
        const authorData = phrasesDatabase.authors[author];
        const btn = document.createElement('button');
        btn.className = 'author-btn';
        btn.textContent = author;
        btn.dataset.author = author;
        btn.dataset.type = authorData.type;
        btn.addEventListener('click', () => showAuthorPhrases(author));
        authorsGrid.appendChild(btn);
    });

    // Пошук за ключовими словами
    document.getElementById('keyword-search-btn').addEventListener('click', () => {
        const keyword = document.getElementById('keyword-input').value.toLowerCase();
        const filtered = phrases.filter(p =>
            p.keywords.some(kw => kw.toLowerCase().includes(keyword)) ||
            p.text.toLowerCase().includes(keyword) ||
            p.author.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword)
        );
        renderResults(filtered, `Результати пошуку за: "${keyword}"`);
    });

    // Фільтрація авторів
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const type = this.textContent === 'Усі автори' ? 'all' :
                this.textContent === 'Літератори' ? 'literature' : 'folk';

            document.querySelectorAll('.author-btn').forEach(authorBtn => {
                authorBtn.style.display = type === 'all' ? 'block' :
                    authorBtn.dataset.type === type ? 'block' : 'none';
            });
        });
    });

    // Показ категорій
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;
            showCategory(category);
        });
    });
});

// Функції для відображення даних
function showAuthorPhrases(author) {
    const authorPhrases = phrases.filter(p => p.author === author);
    renderResults(authorPhrases, `Фрази автора: ${author}`);
}

function showCategory(category) {
    const categoryPhrases = phrasesDatabase.categories[category];
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `
        <h3>${category}</h3>
        ${categoryPhrases.map(text => `
            <div class="phrase-card">
                <blockquote>"${text}"</blockquote>
                <div class="phrase-meta">
                    <span class="category">${category}</span>
                </div>
            </div>
        `).join('')}
    `;
}

function renderResults(phrasesToShow, title = 'Результати пошуку') {
    const resultsDiv = document.getElementById('results');

    if (phrasesToShow.length === 0) {
        resultsDiv.innerHTML = '<p>Нічого не знайдено. Спробуйте інший запит.</p>';
        return;
    }

    resultsDiv.innerHTML = `
        <h3>${title}</h3>
        ${phrasesToShow.map(phrase => `
            <div class="phrase-card">
                <blockquote>"${phrase.text}"</blockquote>
                <div class="phrase-meta">
                    <span class="author">${phrase.author}</span>
                    <span class="category">${phrase.category}</span>
                </div>
            </div>
        `).join('')}
    `;
}

function openTab(tabId) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}
// script.js
// додайте цей функціонал натомість showCategory з вашого файлу 

const phrases = getAllPhrases();
const authors = getAllAuthors();
const categories = [...new Set(phrases.map(p => p.category))];
const sources = [...new Set(phrases.map(p => p.source))];

document.addEventListener('DOMContentLoaded', () => {
    // … ваше ініціювання авторів/пошуку …

    // Динамічно рендеримо категорії
    const catGrid = document.querySelector('.categories-grid');
    catGrid.innerHTML = categories
        .map(c => `<button class="category-btn" data-category="${c}">${c[0].toUpperCase() + c.slice(1)}</button>`)
        .join('');
    catGrid.querySelectorAll('.category-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            const list = phrases.filter(p => p.category === cat);
            renderResults(list, `Категорія: ${cat}`);
        })
    );

    // Якщо хочете — аналогічно можна додати вкладку пошуку за джерелом
});