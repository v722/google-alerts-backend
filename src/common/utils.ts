export const cleanRssTitle = (title) => {
    let cleanText = title.replace(/<[^>]*>/g, '');

    cleanText = cleanText.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
    cleanText = cleanText.replace(/&([^;]+);/g, (match, entity) => {
        const entities = {
            quot: '"',
            amp: '&',
            lt: '<',
            gt: '>',
            apos: "'"
        };
        return entities[entity] || match;
    });

    return cleanText;
}

