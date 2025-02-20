package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Subcategories;

@Repository
@Transactional
public interface SubcategoryRepository extends JpaRepository<Subcategories, Integer> {
    
	@Query(value = "SELECT * FROM subcategories WHERE category_id = :categoryId", nativeQuery = true)
    List<Subcategories> findByCategoryId(@Param("categoryId") int categoryId);
}
    
    
