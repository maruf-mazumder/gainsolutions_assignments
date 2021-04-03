import axios from 'axios';

const COURSE_API_BASE_URL = "http://localhost:7000/api/courses";
const STUDENT_API_BASE_URL = "http://localhost:7000/api/students";

class ProjectService {

    getStudents(){
        return axios.get(STUDENT_API_BASE_URL);
    }
    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student);
    }

    getStudentById(studentId){
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId);
    }

    updateStudent(student, studentId){
        return axios.put(STUDENT_API_BASE_URL + '/' + studentId, student);
    }

    deleteStudent(studentId){
        return axios.delete(STUDENT_API_BASE_URL + '/' + studentId);
    }






    getCourses(){
        return axios.get(COURSE_API_BASE_URL);
    }
    
    createCourses(course){
        return axios.post(COURSE_API_BASE_URL, course);
    }

    getCourseById(courseId){
        return axios.get(COURSE_API_BASE_URL + '/' + courseId);
    }

    updateCourseName(course, courseId){
        return axios.put(COURSE_API_BASE_URL + '/' + courseId, course);
    }

    removeStudent(studentId, courseId){
        return axios.put(COURSE_API_BASE_URL + '/' + courseId + '/'+studentId);
    }

    addStudent(student, courseId){
        return axios.post(COURSE_API_BASE_URL + '/' + courseId, student);
    }

    deleteCourse(courseId){
        return axios.delete(COURSE_API_BASE_URL + '/' + courseId);
    }
}

export default new ProjectService()