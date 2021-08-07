import { makeAutoObservable, runInAction } from "mobx"
import getUniqueBooksInArray from "../plugins/getUniqueBooksInArray"
const API_KEY = "AIzaSyDxNguTwAfHaKOp3sePp2HEkguDtKLDmL8"

class Books {
    books = []
    loading = false
    loadingMore = false
    book = {}
    total = 0

    title = ''
    category = 'all'
    sortBy = 'relevance'

    constructor() {
        makeAutoObservable(this)
    }

    async fetchByTitle(startIndex = 0) {
        if (!startIndex) {
            this.books = []
            runInAction(() => {
                this.loading = true
            })
        } else {
            runInAction(() => {
                this.loadingMore = true
            })
        }

        this.category = this.category === 'all' ? '' : this.category
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.title}+subject:${this.category}&projection=full&maxResults=30&orderBy=${this.sortBy}&startIndex=${startIndex}&key=${API_KEY}`)
        const data = await response.json()
        runInAction(() => {
            this.loading = false
            this.loadingMore = false
            this.total = data.totalItems
        })
        if (data.items) {
            runInAction(() => {
                this.books = getUniqueBooksInArray([...this.books, ...data.items])
            })
        }
    }

    async fetchById(id) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        const data = await response.json()
        runInAction(() => {
            this.book = data.volumeInfo
        })
    }

    selectBook(id) {
        this.book = this.books.find(book => book.id === id)
    }

    setTitle(value) {
        this.title = value
    }

    setSortBy(value) {
        this.sortBy = value
    }

    setCategory(value) {
        this.category = value
    }
}

export default new Books()