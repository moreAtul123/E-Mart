package com.example.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    private String categoryName;
    
    @Column(name = "image_url")
    private String imageUrl;

//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
//    private List<Product> products;
//
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
//    private List<Subcategories> subcategories;

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
//
//	public List<Product> getProducts() {
//	return products;
//}
//
//	public void setProducts(List<Product> products) {
//	this.products = products;
//	}
//
//	public List<Subcategories> getSubcategories() {
//		return subcategories;
//	}
//
//public void setSubcategories(List<Subcategories> subcategories) {
//		this.subcategories = subcategories;
//}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

   
    
    
}

