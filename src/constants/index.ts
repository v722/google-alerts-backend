export const DEFAULT_ITEMS_PER_PAGE = 5;

export const DEFAULT_PAGE_NUMBER = 1;

export const DEFAULT_PROMPT = (content, category): { role: string, content: string }[] => {
    return [
        {
            role: 'system',
            content: 'You are a helpful assistant.',
        },
        {
            role: 'user',
            content: `I have given you the list of items:

            Items:
            ${JSON.stringify(content, null, 2)} 

            Category: "\n${category}\n" 
            
            only return the id with comma and space separated way for the item which is related to the category and 
            
            Filter out irrelevant news
            Prioritize and display the most relevant or high-value alerts on top
            eg:
            id1, id2, id3
            If no feed id then return empty string
            ""
            Don't add any other text
        `,
        },
    ]
}