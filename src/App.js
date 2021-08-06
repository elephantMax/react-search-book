import { Route, Switch } from "react-router-dom";
import Book from "./components/Book"
import FormSearch from "./components/FormSearch";
import Results from "./components/Results"

function App() {
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 d-flex justify-content-center">
        <h2 className="text-center">Search books App</h2>
        <div className="col col-md-8">
          <FormSearch />
        </div>
      </div>
      <div className="mt-4">
        <Switch>
          <Route path="/" exact component={Results}></Route>
          <Route path="/book/:id" component={Book}></Route>
          <Route path="*">
            <h2>Not Found</h2>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
