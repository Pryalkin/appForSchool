package com.test.Application.service;

import com.test.Application.entity.Item;
import com.test.Application.exception.entity.ItemExistException;

import java.util.List;

public interface ItemService {
    Item addItem(Item item, Integer i) throws ItemExistException;
    List<Item> getAllItems();
    void deleteItem(Item item);
}
