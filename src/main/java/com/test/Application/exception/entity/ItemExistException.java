package com.test.Application.exception.entity;

public class ItemExistException extends Throwable {

    public ItemExistException(String message){
        super(message);
    }
}
