package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Cart;
import com.example.entity.User;
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
	List<Cart> findByUser(User user);
}