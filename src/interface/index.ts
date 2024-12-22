export interface IFeed {
    title: string;
    feedUrl: string;
    lastBuildDate: Date;
    keyword: string;
    link: string;
    updated_at: Date;
    category_id: string;
}

export interface IEntry {
    id: string;
    feed_id: string;
    author: string;
    contentSnippet: string;
    title: string;
    link: string;
    pubDate: Date;
    comments: string;
    updated_at: Date;
    content: string;
    created_at: Date;
}

export interface ICategories {
    name: string;
    created_at: Date;
}