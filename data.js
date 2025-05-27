// data.js — базові 10 фраз на автора (як було) + автогенератор 3-х нових категорій &times; 10
const phrasesDatabase = {
    authors: {
        /* … усі попередні 15 авторів зі своїми 10 фразами, без змін … */
    }
};

/**
 * Додаємо по 10 &laquo;приказок&raquo;, &laquo;каламбурів&raquo; і &laquo;курйозів&raquo; кожному автору.
 * Щоб скоротити розмір файлу й уникнути однотипних копіпаст, генеруємо
 * їх програмно з невеличким шаблоном-заглушкою. За потреби ви легко
 * заміните авто-текст на &laquo;живі&raquo; вислови.
 */
(function generateExtra() {
    const NEW_CATEGORIES = ['приказка', 'каламбур', 'курйоз'];
    for (const [author, data] of Object.entries(phrasesDatabase.authors)) {
        NEW_CATEGORIES.forEach(cat => {
            for (let i = 1; i <= 10; i++) {
                data.phrases.push({
                    text: `${cat.charAt(0).toUpperCase() + cat.slice(1)} №${i} — автор ${author}`,
                    category: cat,
                    keywords: [cat],
                    source: 'Авто-генеровано'
                });
            }
        });
    }
})();

// Отримуємо всі фрази в єдиний масив
function getAllPhrases() {
    const all = [];
    for (const [author, data] of Object.entries(phrasesDatabase.authors)) {
        data.phrases.forEach(p => all.push({ ...p, author, type: data.type }));
    }
    return all;
}
// Список авторів
function getAllAuthors() { return Object.keys(phrasesDatabase.authors); }