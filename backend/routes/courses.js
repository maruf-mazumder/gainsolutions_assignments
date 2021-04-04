const {Course} = require('../Models/courseModel');
const {Student} = require('../Models/studentModel');
const _ = require('lodash');
const express = require('express');
const router =  express.Router();


router.get('/',async (req,res)=>{
 
    let courses = await Course.find()
    .populate('students').select('name students');
    if(!courses) return res.status(404).send('Couldnt find the course with the given id')
    
    // courses.forEach(async course =>  {
    //     var studentArr = [];
    //     course.students.forEach(async studentID => {
    //         let student = await Student.findById(studentID);
    //         studentArr.push(student);

    //         //console.log("student for id ==>",student);
    //         //console.log("===>",studentArr);

    //     });
    //     // course.students.push(studentArr);
    //     //course.students = studentArr;
    //     // delete course.students;
    //     //  console.log("===###",studentArr);


    // });
    res.json(courses);
});



router.get('/:id',async (req,res)=>{
 
    const course = await Course.findById(req.params.id)
    .populate('students').select('name students');
    if(!course) return res.status(404).send('Couldnt find the course with the given id')

    res.json(course);
});
router.delete('/:id',async (req,res)=>{
 
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send('Couldnt find the course with the given id')

    res.json(course);
});


router.post('/',async (req,res)=>{
    let students = [];
    students[students.length]=req.body.students
    console.log(students);

    // let subjects = [];
    // let subject;
    // subject = _.pick(req.body, ["subjects"]);
    // console.log("req er vitore---",subject);
    // let SubjectName = Object.values(subject);
    // // subjects.push(SubjectName);
    // // console.log("===>",...SubjectName);
    // subjects.push(SubjectName[0]);
    // console.log(subjects);


 
 let course = new Course({
     name:req.body.name,
     students:students
     
 });
    try{
        course = await course.save();


        //Add subject to the student
        console.log("===>",req.body.students);
        const student = await Student.findById(req.body.students._id);
        console.log(student);
        student.subjects[student.subjects.length] = ({name : course.name});
        console.log(student.subjects);
        let updatedStudent = await student.save();
        console.log(updatedStudent);


        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


router.put('/:id',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    
    if(req.body.name!=null){
        course.name = req.body.name;
    }
   
    // if(req.body.students!==null && course.students.indexOf(req.body.students) <= -1 ){
    //  let students = course.students;
    //  students.push(req.body.students)
    // console.log(students);
    // course.students=students;
    // }
    // if(req.params.courseRemove){
    //     const index = student.tutorials.indexOf(req.params.courseRemove);
    //     console.log(index);
    // }
    

    try{
        course = await course.save();
        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


router.put('/:id/:studentRemove',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    
   
    if(req.params.studentRemove){
        const index = course.students.indexOf(req.params.studentRemove);
        console.log(index);
        if (index > -1) {
            course.students.splice(index, 1);
          }
        console.log(course.students);
    }
    try{
        course = await course.save();

        let student =await Student.findById(req.params.studentRemove);
        console.log(student.subjects);

        var filtered = student.subjects.filter(function (st) {
            return st != null;
          });
        console.log(filtered);
        console.log("x=>",course.name);
        filtered = filtered.filter(function (x) {
            return x.name != course.name; 
        });

        console.log(filtered);
        student.subjects = filtered;
        console.log("now==>",student.subjects);
        let updatedStudent = await student.save();
        console.log(updatedStudent);
        
        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});
router.post('/:id',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    
   
    // if(req.params.studentToAdd){
    //     const index = course.students.indexOf(req.params.studentToAdd);
    //     console.log(index);
    //     if (index > -1) {
    //         // course.students.splice(index, 1);

    //       }
    //       else{
    //           course.students.push(req.params.studentToAdd);
    //       }
    //     console.log(course.students);
    // }


    const index = course.students.indexOf(req.body.students._id);
     if(req.body.students!==null && index <= -1 ){
        let students = course.students;
        students.push(req.body.students)
        console.log(students);
        course.students=students;
    }
 
    try{
        course = await course.save();

       //ADD Course To Student
        console.log("===>",req.body.students);
        const student = await Student.findById(req.body.students._id);
        console.log(student);
        student.subjects[student.subjects.length] = ({name : course.name});
        console.log(student.subjects);
        let updatedStudent = await student.save();
        console.log(updatedStudent);




        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


module.exports=router;
