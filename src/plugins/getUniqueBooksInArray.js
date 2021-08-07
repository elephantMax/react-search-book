export default function getUniqueBooksInArray(books) {
    const uniqueIndexes = new Set()
    return books.filter((book) => {
        if (!uniqueIndexes.has(book.id)) {
            uniqueIndexes.add(book.id)
            return book
        }
        return false
    })
}
