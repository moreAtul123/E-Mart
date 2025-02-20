package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Subcategories;
import com.example.service.SubcategoryService;

@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin(origins = "http://localhost:3000")
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping("/category/{categoryId}")
    public List<Subcategories> getSubcategoriesByCategoryId(@PathVariable int categoryId) {
        return subcategoryService.getSubcategoriesByCategoryId(categoryId);
    }
}