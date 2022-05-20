package com.test.Application.controller;

import com.test.Application.entity.*;
import com.test.Application.exception.ExceptionHandling;
import com.test.Application.exception.entity.ItemExistException;
import com.test.Application.exception.entity.RoomExistException;
import com.test.Application.exception.entity.TeacherExistException;
import com.test.Application.service.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.springframework.http.HttpStatus.OK;

@RestController
@AllArgsConstructor
@RequestMapping("/administration")
@CrossOrigin(origins = "*")
@Slf4j
public class AdministrationController extends ExceptionHandling {

    private final TeacherService teacherService;
    private final RoomService roomService;
    private final ItemService itemService;
    private final TimetableService timetableService;

    @PostMapping("/addTeacher")
    public ResponseEntity<Teacher> addTeacher(@RequestBody Teacher teacher) throws TeacherExistException {
        return new ResponseEntity<>(teacherService.addTeacher(teacher), HttpStatus.OK);
    }

    @PostMapping("/addItem/{i}")
    public ResponseEntity<Item> addItem(@PathVariable String i,
                                        @RequestBody Item item) throws ItemExistException {
        return new ResponseEntity<>(itemService.addItem(item, Integer.parseInt(i)), HttpStatus.OK);
    }


    @PostMapping("/addRoom")
    public ResponseEntity<Room> addRoom(@RequestBody Room room) throws RoomExistException {
        return new ResponseEntity<>(roomService.addRoom(room), HttpStatus.OK);
    }

    @PostMapping("/addTimetables")
    public ResponseEntity<HttpResponse> addTimetables(@RequestParam("timetables") String timetables) throws ParseException {
        timetableService.addTimetable(timetables);
        return response(OK, "");
    }

    @PostMapping("/addStudent/{classId}")
    public ResponseEntity<Student> addStudent(@PathVariable("classId") Long classId,
                                              @RequestBody Student student) {
        return new ResponseEntity<>(roomService.addStudentToRoom(classId, student), HttpStatus.OK);
    }

    @GetMapping("/getTeachers")
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        return new ResponseEntity<>(teacherService.getAllTeachers(), HttpStatus.OK);
    }

    @GetMapping("/getClasses")
    public ResponseEntity<List<Room>> getRooms(){
        return new ResponseEntity<>(roomService.getRooms(), HttpStatus.OK);
    }

    @GetMapping("/getItems")
    public ResponseEntity<List<Item>> getItems(){
        return new ResponseEntity<>(itemService.getAllItems(), HttpStatus.OK);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        HttpResponse body = new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message.toUpperCase());
        return new ResponseEntity<>(body, httpStatus);
    }
}
