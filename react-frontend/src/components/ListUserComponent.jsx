import React, { Component } from 'react'
import ProjectService from '../services/ProjectService'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                students: []
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(id){
        ProjectService.deleteStudent(id).then( res => {
            this.setState({students: this.state.students.filter(student => student._id !== id)});
        });
    }
    viewStudent(id){
        this.props.history.push(`/view-student/${id}`);
    }
    editStudent(id){
        this.props.history.push(`/add-student/${id}`);
    }

    componentDidMount(){
        ProjectService.getStudents().then((res) => {
            this.setState({ students: res.data});
        });
    }

    addStudent(){
        this.props.history.push('/add-student/_add');
    }

    render() {
        return (
            <div>
                
                 <div className = "row main_content">
                    <button className="btn btn-primary" onClick={this.addStudent}> Add Student</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Student Name</th>
                                    <th> Email</th>
                                    <th> Phone</th>
                                    <th> Date of Birth</th>
                                    <th> Subjects</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.students.map(
                                        student => 
                                        <tr key = {student._id}>
                                             <td> { student.name == null ? "": student.name} </td>   
                                             <td> {student.Email}</td>
                                             <td> {student.phone}</td>
                                             <td> {student.DOB}</td>
                                             <td> {student.subjects.map(
                                                 sub => sub == null ? "": <li key={sub._id}>{sub.name}</li>
                                             )}</td>
                                             <td>
                                                 <button onClick={ () => this.editStudent(student._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStudent(student._id)} className="btn btn-danger">Delete </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewStudent(student.id)} className="btn btn-info">View </button> */}
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListUserComponent