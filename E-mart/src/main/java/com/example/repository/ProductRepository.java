package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategoryCategoryName(String categoryName);

    List<Product> findBySubcategorySubcategoryName(String subcategoryName);

    List<Product> findByProductNameContainingIgnoreCase(String productName);

    List<Product> findBySubSubcategory_Name(String subsubcategoryName);
}