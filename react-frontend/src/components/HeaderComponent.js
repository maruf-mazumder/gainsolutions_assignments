import React, { Component } from 'react'
import { Switch, Route, NavLink} from "react-router-dom";
import { Nav } from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand">Student Management System</a></div>

                    <Nav className="ml-auto" variant="pills" defaultActiveKey="/students">
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/students" exact>Students</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>
                        </Nav.Item>
                    </Nav>

{/* 
                    <div className="navbar-nav ml-auto ">
                        <li className="nav-item">
                        <Link to={"/courses"} activeClassName="selected" className="nav-link">
                            Courses
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to={"/students"} exact activeClassName="selected" className="nav-link">
                            Students
                        </Link>
                        </li>
                    </div> */}


                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent