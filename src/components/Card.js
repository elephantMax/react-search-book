import { Link } from "react-router-dom";
import noImage from '../no-image.svg'
import Books from "../store/Books";

const Card = ({book}) => {
    const { volumeInfo } = book

    const image = volumeInfo?.imageLinks?.thumbnail || noImage

    const imageStyle = {
        maxWidth: '100%',
        aspectRatio: '4/3',
        objectFit: 'scale-down'
    }

    const setSelectedBook = () => {
        Books.selectBook(book.id)
    }


    return (
        <div className="card" style={{height: '500px'}}>
            <img src={image} alt="book-poster" style={imageStyle} />
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/book/${book.id}`} onClick={setSelectedBook} className="card-link">
                        {volumeInfo.title}
                    </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Category: {volumeInfo.categories || ''}</h6>
                <p className="card-text">Authors: {volumeInfo.authors}</p>
            </div>
        </div>
    );
}

export default Card;