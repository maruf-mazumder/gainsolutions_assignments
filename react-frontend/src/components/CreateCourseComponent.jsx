import React, { Component } from 'react'
import ProjectService from '../services/ProjectService';
import { InputGroup,FormControl,Button } from 'react-bootstrap';

class CreateCourseComponent extends Component {
    constructor(props) {
        super(props)

    
        this.state = {
            students: [],
            // step 2
            id: this.props.match.params.id,
            name: '',
            studentId: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddSelectorHandler = this.changeAddSelectorHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        ProjectService.getStudents().then( (res) =>{
            this.setState({ students: res.data});
        });

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProjectService.getCourseById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let student = {_id: this.state.studentId};
        let course = {name: this.state.name, students: student};
        console.log('subject => ' + JSON.stringify(course));

        // step 5
        if(this.state.id === '_add'){
            ProjectService.createCourses(course).then(res =>{
                this.props.history.push('/courses');
            });
        }else{
            ProjectService.updateEmployee(course, this.state.id).then( res => {
                this.props.history.push('/courses');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAddSelectorHandler= (event) => {
        this.setState({studentId: event.target.value});
    }


    cancel(){
        this.props.history.push('/courses');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Course</h3>
        }else{
            return <h3 className="text-center">Update Course</h3>
        }
    }

    setRemoveDropdown(){
        if(this.state.id === '_add'){
            return null
        }else{
            return <div className = "form-group">
                                            
            <label> Remove Student: </label>

                <select className="form-control" onChange={this.changeAddSelectorHandler} value={this.state.studentId}>
                    <option selected>Select Student</option>
                    {
                        this.state.courses.map(
                            course =>
                            <option key={course} value={course.id}>
                                {course.name}
                            </option>
                        )
                    }
                </select>
            </div>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-title">
                                    {
                                        this.getTitle()
                                    }
                                </div>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Subject Name: </label>
                                            <input placeholder="Subject Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            
                                            <label> Add Student: </label>

                                            <select  className="form-control" onChange={this.changeAddSelectorHandler}  value={this.state.studentId}>
                                                <option selected disabled>Select Student</option>
                                                {
                                                    this.state.students.map(
                                                        student =>
                                                        <option key={student._id} value={student._id}>
                                                            {student.name}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        {
                                            this.setRemoveDropdown()
                                        }

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCourseComponent