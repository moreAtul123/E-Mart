package com.example.service;

import java.util.List;
import com.example.entity.Categories;

public interface CategoryService {
	 List<Categories> getAllCategories();
	 Categories createCategory(Categories category);
}
