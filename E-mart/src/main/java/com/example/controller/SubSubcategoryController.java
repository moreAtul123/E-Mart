package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.SubSubcategory;
import com.example.service.SubSubcategoryService;

@RestController
@RequestMapping("/api/subsubcategories")
@CrossOrigin(origins = "http://localhost:3000")
public class SubSubcategoryController {
	
	private final SubSubcategoryService subSubcategoryService;

    @Autowired
    public SubSubcategoryController(SubSubcategoryService subSubcategoryService) {
        this.subSubcategoryService = subSubcategoryService;
    }
    @GetMapping("/{id}")
    public SubSubcategory getSubSubcategoryById(@PathVariable("id") int id) {
        SubSubcategory subSubcategory = subSubcategoryService.getSubSubcategoryById(id);
        
        return subSubcategory; // Spring will handle returning a 404 if the object is null
    }
}