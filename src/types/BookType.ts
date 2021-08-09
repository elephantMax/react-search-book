export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poety'

export type SortByType = 'relevance' | 'newest'

export type BookType = {
    id: string
    volumeInfo : {
        title: string
        description: string
        categories: CategoriesType[]
        authors: string[]
        imageLinks?: {
            thumbnail: string
        }
    }
}