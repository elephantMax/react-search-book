export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poety'

export type SortByType = 'relevance' | 'newest'

export type BookType = {
    id: string
    title: string
    description: string
    categories: CategoriesType[],
    authors: string[]
}