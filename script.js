document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        {
            text: "Хто не ризикує, той не п'є шампанського",
            author: "Народна мудрість",
            category: "прислів'я",
            keywords: ["ризик", "алкоголь"]
        },
        {
            text: "Україна – це не регіон, а ідея",
            author: "Богдан Гаврилишин",
            category: "афоризм",
            keywords: ["Україна", "ідея"]
        }
    ];

    function renderPhrases(phrasesToRender) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = phrasesToRender.map(phrase => `
            <div class="phrase-card">
                <blockquote>${phrase.text}</blockquote>
                <div class="phrase-meta">
                    <span class="author">${phrase.author}</span>
                    <span class="category">${phrase.category}</span>
                </div>
            </div>
        `).join('');
    }

    // Початковий рендер
    renderPhrases(phrases);

    // Пошук
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filtered = phrases.filter(p =>
            p.text.toLowerCase().includes(searchTerm) ||
            p.author.toLowerCase().includes(searchTerm)
        );
        renderPhrases(filtered);
    });

    // Фільтр за категорією
    document.getElementById('category-filter').addEventListener('change', (e) => {
        const category = e.target.value;
        const filtered = category ?
            phrases.filter(p => p.category === category) :
            phrases;
        renderPhrases(filtered);
    });
});