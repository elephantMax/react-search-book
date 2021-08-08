import { makeAutoObservable, runInAction } from "mobx"
import getUniqueBooksInArray from "../plugins/getUniqueBooksInArray"
import { BookType } from "../types/BookType"
const API_KEY = "AIzaSyDxNguTwAfHaKOp3sePp2HEkguDtKLDmL8"
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

class Books {
    books = [] as BookType[]
    loading = false
    loadingMore = false
    book = {} as BookType
    total = 0
    error = ''

    title = ''
    category = 'all'
    sortBy = 'relevance'

    constructor() {
        makeAutoObservable(this)
    }

    async fetchByTitle(startIndex = 0) {
        try {
            this.setError('')
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
            let url
            if (this.category) {
                url = `${BASE_URL}?q=intitle:${this.title}+subject:${this.category}&projection=full&maxResults=30&orderBy=${this.sortBy}&startIndex=${startIndex}&key=${API_KEY}`
            } else {
                url = `${BASE_URL}?q=intitle:${this.title}&projection=full&maxResults=30&orderBy=${this.sortBy}&startIndex=${startIndex}&key=${API_KEY}`
            }
            const response = await fetch(url)
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
        } catch (error) {
            const errorObj = new Error(error)
            this.setError(errorObj.message)
            runInAction(() => {
                this.loading = false
                this.loadingMore = false
            })
        }

    }

    async fetchById(id: string) {
        try {
            this.setError('')
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            const data = await response.json()
            runInAction(() => {
                this.book = data.volumeInfo
            })
        } catch (error) {
            const errorObj = new Error(error)
            this.setError(errorObj.message)
            runInAction(() => this.loading = false)
        }

    }

    selectBook(id: string) {
        this.book = this.books.find((book: BookType) => book.id === id) || {} as BookType
    }

    setTitle(value: string) {
        this.title = value
    }

    setSortBy(value: string) {
        this.sortBy = value
    }

    setCategory(value: string) {
        this.category = value
    }

    setError(value: string) {
        this.error = value
    }
}

export default new Books()