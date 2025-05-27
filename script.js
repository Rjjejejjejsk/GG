// script.js — динамічна робота з оновленою data.js 
const phrases = getAllPhrases();
const authors = getAllAuthors();
const allCategories = ['афоризм', 'прислів\'я', 'приказка', 'каламбур', 'словесний курйоз'];

function openTab(evt, tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

    evt.currentTarget.classList.add('active');
    document.getElementById(tabId).style.display = 'block';
}

function filterAuthors(type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.author-btn').forEach(btn => {
        btn.style.display = (type === 'all' || btn.dataset.type === type) ? 'block' : 'none';
    });
}

function showAuthorPhrases(author) {
    const list = phrases.filter(p => p.author === author);
    renderResults(list, `Фрази автора: ${author}`);
    updateCategoriesForAuthor(author);
}

function updateCategoriesForAuthor(author) {
    document.getElementById('selected-author').textContent = author;
    const cg = document.getElementById('categories-grid');
    cg.innerHTML = '';

    // Get unique categories for this author
    const authorCategories = [...new Set(phrases
        .filter(p => p.author === author)
        .map(p => p.category))];

    // Show all categories if no author selected
    const categoriesToShow = author ? authorCategories : allCategories;

    categoriesToShow.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = c[0].toUpperCase() + c.slice(1);
        btn.onclick = () => showCategoryForAuthor(c, author);
        cg.appendChild(btn);
    });
}

function showCategoryForAuthor(category, author) {
    const list = author
        ? phrases.filter(p => p.author === author && p.category === category)
        : phrases.filter(p => p.category === category);
    const title = author
        ? `Категорія "${category}" автора ${author}`
        : `Категорія: ${category}`;
    renderResults(list, title);
}

function showCategory(category) {
    const list = phrases.filter(p => p.category === category);
    renderResults(list, `Категорія: ${category}`);
}

function renderResults(list, title) {
    const r = document.getElementById('results');
    if (!list.length) {
        r.innerHTML = '<p>Нічого не знайдено.</p>';
        return;
    }
    r.innerHTML = `<h3>${title}</h3>` + list.map(p => `
    <div class="phrase-card">
      <blockquote>"${p.text}"</blockquote>
      <div class="phrase-meta">
        <span class="author">${p.author}</span>
        <span class="category">${p.category}</span>
        <span class="source">${p.source}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    // Автори
    const ag = document.getElementById('authors-grid');
    authors.forEach(a => {
        const btn = document.createElement('button');
        btn.className = 'author-btn';
        btn.textContent = a;
        btn.dataset.author = a;
        btn.dataset.type = phrasesDatabase.authors[a].type;
        btn.onclick = () => showAuthorPhrases(a);
        ag.appendChild(btn);
    });

    // Пошук по ключовим
    document.getElementById('keyword-search-btn').onclick = () => {
        const q = document.getElementById('keyword-input').value.trim().toLowerCase();
        const found = phrases.filter(p =>
            p.text.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.keywords && p.keywords.some(k => k.includes(q))) ||
            p.source.toLowerCase().includes(q)
        );
        renderResults(found, `Результати пошуку: "${q}"`);
    };

    // Пошук по джерелу
    document.getElementById('source-search-btn').onclick = () => {
        const q = document.getElementById('source-input').value.trim().toLowerCase();
        const found = phrases.filter(p =>
            p.source.toLowerCase().includes(q)
        );
        renderResults(found, `Результати пошуку за джерелом: "${q}"`);
    };

    // Категорії (всі спочатку)
    updateCategoriesForAuthor(null);
});