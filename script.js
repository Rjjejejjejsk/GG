let currentSource = "all";

// Додаємо обробник для фільтрації за джерелами
document.querySelectorAll('.source-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentSource = this.dataset.source;
        applyAllFilters();
    });
});

function applyAllFilters() {
    let filtered = [...phrases];

    // Фільтрація за джерелом
    if (currentSource !== "all") {
        const sourceName = SOURCES[currentSource].name;
        filtered = filtered.filter(p => p.source === sourceName);
    }

    // Тут додайте ваші існуючі фільтри за автором, категорією тощо
    // ...

    renderResults(filtered);
}