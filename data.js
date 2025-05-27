// Конфігурація зовнішніх джерел
const EXTERNAL_SOURCES = {
    "proverbs": {
        name: "Українські прислів'я",
        url: "https://api.example-ukrainian-proverbs.com/v1/proverbs",
        type: "api",
        categories: ["прислів'я"]
    },
    "aphorisms": {
        name: "Літературні цитати",
        url: "https://api.ukr-writers.org/quotes",
        type: "api",
        categories: ["афоризми"]
    }
};

// Локальна база даних (резервна)
const LOCAL_DATABASE = {
    authors: {
        // Тарас Шевченко, Леся Українка, Іван Франко (як було)
        // Додаємо нових авторів:
        "Богдан Гаврилишин": {
            type: "literature",
            phrases: [
                {
                    text: "Україна – це не регіон, а ідея",
                    category: "афоризм",
                    keywords: ["Україна", "ідея"]
                }
            ]
        },
        "Ліна Костенко": {
            type: "literature",
            phrases: [
                {
                    text: "Найстрашніша зброя – байдужість",
                    category: "афоризм",
                    keywords: ["зброя", "байдужість"]
                }
            ]
        },
        // +10 інших авторів...
    },
    categories: {
        // ... (як було)
    }
};

// Функція для отримання даних із зовнішніх джерел
async function fetchExternalData() {
    let allPhrases = [];

    for (const [key, source] of Object.entries(EXTERNAL_SOURCES)) {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/${source.url}`);
            const data = await response.json();

            data.forEach(item => {
                allPhrases.push({
                    text: item.text,
                    author: item.author || "Невідомий автор",
                    category: item.category || source.categories[0],
                    keywords: item.keywords || [],
                    source: source.name
                });
            });
        } catch (error) {
            console.error(`Помилка завантаження з ${source.name}:`, error);
        }
    }

    return allPhrases;
}

// Головна функція для отримання всіх фраз
export async function getAllPhrases() {
    // Спочатку пробуємо отримати зовнішні дані
    let phrases = await fetchExternalData();

    // Якщо зовнішні джерела не відповіли, використовуємо локальні
    if (phrases.length === 0) {
        phrases = [];
        for (const [author, data] of Object.entries(LOCAL_DATABASE.authors)) {
            data.phrases.forEach(phrase => {
                phrases.push({
                    ...phrase,
                    author: author,
                    source: "Локальна база"
                });
            });
        }
    }

    return phrases;
}

// Функція для отримання всіх авторів
export function getAllAuthors() {
    return Object.keys(LOCAL_DATABASE.authors);
}

// Функція для отримання джерел
export function getSources() {
    return EXTERNAL_SOURCES;
}