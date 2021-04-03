import React, { Component } from 'react'
import ProjectService from '../services/ProjectService';
import { InputGroup,FormControl,Button } from 'react-bootstrap';

class EditCourseComponent extends Component {
    constructor(props) {
        super(props)

    
        this.state = {
            students: [],
            assignedStudents :[],
            // step 2
            id: this.props.match.params.id,
            name: '',
            addedStudentId: '',
            removedStudentId: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddSelectorHandler = this.changeAddSelectorHandler.bind(this);
        this.changeRemoveSelectorHandler = this.changeRemoveSelectorHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){


        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProjectService.getCourseById(this.state.id).then( (res) =>{
                let course = res.data;
                ProjectService.getStudents().then( (resStudent) =>{
                    this.setState(
                        {
                            name: course.name,
                            assignedStudents: course.students,
                            students : resStudent.data.filter( ar => !course.students.find(rm => (rm._id === ar._id) ))
                        }
                    );
                });
                
            });
        }    

    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, studentId: this.state.studentId};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        // if(this.state.id === '_add'){
        //     ProjectService.createEmployee(employee).then(res =>{
        //         this.props.history.push('/employees');
        //     });
        // }else{
        //     ProjectService.updateEmployee(employee, this.state.id).then( res => {
        //         this.props.history.push('/employees');
        //     });
        // }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAddSelectorHandler= (event) => {
        this.setState({addedStudentId: event.target.value});
    }

    changeRemoveSelectorHandler= (event) => {
        this.setState({removedStudentId: event.target.value});
    }

    cancel(){
        this.props.history.push('/courses');
    }

    updateCourseName = (e) =>{
        e.preventDefault();
        let course = {name: this.state.name};

        ProjectService.updateCourseName(course, this.state.id).then( res => {
            this.props.history.push('/courses');
        });

    }


    addStudent = (e) =>{
        e.preventDefault();

        let student = {_id: this.state.addedStudentId};
        let reqBody = {students: student};
        
        ProjectService.addStudent(reqBody, this.state.id).then( res => {
            this.props.history.push('/courses');
        });

    }


    removeStudent = (e) =>{
        e.preventDefault();
        
        ProjectService.removeStudent(this.state.removedStudentId, this.state.id).then( res => {
            this.props.history.push('/courses');
        });

    }



    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <div className = "card-title">
                                    <h3 className="text-center">Update Course</h3>
                                </div>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Subject Name: </label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Subject Name"
                                                aria-label="Subject Name"
                                                value={this.state.name} onChange={this.changeNameHandler}
                                                aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" onClick={this.updateCourseName}>Update</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                        
                                        <div className = "form-group">
                                            
                                            <label> Add Student: </label>

                                            <InputGroup className="mb-3">
                                                <select className="form-control" onChange={this.changeAddSelectorHandler} value={this.state.addedStudentId}>
                                                    <option selected>Select Student</option>
                                                    {
                                                        this.state.students.map(
                                                            student =>
                                                            <option key={student._id} value={student._id}>
                                                                {student.name}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" onClick={this.addStudent}>Add</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>

                                        <div className = "form-group">
                                            
                                            <label> Remove Student: </label>

                                            <InputGroup className="mb-3">
                                                <select className="form-control" onChange={this.changeRemoveSelectorHandler} value={this.state.removedStudentId}>
                                                    <option selected>Select Student</option>
                                                    {
                                                        this.state.assignedStudents.map(
                                                            student =>
                                                            student == null ? '': <option key={student._id} value={student._id}>
                                                                {student.name}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" onClick={this.removeStudent}>Remove</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>

                                        {/* <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button> */}
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "0px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default EditCourseComponent