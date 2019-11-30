import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UseState from './components/UseState';
import UseEffect from './components/UseEffect';
import UseFecth from './components/UseFecth';
import UseAsync from './components/UseAsync';
import UseReducer from './components/UseReducer';
import UseContext from './components/UseContext';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';
import Memo from './components/Memo';
import Timer from './components/Timer';

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
          <li><Link to='/use/context'>useContext</Link></li>
          <li><Link to='/use/memo'>useMemo</Link></li>
          <li><Link to='/use/callback'>useCallback</Link></li>
          <li><Link to='/memo'>Memo</Link></li>
          <li><Link to='/timer'>Timer</Link></li>
        </ul>
        <Route path='/use/state' exact component={UseState}></Route>
        <Route path='/use/effect' exact component={UseEffect}></Route>
        <Route path='/use/fetch' exact component={UseFecth}></Route>
        <Route path='/use/async' exact component={UseAsync}></Route>
        <Route path='/use/reducer' exact component={UseReducer}></Route>
        <Route path='/use/context' exact component={UseContext}></Route>
        <Route path='/use/memo' exact component={UseMemo}></Route>
        <Route path='/use/callback' exact component={UseCallback}></Route>
        <Route path='/memo' exact component={Memo}></Route>
        <Route path='/timer' exact component={Timer}></Route>
        <footer style={{ marginTop: '20vh' }}>
          <a href='https://btholt.github.io/complete-intro-to-react-v5/hooks-in-depth'>参考文章：COMPLETE INTRO TO REACT V5</a>
        </footer>
      </div>
    </Router>
  )
}