package com.test.Application.service;

import com.test.Application.entity.Room;
import com.test.Application.entity.Student;
import com.test.Application.exception.entity.RoomExistException;
import com.test.Application.exception.entity.TeacherExistException;

import java.util.List;

public interface RoomService {
    Room addRoom(Room room) throws RoomExistException;
    void deleteRoom(Room room);
    Student addStudentToRoom(Long roomId, Student student);
    List<Room> getRooms();
}
