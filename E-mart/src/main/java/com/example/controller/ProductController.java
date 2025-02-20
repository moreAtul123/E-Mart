package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Product;
import com.example.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get products by category name
    @GetMapping("/category/{categoryName}")
    public List<Product> getProductsByCategory(@PathVariable String categoryName) {
        return productService.findByCategoryCategoryName(categoryName);
    }

    // Get products by subcategory name
    @GetMapping("/subcategory/{subcategoryName}")
    public List<Product> getProductsBySubcategory(@PathVariable String subcategoryName) {
        return productService.findBySubcategorySubcategoryName(subcategoryName);
    }

    // Get products by product name
    @GetMapping("/name/{productName}")
    public List<Product> getProductsByName(@PathVariable String productName) {
        return productService.findByProductNameContainingIgnoreCase(productName);
    }

    // Get product by ID
    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get products by subsubcategory name
    @GetMapping("/subsubcategory/{subsubcategoryName}")
    public List<Product> getProductsBySubSubcategory(@PathVariable String subsubcategoryName) {
        return productService.findBySubSubcategory_Name(subsubcategoryName);
    }
}