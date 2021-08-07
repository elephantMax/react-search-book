import { observer } from "mobx-react-lite";
import Books from "../store/Books";

const FormSearch = observer(() => {
    const { title, category, sortBy } = Books

    const setTitle = (value) => Books.setTitle(value)
    const setCategory = (value) => Books.setCategory(value)
    const setSortBy = (value) => Books.setSortBy(value)

    const search = async (e) => {
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
                <input type="search" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Categories</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option defaultValue="all">all</option>
                    <option defaultValue="art">art</option>
                    <option defaultValue="biography">biography</option>
                    <option defaultValue="computers">computers</option>
                    <option defaultValue="history">history</option>
                    <option defaultValue="medical">medical</option>
                    <option defaultValue="poetry">poetry</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Sorting by</label>
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option defaultValue="relevance">relevance</option>
                    <option defaultValue="newest">newest</option>
                </select>
            </div>
        </form>
    );
})

export default FormSearch;