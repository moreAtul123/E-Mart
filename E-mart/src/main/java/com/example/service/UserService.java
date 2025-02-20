package com.example.service;

import com.example.dto.RegisterRequest;
import com.example.entity.User;
import java.util.Optional;

public interface UserService {
    User registerUser(RegisterRequest user);
    String loginUser(String email, String password);
    User updateUser(Integer userId, User user);
    boolean deleteUser(Integer userId);
    Optional<User> getUserDetails(Integer userId);
    Optional<User> getUserCart(Integer userId);// Use Optional to handle missing users
}
