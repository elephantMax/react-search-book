import Card from "./Card"

const Results = () => {
    return (
        <>
            <p className="text-center fw-bold">Found 123</p>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-3">
                <div className="col">
                    <Card />
                </div>
            </div>
        </>
    );
}

export default Results;