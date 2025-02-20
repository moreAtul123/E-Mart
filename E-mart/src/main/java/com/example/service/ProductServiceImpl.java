package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Product;
import com.example.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findByCategoryCategoryName(String categoryName) {
        return productRepository.findByCategoryCategoryName(categoryName);
    }

    @Override
    public List<Product> findBySubcategorySubcategoryName(String subcategoryName) {
        return productRepository.findBySubcategorySubcategoryName(subcategoryName);
    }

    @Override
    public List<Product> findByProductNameContainingIgnoreCase(String productName) {
        return productRepository.findByProductNameContainingIgnoreCase(productName);
    }

    @Override
    public Product getProductById(int productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findBySubSubcategory_Name(String subsubcategoryName) {
        return productRepository.findBySubSubcategory_Name(subsubcategoryName);
    }
}