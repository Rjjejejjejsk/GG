function openTab(tabId) {
    // Приховати всі вкладки
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Видалити активний клас у всіх кнопках
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Показати вибрану вкладку
    document.getElementById(tabId).style.display = 'block';

    // Додати активний клас до поточної кнопки
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Приклад бази даних фраз
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
        },
        // Додайте інші фрази тут...
    ];

    // Пошук за автором
    document.querySelectorAll('.author-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const author = btn.dataset.author;
            const filtered = phrases.filter(p => p.author === author);
            renderResults(filtered);
        });
    });

    // Пошук за ключовими словами
    document.getElementById('keyword-search-btn').addEventListener('click', () => {
        const keyword = document.getElementById('keyword-input').value.toLowerCase();
        const filtered = phrases.filter(p =>
            p.keywords.some(kw => kw.toLowerCase().includes(keyword)) ||
            p.text.toLowerCase().includes(keyword)
        );
        renderResults(filtered);
    });

    // Функція для відображення результатів
    function renderResults(phrasesToShow) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = phrasesToShow.map(phrase => `
            <div class="phrase-card">
                <blockquote>"${phrase.text}"</blockquote>
                <div class="phrase-meta">
                    <span class="author">${phrase.author}</span>
                    <span class="category">${phrase.category}</span>
                </div>
            </div>
        `).join('');

        if (phrasesToShow.length === 0) {
            resultsDiv.innerHTML = '<p>Нічого не знайдено. Спробуйте інший запит.</p>';
        }
    }
});