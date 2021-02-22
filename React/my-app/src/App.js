import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import store from './Store/Store'
import Login from './components/Login'
import Weather from './components/Weather'
import History from './components/History'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/Weather">
              <Weather></Weather>
            </Route>
            <Route path="/History">
              <History></History>
            </Route>
            <Route path="/">
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
