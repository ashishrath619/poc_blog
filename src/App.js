import Blogpage from "./Components/Blogpage";
import Blogdetails from "./Components/Blogdetails";
import Addblog from "./Components/Addblog";

import { BrowserRouter, Route, Switch } from "react-router-dom";
function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Blogpage} />
        <Route exact path="/Blogdetails" component={Blogdetails} />
        <Route exact path="/Addblog" component={Addblog} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
