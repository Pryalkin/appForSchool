package com.test.Application.service.impl;

import com.test.Application.constant.ConstantMessage;
import com.test.Application.entity.Teacher;
import com.test.Application.exception.entity.TeacherExistException;
import com.test.Application.repository.TeacherRepository;
import com.test.Application.service.TeacherService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    @Override
    public Teacher addTeacher(Teacher teacher) throws TeacherExistException {
        validateFirstnameAndLastname(teacher);
        return teacherRepository.save(teacher);
    }

    private void validateFirstnameAndLastname(Teacher teacher) throws TeacherExistException {
        if (teacherRepository.findByFirstNameAndLastName(teacher.getFirstName(), teacher.getLastName()).isPresent())
            throw new TeacherExistException(ConstantMessage.THIS_TEACHER_ALREADY_EXISTS_IN_THE_DATABASE);
    }

    @Override
    public void deleteTeacher(Teacher teacher) {

    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
}
