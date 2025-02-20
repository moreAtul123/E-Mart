package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Subcategories;
import com.example.repository.SubcategoryRepository;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Override
    public List<Subcategories> getSubcategoriesByCategoryId(int categoryId) {
        return subcategoryRepository.findByCategoryId(categoryId);
    }
}
