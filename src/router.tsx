import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UseState from './components/UseState';
import UseEffect from './components/UseEffect';
import UseFecth from './components/UseFecth';
import UseAsync from './components/UseAsync';
import UseReducer from './components/UseReducer';

export default function Index() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/use/state'>useState</Link></li>
          <li><Link to='/use/effect'>useEffect</Link></li>
          <li><Link to='/use/fetch'>The custom React Hooks</Link></li>
          <li><Link to='/use/async'>use async/await with useEffect</Link></li>
          <li><Link to='/use/reducer'>useReducer</Link></li>
        </ul>
        <Route path='/use/state' exact component={UseState}></Route>
        <Route path='/use/effect' exact component={UseEffect}></Route>
        <Route path='/use/fetch' exact component={UseFecth}></Route>
        <Route path='/use/async' exact component={UseAsync}></Route>
        <Route path='/use/reducer' exact component={UseReducer}></Route>
      </div>
    </Router>
  )
}