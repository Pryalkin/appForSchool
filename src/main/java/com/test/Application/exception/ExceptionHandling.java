package com.test.Application.exception;

import com.test.Application.entity.HttpResponse;
import com.test.Application.exception.entity.ItemExistException;
import com.test.Application.exception.entity.RoomExistException;
import com.test.Application.exception.entity.TeacherExistException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;


@RestControllerAdvice
public class ExceptionHandling implements ErrorController {

    @ExceptionHandler(TeacherExistException.class)
    public ResponseEntity<HttpResponse> teacherExistException(TeacherExistException exception) {
        return createHttpResponse(BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(RoomExistException.class)
    public ResponseEntity<HttpResponse> roomExistException(RoomExistException exception) {
        return createHttpResponse(BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(ItemExistException.class)
    public ResponseEntity<HttpResponse> itemExistException(ItemExistException exception) {
        return createHttpResponse(BAD_REQUEST, exception.getMessage());
    }

    private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus,
                                                     httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus);
    }

}
