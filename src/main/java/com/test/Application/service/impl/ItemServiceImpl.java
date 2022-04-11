package com.test.Application.service.impl;

import com.test.Application.constant.ConstantMessage;
import com.test.Application.entity.Item;
import com.test.Application.exception.entity.ItemExistException;
import com.test.Application.exception.entity.TeacherExistException;
import com.test.Application.repository.ItemRepository;
import com.test.Application.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public Item addItem(Item item) throws ItemExistException {
        validateFirstnameAndLastname(item);
        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    private void validateFirstnameAndLastname(Item item) throws ItemExistException {
        if (itemRepository.findByName(item.getName()).isPresent())
            throw new ItemExistException(ConstantMessage.THIS_ITEM_ALREADY_EXISTS_IN_THE_DATABASE);
    }

    @Override
    public void deleteItem(Item item) {

    }
}
