package com.test.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer classNumber;
    private String classLetter;
    @OneToMany
    private List<Student> students;
    @OneToOne
    private Teacher classroomTeacher;

    public Room(Integer classNumber, String classLetter, Teacher classroomTeacher) {
        this.classNumber = classNumber;
        this.classLetter = classLetter;
        this.classroomTeacher = classroomTeacher;
    }
}
