package com.example.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.SubSubcategory;

@Service
public interface SubSubcategoryService {
	SubSubcategory getSubSubcategoryById(int id);
}