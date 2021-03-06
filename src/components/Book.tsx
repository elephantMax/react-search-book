import Books from "../store/Books";
import { Link, useParams } from "react-router-dom";
import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import noImage from '../no-image.svg'

type BookParam = {
    id: string
}

const Book = observer(() => {
    const { id } = useParams<BookParam>()

    const { book, error } = Books
    const [loading, setLoading] = useState(true)

    const descriptionElement = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (!id) return
        Books.fetchById(id)
    }, [id])

    useEffect(() => {
        if (descriptionElement.current) {
            descriptionElement.current.innerHTML = book.volumeInfo.description || ''
        }
        setLoading(false)
    }, [book])

    const imageStyle = {
        width: '100%',
        aspectRatio: '2/1',
        objectFit: 'scale-down'
    } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

    return (
        <div className="row d-flex justify-content-center mb-2">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? <p>{error}</p> :
                Object.keys(book).length ? (
                    <div className="col-sm-6">
                        <div className="card">
                            <img src={book.volumeInfo.imageLinks?.thumbnail || noImage} alt="book-poster" className="card-img-top" style={imageStyle} />
                            <div className="card-body">
                                <h5 className="card-title">{book.volumeInfo.title}</h5>
                                <p className="card-text" ref={descriptionElement}></p>
                                <p className="card-text text-muted">
                                    Categories: {book.volumeInfo.categories || ''}
                                </p>
                                <p className="fw-normal">Authors: {book.volumeInfo.authors || ''}</p>
                            </div>
                            <Link className="btn btn-primary" to="/">Back to main page</Link>
                        </div>
                    </div>
                ) : ''
            }
        </div>
    );
})

export default Book;