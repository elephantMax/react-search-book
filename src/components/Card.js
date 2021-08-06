import { Link } from "react-router-dom";

const Card = () => {

    const imageStyle = {
        width: '100%',
        aspectRatio: '4/3',
        objectFit: 'cover'
    }
    return (
        <div className="card">
            <img src="https://im0-tub-ru.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d&n=27&h=480&w=480" alt="book-poster" style={imageStyle} />
            <div className="card-body">
                <h5 className="card-title">
                    <Link to="/book/1" className="card-link">
                        Card Link
                    </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">Категория: Категория</h6>
                <p className="card-text">Авторы: Автор1, Автор2</p>
            </div>
        </div>
    );
}

export default Card;