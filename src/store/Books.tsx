import { makeAutoObservable, runInAction } from "mobx"
import getUniqueBooksInArray from "../plugins/getUniqueBooksInArray"
import { BookType } from "../types/BookType"
const API_KEY = "AIzaSyDxNguTwAfHaKOp3sePp2HEkguDtKLDmL8"
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

class Books {
    books = [] as BookType[]
    loading = false as boolean
    loadingMore = false as boolean
    book = {} as BookType
    total = 0 as number
    error = '' as string

    title = '' as string
    category = 'all' as string
    sortBy = 'relevance' as string

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
                url = `${BASE_URL}?q=${this.title}+subject:${this.category}&maxResults=30&orderBy=${this.sortBy}&startIndex=${startIndex}&key=${API_KEY}`
            } else {
                url = `${BASE_URL}?q=${this.title}&maxResults=30&orderBy=${this.sortBy}&startIndex=${startIndex}&key=${API_KEY}`
            }
            const response = await fetch(url)
            const data = await response.json()
            runInAction(() => {
                this.loading = false
                this.loadingMore = false
                this.total = !startIndex ? data.totalItems : this.total
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
            runInAction(() => {
                this.loading = true
            })
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            const data = await response.json()
            if ('error' in data) {
                throw new Error(data.err)
            }

            runInAction(() => {
                this.book = data
                this.loading = false
            })
        } catch (error) {
            const errorObj = new Error(error)
            this.setError(errorObj.message)
            runInAction(() => this.loading = false)
        }

    }

    setBook(book: BookType) {
        this.book = book
        this.books = []
    }

    setTitle(value: string) {
        this.title = value
    }

    setSortBy(value: string) {
        this.sortBy = value
        this.books = []
    }

    setCategory(value: string) {
        this.category = value
        this.books = []
    }

    setError(value: string) {
        this.error = value
    }
}

export default new Books()