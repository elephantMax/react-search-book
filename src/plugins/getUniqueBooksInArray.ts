import { BookType } from "../types/BookType"

//fix error: duplication keys
export default function getUniqueBooksInArray(books: BookType[]) {
    const uniqueIndexes = new Set()
    return books.filter((book: BookType) => {
        if (!uniqueIndexes.has(book.id)) {
            uniqueIndexes.add(book.id)
            return book
        }
        return false
    })
}