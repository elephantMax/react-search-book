const Book = () => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="book-poster" className="img-fluid rounded-start" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Название книги</h5>
                        <p className="card-text">
                            Описание: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam porro, aspernatur optio hic suscipit fugit officia officiis eum adipisci magnam impedit. Vero, nam veniam? Possimus vero magni autem repellendus similique.
                        </p>
                        <p className="card-text text-muted">
                            Категории: Категория1, Категория2
                        </p>
                        <p className="fw-normal">Авторы: Автор1, Автор2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Book;