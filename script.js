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

function filterAuthors(type) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const authors = document.querySelectorAll('.author-btn');
    authors.forEach(author => {
        if (type === 'all') {
            author.style.display = 'block';
        } else {
            author.style.display = author.dataset.type === type ? 'block' : 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        {
            text: "Хто не ризикує, той не п'є шампанського",
            author: "Народна мудрість",
            category: "прислів'я",
            keywords: ["ризик", "алкоголь"],
            type: "folk"
        },
        {
            text: "Україна – це не регіон, а ідея",
            author: "Богдан Гаврилишин",
            category: "афоризм",
            keywords: ["Україна", "ідея"],
            type: "literature"
        },
        {
            text: "Своя хата – своя правда",
            author: "Народна мудрість",
            category: "прислів'я",
            keywords: ["хата", "правда"],
            type: "folk"
        }
    ];

    document.querySelectorAll('.author-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const author = btn.dataset.author;
            const filtered = phrases.filter(p => p.author === author);
            renderResults(filtered);
        });
    });

    document.getElementById('keyword-search-btn').addEventListener('click', () => {
        const keyword = document.getElementById('keyword-input').value.toLowerCase();
        const filtered = phrases.filter(p =>
            p.keywords.some(kw => kw.toLowerCase().includes(keyword)) ||
            p.text.toLowerCase().includes(keyword)
        );
        renderResults(filtered);
    });

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