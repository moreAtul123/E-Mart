package com.example.service;

import java.util.List;

import com.example.entity.Subcategories;

public interface SubcategoryService {
	List<Subcategories> getSubcategoriesByCategoryId(int categoryId);
}
