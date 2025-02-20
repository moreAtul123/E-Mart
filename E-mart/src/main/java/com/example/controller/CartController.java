package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Cart;
import com.example.entity.Product;
import com.example.entity.User;
import com.example.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add item to cart
    @PostMapping("/add")
    public Cart addToCart(@RequestParam int userId, @RequestParam int productId, @RequestParam int quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    //Update cart item quantity
    @PutMapping("/update/{cartId}")
    public Cart updateCart(@PathVariable int cartId, @RequestParam int quantity) {
        return cartService.updateCart(cartId, quantity);
    }

    // Remove item from cart
    @DeleteMapping("/remove/{cartId}")
    public void removeProductFromCart(@PathVariable int cartId) {
        cartService.removeProductFromCart(cartId);
    }

    // Get user's cart items
    @GetMapping("/user/{userId}")
    public List<Cart> getUserCart(@PathVariable int userId) {
        return cartService.getUserCart(userId);
    }
}