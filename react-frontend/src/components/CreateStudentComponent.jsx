import React, { Component } from 'react'
import ProjectService from '../services/ProjectService';

class CreateStudentComponent extends Component {


    constructor(props) {
        super(props)

    
        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            Email: '',
            phone: '',
            DOB: '',
            errors: []
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProjectService.getStudentById(this.state.id).then( (res) =>{
                let student = res.data;
                this.setState(
                    {
                        name: student.name,
                        Email: student.Email,
                        phone : student.phone,
                        DOB: student.DOB
                    }
                );

                console.log(res.data);
            });
        }        
    }
    saveOrUpdateStudent = (e) => {
        e.preventDefault();
        let student = {name: this.state.name, Email: this.state.Email, phone: this.state.phone, DOB:this.state.DOB};
        console.log('student => ' + JSON.stringify(student));

        // step 5
        if(this.state.id === '_add'){
            ProjectService.createStudent(student).then(res =>{
                this.props.history.push('/students');
            });
        }else{

            ProjectService.updateStudent(student, this.state.id).then( res => {
                this.props.history.push('/students');
            });
        }
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
      }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({Email: event.target.value});
    }

    changeDobHandler= (event) => {
        this.setState({DOB: event.target.value});
    }

    cancel(){
        this.props.history.push('/students');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Student</h3>
        }else{
            return <h3 className="text-center">Update Student</h3>
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
                                            <label> Student Name: </label>
                                            <input placeholder="Full Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" type="text" name="Email" className="form-control" 
                                                defaultValue={this.state.Email} value={this.state.Email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        {/* <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" type="text" name="email" className="form-control" 
                                                value={this.state.Email} onChange={this.changeEmailHandler}/>
                                        </div> */}
                                        <div className = "form-group">
                                            <label> Phone: </label>
                                            <input placeholder="Phone No" type="number" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Date of Birth: </label>
                                            <input placeholder="yyyy-mm-dd" name="dob" className="form-control"  type="date"
                                                defaultValue={this.state.DOB} value={this.state.DOB} onChange={this.changeDobHandler}/>
                                        </div>


                                        <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Save</button>
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

export default CreateStudentComponent