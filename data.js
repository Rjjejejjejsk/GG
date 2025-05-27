const SOURCES = {
    "ukr-proverbs": {
        name: "Українські прислів'я",
        url: "https://ukr-proverbs.com/api/v1/proverbs",
        type: "api",
        categories: ["прислів'я"]
    },
    "litakcent": {
        name: "Літакцент",
        url: "https://litakcent.com/quotes/",
        type: "scrape",
        categories: ["афоризми", "цитати"]
    },
    "folk-archive": {
        name: "Архів народної творчості",
        url: "https://folk-archive.org.ua/api/items",
        type: "api",
        categories: ["прислів'я", "приказки"]
    },
    "humor-ua": {
        name: "Український гумор",
        url: "https://humor.ua/jokes/wordplay",
        type: "scrape",
        categories: ["каламбури", "курйози"]
    },
    "writers-ua": {
        name: "Українські письменники",
        url: "https://writers.ua/quotes",
        type: "api",
        categories: ["афоризми"]
    }
};

async function fetchFromAPI(source) {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${source.url}`);
        const data = await response.json();
        return data.map(item => ({
            text: item.text,
            author: item.author || "Невідомий автор",
            category: item.category || source.categories[0],
            source: source.name
        }));
    } catch (error) {
        console.error(`Помилка отримання даних з ${source.name}:`, error);
        return [];
    }
}

async function scrapeFromWebsite(source) {
    // Приклад парсингу для litakcent
    if (source.name === "Літакцент") {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/${source.url}`);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const quotes = [];
            doc.querySelectorAll('.quote-item').forEach(item => {
                quotes.push({
                    text: item.querySelector('.text').textContent.trim(),
                    author: item.querySelector('.author').textContent.trim(),
                    category: "афоризми",
                    source: source.name
                });
            });
            return quotes;
        } catch (error) {
            console.error(`Помилка парсингу ${source.name}:`, error);
            return [];
        }
    }
    // Інші сайти аналогічно...
    return [];
}

export async function getAllPhrases() {
    let allPhrases = [];

    for (const [key, source] of Object.entries(SOURCES)) {
        const phrases = source.type === "api"
            ? await fetchFromAPI(source)
            : await scrapeFromWebsite(source);
        allPhrases = [...allPhrases, ...phrases];
    }

    // Резервні дані, якщо зовнішні джерела не відповіли
    if (allPhrases.length === 0) {
        allPhrases = backupPhrases;
    }

    return allPhrases;
}