import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import noImage from '../no-image.svg'
import Books from "../store/Books";
import { BookType } from "../types/BookType";

const Card = ({book}: {book: BookType}) => {
    const image =  noImage

    const imageStyle = {
        maxWidth: '100%',
        aspectRatio: '4/3',
        objectFit: 'scale-down'
    } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

    const setSelectedBook = () => {
        Books.selectBook(book.id)
    }


    return (
        <div className="card" style={{height: '500px'}}>
            <img src={image} alt="book-poster" style={imageStyle} />
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/book/${book.id}`} onClick={setSelectedBook} className="card-link">
                        {book.title}
                    </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Category: {book.categories || ''}</h6>
                <p className="card-text">Authors: {book.authors}</p>
            </div>
        </div>
    );
}

export default Card;