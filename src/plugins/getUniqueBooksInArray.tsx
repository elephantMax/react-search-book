import { BookType } from "../types/BookType"

export default function getUniqueBooksInArray(books: BookType[]): BookType[] {
    const uniqueIndexes = new Set()
    return books.filter((book) => {
        if (!uniqueIndexes.has(book.id)) {
            uniqueIndexes.add(book.id)
            return book
        }
        return false
    })
}
