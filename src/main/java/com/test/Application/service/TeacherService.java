package com.test.Application.service;

import com.test.Application.entity.Teacher;
import com.test.Application.exception.entity.TeacherExistException;

import java.util.List;

public interface TeacherService {
    Teacher addTeacher(Teacher teacher) throws TeacherExistException;
    void deleteTeacher(Teacher teacher);
    List<Teacher> getAllTeachers();
}
