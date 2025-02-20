package com.example.entity;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Lob
    private String description;

    private double price;
    
    private String productUrl;
    private int stock;

    // Many-to-One relationship with Category
    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Categories category;

    // Many-to-One relationship with Subcategory
    @ManyToOne
    @JsonIgnore 
    @JoinColumn(name = "subcategoryId", nullable = false)
    private Subcategories subcategory;

    // One-to-Many relationship with Cart
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore 
    private List<Cart> carts;

    // One-to-Many relationship with OrderDetails
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore 
    private List<OrderDetails> orderDetails;

    // Many-to-One relationship with SubSubcategory
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_subcategory_id", nullable = true)
    @JsonIgnore 
    private SubSubcategory subSubcategory;

    // Getters and Setters
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Categories getCategory() {
        return category;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

    public Subcategories getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategories subcategory) {
        this.subcategory = subcategory;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public SubSubcategory getSubSubcategory() {
        return subSubcategory;
    }

    public void setSubSubcategory(SubSubcategory subSubcategory) {
        this.subSubcategory = subSubcategory;
    }

	public String getProducturl() {
		return productUrl;
	}

	public void setProducturl(String producturl) {
		this.productUrl = productUrl;
	}
}