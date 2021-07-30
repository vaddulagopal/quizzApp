import { BrowserRouter, Switch, Route } from "react-router-dom";
import AssessmentHome from "./components/AssessmentHome";
import AssessmentQuestion from "./components/AssessmentQuestion";

const App = () => (
  <div className="bg-primary vh-100 d-flex flex-col justify-content-center text-center align-items-center">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AssessmentHome} />
        <Route exact path="/category/:id" component={AssessmentQuestion} />
      </Switch>
    </BrowserRouter>
  </div>
);
export default App;
