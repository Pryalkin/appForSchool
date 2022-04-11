package com.test.Application.service.impl;

import com.test.Application.entity.Timetable;
import com.test.Application.repository.ItemRepository;
import com.test.Application.repository.RoomRepository;
import com.test.Application.repository.TeacherRepository;
import com.test.Application.repository.TimetableRepository;
import com.test.Application.service.TimetableService;
import lombok.AllArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@AllArgsConstructor
public class TimetableServiceImpl implements TimetableService {

    private final ItemRepository itemRepository;
    private final RoomRepository roomRepository;
    private final TeacherRepository teacherRepository;
    private final TimetableRepository timetableRepository;

    @Override
    public void addTimetable(String timetables) throws ParseException {
        Timetable newTimetable = new Timetable();
        JSONParser parser = new JSONParser();
        JSONArray timetableJsonArray = (JSONArray) parser.parse(timetables);
        timetableJsonArray.stream().forEach(el -> {
            JSONObject timetable = (JSONObject) el;
            JSONObject itemJson = (JSONObject) timetable.get("item");
            JSONObject roomJson = (JSONObject) timetable.get("room");
            JSONObject teacherJson = (JSONObject) timetable.get("teacher");
            newTimetable.setItem(itemRepository.findById(Long.parseLong(itemJson.get("id").toString())).get());
            newTimetable.setRoom(roomRepository.findById(Long.parseLong(roomJson.get("id").toString())).get());
            newTimetable.setTeacher(teacherRepository.findById(Long.parseLong(teacherJson.get("id").toString())).get());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            Date date = new Date();
            try {
                date = dateFormat.parse(timetable.get("date").toString());
            } catch (java.text.ParseException e) {
                e.printStackTrace();
            }
            newTimetable.setDate(date);
            timetableRepository.save(newTimetable);
        });




    }
}
