const Course = require('../Models/courseModel');
const {Student} = require('../Models/studentModel');
const express = require('express');
const _ = require('lodash');
const router =  express.Router();


router.post('/studentNames/',async (req,res)=>{
 
    // const student = await Student.findById(req.params.id);
    // if(!student) return res.status(404).send('Couldnt find the student with the given id')

    // res.json(student.name);
    let studentIDS = req.body.studentIDS;
    console.log(studentIDS);
    // let studentNames =  studentIDS.forEach(studentID => {
    //         Student.findById(studentID);
    // });
    // let studentNames = setTimeout(()=>{
    //      (studentIDS.map(async studentID=>{await  Student.findById(studentID)}))
    // },2000)

    var data = [];
    studentIDS.map(studentID => 
        Student.findById(studentID).then(
            res => data.push(res.data),
        )
    );
     
    
    res.json(data);
});
router.get('/:id',async (req,res)=>{
 
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).send('Couldnt find the student with the given id')

    res.json(student);
});

router.delete('/:id',async (req,res)=>{
 
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student) return res.status(404).send('Couldnt find the student with the given id')

    res.json(student);
});

router.get('/',async (req,res)=>{
 
    const students = await Student.find();
    if(!students) return res.status(404).send('Couldnt find the course with the given id')

    res.json(students);
});


router.post('/',async (req,res)=>{
    let subjects = [];
    let subject;
    subject = _.pick(req.body, ["subjects"]);
    console.log("req er vitore---",subject);
    let SubjectName = Object.values(subject);
    // subjects.push(SubjectName);
    // console.log("===>",...SubjectName);
    subjects.push(SubjectName[0]);
    console.log(subjects);
 
 let student = new Student({
     name:req.body.name,
     subjects:subjects,
     DOB:req.body.DOB,
     phone:req.body.phone,
     Email:req.body.Email
 });
    try{
        student = await student.save();
        res.json(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});



router.put('/:id',async (req,res)=>{
    let student = await Student.findById(req.params.id);
    let subject;
    // let subjects=[];
    student.name = req.body.name;
    student.DOB = req.body.DOB;
    student.Email = req.body.Email;
    student.phone = req.body.phone;
    // if(req.body.subjects!==null  && student.subjects.indexOf(req.body.subjects[0]) <= -1 ){
    // //  let tutorials = student.tutorials;
    // // tutorials.push(req.body.tutorials)
    // // console.log(tutorials);
    // // student.tutorials=tutorials;

    // subject = _.pick(req.body, ["subjects"]);
    // let SubjectName = Object.values(subject);
   
    // student.subjects.push(SubjectName[0]);
    // console.log(student.subjects);
    // }
    // if(req.params.courseRemove){
    //     const index = student.tutorials.indexOf(req.params.courseRemove);
    //     console.log(index);
    // }
    

    try{
        student = await student.save();
        res.send(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});



router.put('/:id/:courseRemove',async (req,res)=>{
    let student = await Student.findById(req.params.id);
    
   
    if(req.params.courseRemove){
        const index = student.tutorials.indexOf(req.params.courseRemove);
        console.log(index);
        if (index > -1) {
            student.tutorials.splice(index, 1);
          }
        console.log(student.tutorials);
    }
    

    try{
        student = await student.save();
        res.json(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});


module.exports=router;
