import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from"./components/Login";
import {Switch ,Route} from"react-router-dom"
import Products from"./components/Products"
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

export default function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={Products}/>
          <Route exact path='/register' component={Register} />
          <Route path='/login' component={Login}/>
          <Route path='/checkout' component={Checkout} />
          <Route path='/thanks' component={Thanks}/>
    </Switch>
    </div>
  );
}
