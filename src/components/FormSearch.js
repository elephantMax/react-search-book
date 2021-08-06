const FormSearch = () => {
    return (
        <form className="card p-2">
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <button className="btn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <input type="search" className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Categories</label>
                <select className="form-select">
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
                <select className="form-select" >
                    <option defaultValue="relevance">relevance</option>
                    <option defaultValue="newest">newest</option>
                </select>
            </div>
        </form>
    );
}

export default FormSearch;