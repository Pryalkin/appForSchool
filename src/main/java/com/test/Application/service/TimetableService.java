package com.test.Application.service;

import com.test.Application.entity.Teacher;
import com.test.Application.entity.Item;
import com.test.Application.entity.Room;
import com.test.Application.entity.Timetable;
import org.json.simple.parser.ParseException;

import java.util.List;

public interface TimetableService {
    void addTimetable(String timetables) throws ParseException;
}
