import { observer } from "mobx-react-lite";
import Books from "../store/Books";
import { BookType } from "../types/BookType";
import Card from "./Card"

const Results = observer(() => {

    const { loading, error, books, total } = Books

    const fetchMore = () => {
        Books.fetchByTitle(Books.books.length)
    }

    return (
        <div>
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>

                ) : (
                    <>
                        {error ? <p>{error}</p> : 
                         books.length ? (
                            <>
                                <p className="text-center fw-bold">Found {Books.total}</p>
                                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-3">
                                    {books.map((book: BookType) =>
                                        <div className="col d-flex flex-column justify-content-stretch" key={book.id}>
                                            <Card book={book} />
                                        </div>
                                    )}
                                </div>
                                {total > books.length ? (
                                    <div className="d-flex justify-content-center mt-2">
                                        {Books.loadingMore ? (
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>) :
                                            <button className="btn btn-primary btn-lg" onClick={fetchMore}>
                                                Load more
                                            </button>}
                                    </div>
                                ) : ''}
                            </>) : 
                            <p className="fw-bold text-center">Not found</p>}
                    </>
                )
            }
        </div>
    );
})

export default Results;