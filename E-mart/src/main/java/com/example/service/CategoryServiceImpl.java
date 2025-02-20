package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Categories;
import com.example.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Categories> getAllCategories() {
        return categoryRepository.findAll();  // Fetch all categories from the database
    

   }

	@Override
	public Categories createCategory(Categories category) {
		// TODO Auto-generated method stub
		return categoryRepository.save(category);
	}
}