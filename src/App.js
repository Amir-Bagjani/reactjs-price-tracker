import Home from "./pages/Home";
import Products from "./pages/Products";
import { Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div style={{ maxWidth: `35rem`, margin: `4rem auto`, padding: `0 0.5rem`, overflowX: `hidden` }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/products/:brand" component={Products} />
      </Switch>
    </div>
  );
}

export default App;
