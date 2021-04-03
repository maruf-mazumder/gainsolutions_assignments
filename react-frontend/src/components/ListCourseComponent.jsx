import React, { Component } from 'react'
import ProjectService from '../services/ProjectService'

class ListCourseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                courses: []
        }
        this.addCourse = this.addCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(id){
        ProjectService.deleteCourse(id).then( res => {
            this.setState({courses: this.state.courses.filter(course => course._id !== id)});
        });
    }
    viewCourse(id){
        this.props.history.push(`/edit-course/${id}`);
    }
    editCourse(id){
        this.props.history.push(`/edit-course/${id}`);
    }

    componentDidMount(){
        ProjectService.getCourses().then((res) => {
            this.setState({ courses: res.data});
        });
    }

    addCourse(){
        this.props.history.push('/add-course/_add');
    }

    render() {
        return (
            <div>
                
                 <div className = "row main_content">
                    <button className="btn btn-primary" onClick={this.addCourse}> Add Subject</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Subject Name</th>
                                    <th> Students</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.courses.map(
                                        course => 
                                        <tr key = {course._id}>
                                             <td> { course.name} </td>   
                                             <td> {course.students.map(
                                                 student => student == null ? "": <li key={student._id}>{student.name}</li>
                                             )}</td> 
                                             <td>
                                                 {/* <button onClick={ () => this.editStudent(course._id)} className="btn btn-info">Update </button> */}

                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCourse(course._id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCourse(course._id)} className="btn btn-danger">Delete </button>
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

export default ListCourseComponent