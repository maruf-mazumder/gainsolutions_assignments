import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
import ListCourseComponent from './components/ListCourseComponent';
import CreateCourseComponent from './components/CreateCourseComponent';
import EditCourseComponent from './components/EditCourseComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListUserComponent}></Route>
                          <Route path = "/students" component = {ListUserComponent}></Route>
                          <Route path = "/add-student/:id" component = {CreateStudentComponent}></Route>
                          <Route path = "/courses" component = {ListCourseComponent}></Route>
                          <Route path = "/add-course/:id" component = {CreateCourseComponent}></Route>
                          <Route path = "/edit-course/:id" component = {EditCourseComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;