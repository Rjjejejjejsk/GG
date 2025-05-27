const phrases = getAllPhrases();
const authors = getAllAuthors();
const categories = [...new Set(phrases.map(p => p.category))];

function openTab(evt, tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

    evt.currentTarget.classList.add('active');
    document.getElementById(tabId).style.display = 'block';
}

function showAuthorPhrases(author) {
    const list = phrases.filter(p => p.author === author);
    renderResults(list, `Фрази автора: ${author}`);
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

    // Пошук по ключовим словам
    document.getElementById('keyword-search-btn').onclick = () => {
        const q = document.getElementById('keyword-input').value.trim().toLowerCase();
        const found = phrases.filter(p =>
            p.text.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.keywords.some(k => k.includes(q)) ||
            p.source.toLowerCase().includes(q)
        );
        renderResults(found, `Результати пошуку: "${q}"`);
    };

    // Пошук по джерелу
    document.getElementById('source-search-btn').onclick = () => {
        const q = document.getElementById('source-input').value.trim().toLowerCase();
        const found = phrases.filter(p => p.source.toLowerCase().includes(q));
        renderResults(found, `Результати пошуку за джерелом: "${q}"`);
    };

    // Категорії
    const cg = document.getElementById('categories-grid');
    categories.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = c[0].toUpperCase() + c.slice(1);
        btn.onclick = () => showCategory(c);
        cg.appendChild(btn);
    });
});

function getAllPhrases() {
    const all = [];
    for (const [author, data] of Object.entries(phrasesDatabase.authors)) {
        for (const p of data.phrases) {
            all.push({
                text: p.text,
                author,
                category: p.category,
                keywords: p.keywords,
                source: p.source,
                type: data.type
            });
        }
    }
    return all;
}

function getAllAuthors() {
    return Object.keys(phrasesDatabase.authors);
}
