import Books from "../store/Books";
import noImage from '../no-image.svg'
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";

const Book = observer(() => {
    const { id } = useParams()
    const { book: volume, error } = Books

    const [book, setBook] = useState(null)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    const descriptionElement = useRef(null)

    useEffect(() => {
        if (!id) return

        if (volume) {
            setBook(volume)
        }
        Books.fetchById(id).then(() => {
            setLoading(false)
        })
        
    }, [id])

    useEffect(() => {
        if (!volume) return
        setBook({ ...volume })
        setImage(volume?.imageLinks?.thumbnail || noImage)
        if(descriptionElement.current) {
            descriptionElement.current.innerHTML = volume.description || ''
        }
        setLoading(false)
    }, [volume])

    const imageStyle = {
        width: '100%',
        aspectRatio: '2/1',
        objectFit: 'scale-down'
    }

    return (
        <div className="row d-flex justify-content-center mb-2">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : error ? <p>{error}</p> : (
                <div className="col-sm-6">
                    <div className="card">
                        <img src={image} alt="book-poster" className="card-img-top" style={imageStyle} />
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text" ref={descriptionElement}></p>
                            <p className="card-text text-muted">
                                Categories: {book.categories || ''}
                            </p>
                            <p className="fw-normal">Authors: {book.authors || ''}</p>
                        </div>
                        <Link className="btn btn-primary" to="/">Back to main page</Link>
                    </div>
                </div>
            )}
        </div>
    );
})

export default Book;