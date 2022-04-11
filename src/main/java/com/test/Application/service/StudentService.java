package com.test.Application.service;

import com.test.Application.entity.Student;

import java.util.List;

public interface StudentService {
    void addStudent(Student student);
    void deleteStudent(Student student);
    List<Student> getTheStudentsOfThisClass(String numberRoom);
}
