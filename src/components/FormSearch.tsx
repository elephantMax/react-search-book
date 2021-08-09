import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormEvent } from "react";
import Books from "../store/Books";
import { CategoriesType, SortByType } from "../types/BookType";

const FormSearch = observer(() => {
    const { title, category, sortBy } = Books

    const setTitle = (value: string) => Books.setTitle(value)
    const setCategory = (value: CategoriesType) => Books.setCategory(value)
    const setSortBy = (value: string) => Books.setSortBy(value)

    const [categories] = useState<CategoriesType[]>([
        'all', 'art', 'biography', 'computers', 'history',
        'medical', 'poety'
    ])

    const [sortOptions] = useState<SortByType[]>([
        'relevance', 'newest'
    ])

    const search = async (e: FormEvent) => {
        e.preventDefault()
        await Books.fetchByTitle()
    }

    return (
        <form className="card p-2" onSubmit={(e) => search(e)}>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <button className="btn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <input type="search" className="form-control" placeholder="enter book title" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Categories</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value as CategoriesType)}>
                    {categories.map((category) =>
                        <option key={category} value={category}>{category}</option>
                    )}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Sorting by</label>
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    {sortOptions.map((option) =>
                        <option key={option} value={option}>{option}</option>
                    )}
                </select>
            </div>
        </form>
    );
})

export default FormSearch;