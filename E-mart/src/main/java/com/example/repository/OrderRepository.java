package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.entity.Order;
import com.example.entity.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	List<Order> findByUser(User user);

}