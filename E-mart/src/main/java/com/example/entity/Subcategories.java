package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subcategories")
public class Subcategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subcategoryId;
    
    private String images;

    public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	private String subcategoryName;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Categories category;

	public int getSubcategoryId() {
		return subcategoryId;
	}

	public void setSubcategoryId(int subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public String getSubcategoryName() {
		return subcategoryName;
	}

	public void setSubcategoryName(String subcategoryName) {
		this.subcategoryName = subcategoryName;
	}

	public Categories getCategory() {
		return category;
	}

	public void setCategory(Categories category) {
		this.category = category;
	}

    
    
    
}
