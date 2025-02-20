package com.example.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Product;
import com.example.entity.SubSubcategory;
import com.example.repository.SubSubcategoryRepository;
import com.example.service.SubSubcategoryService;

@Service
public class SubSubcategoryServiceImpl implements SubSubcategoryService {

    private final SubSubcategoryRepository subSubcategoryRepository;

    @Autowired
    public SubSubcategoryServiceImpl(SubSubcategoryRepository subSubcategoryRepository) {
        this.subSubcategoryRepository = subSubcategoryRepository;
    }

    @Override
    public SubSubcategory getSubSubcategoryById(int id) {
        Optional<SubSubcategory> subSubcategory = subSubcategoryRepository.findById(id);
        return subSubcategory.orElse(null); // Returns null if not found, you can throw an exception instead
    }
   
}