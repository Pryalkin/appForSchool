package com.test.Application.controller;

import com.test.Application.entity.Room;
import com.test.Application.entity.Student;
import com.test.Application.service.RoomService;
import com.test.Application.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomService roomService;
    private final StudentService studentService;

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getRooms(){
        return new ResponseEntity<>(roomService.getRooms(), HttpStatus.OK);
    }

    @GetMapping("/students/{numberRoom}")
    public ResponseEntity<List<Student>> getStudents(@PathVariable("numberRoom") String numberRoom){
        return new ResponseEntity<>(studentService.getTheStudentsOfThisClass(numberRoom), HttpStatus.OK);
    }


}
