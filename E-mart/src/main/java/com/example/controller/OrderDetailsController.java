package com.example.controller;
import com.example.entity.OrderDetails;
import com.example.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orderdetails")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    @GetMapping("/order/{orderId}")
    public List<OrderDetails> getOrderDetailsByOrderId(@PathVariable int orderId) {
        return orderDetailsService.getOrderDetailsByOrderId(orderId);
    }
}