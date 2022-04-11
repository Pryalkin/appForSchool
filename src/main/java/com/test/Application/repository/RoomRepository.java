package com.test.Application.repository;

import com.test.Application.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByClassNumberAndClassLetter(Integer classNumber, String classLetter);
}
