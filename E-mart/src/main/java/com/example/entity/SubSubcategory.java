package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "sub_subcategories")
public class SubSubcategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_subcategory_id")
    private int id;
    
    @Column(name = "sub_subcategory_name", nullable = false)
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategories subcategory;

    // Constructors
    public SubSubcategory() {}

    public SubSubcategory(String name, Subcategories subcategory) {
        this.name = name;
        this.subcategory = subcategory;
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Subcategories getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(Subcategories subcategory) {
		this.subcategory = subcategory;
	}
    
	private String images;

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}
    
}

