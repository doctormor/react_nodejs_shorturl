import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import ConvertUrl from "./components/ConvertUrl";
import ShortUrl from "./components/ShortUrl";
import GenericNotFound from "./components/GenericNotFound";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ConvertUrl} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/su/:code" component={ShortUrl} />
        <Route parh="/page/404" component={GenericNotFound} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
