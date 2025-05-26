#include "Database.h"
#include <fstream>
#include <algorithm>

void Database::loadFromFile(const std::string& path) {
    std::ifstream file(path);
    nlohmann::json data = nlohmann::json::parse(file);
    for (const auto& item : data) {
        Fraza phrase;
        phrase.loadFromJson(item);
        phrases.push_back(phrase);
    }
}

std::vector<Fraza> Database::searchByAuthor(const std::string& author) const {
    std::vector<Fraza> result;
    std::copy_if(phrases.begin(), phrases.end(), std::back_inserter(result),
        [&author](const Fraza& p) { return p.author == author; });
    return result;
}