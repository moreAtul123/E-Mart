package com.example.service;

import com.example.entity.OrderDetails;

import java.util.List;

public interface OrderDetailsService {
    List<OrderDetails> getOrderDetailsByOrderId(int orderId);
}