package com.test.Application.service.impl;

import com.test.Application.constant.ConstantMessage;
import com.test.Application.entity.Room;
import com.test.Application.entity.Student;
import com.test.Application.exception.entity.RoomExistException;
import com.test.Application.exception.entity.TeacherExistException;
import com.test.Application.repository.RoomRepository;
import com.test.Application.repository.StudentRepository;
import com.test.Application.repository.TeacherRepository;
import com.test.Application.service.RoomService;
import com.test.Application.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService, StudentService {

    private final RoomRepository roomRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    @Override
    public Room addRoom(Room room) throws RoomExistException{
        validateClassNumberAndClassLetter(room);
        Room newRoom = new Room(room.getClassNumber(), room.getClassLetter(), teacherRepository.findById(room.getClassroomTeacher().getId()).get());
        return roomRepository.save(newRoom);
    }

    private void validateClassNumberAndClassLetter(Room room) throws RoomExistException {
        if (roomRepository.findByClassNumberAndClassLetter(room.getClassNumber(), room.getClassLetter()).isPresent())
            throw new RoomExistException(ConstantMessage.THIS_CLASS_ALREADY_EXISTS_IN_THE_DATABASE);
    }

    @Override
    public void deleteRoom(Room room) {

    }

    @Override
    public Student addStudentToRoom(Long roomId, Student student) {
        Student newStudent = studentRepository.save(student);
        Room room = roomRepository.findById(roomId).get();
        if (room.getStudents() == null){
            List listStudent = new ArrayList();
            listStudent.add(newStudent);
        } else {
            room.getStudents().add(newStudent);
        }
        roomRepository.save(room);
        return newStudent;
    }

    @Override
    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    @Override
    public void addStudent(Student student) {

    }

    @Override
    public void deleteStudent(Student student) {

    }

    @Override
    public List<Student> getTheStudentsOfThisClass(String numberRoom) {
        String classNumber = numberRoom.replaceAll("[^0-9]", "");
        String classLetter = numberRoom.replaceAll("[^А-Я]", "");
        return roomRepository.findByClassNumberAndClassLetter(Integer.parseInt(classNumber), classLetter).get().getStudents();
    }
}
