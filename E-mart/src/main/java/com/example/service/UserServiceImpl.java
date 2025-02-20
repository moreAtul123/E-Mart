package com.example.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.dto.RegisterRequest;
import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public User registerUser(RegisterRequest registerRequest) {
        logger.info("Registering user with email: {}", registerRequest.getEmail());

        User user = new User();
        user.setName(registerRequest.getName());
        user.setMobileNumber(registerRequest.getMobileNumber());
        user.setEmail(registerRequest.getEmail());
        user.setAddress(registerRequest.getAddress());
        user.setMember(registerRequest.isMember());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); 
        
        User savedUser = userRepository.save(user);
        logger.info("User registered successfully: {}", savedUser.getEmail());

        return savedUser;
    }

    @Override
    public String loginUser(String email, String password) {
        logger.info("Login attempt for email: {}", email);

        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    logger.info("Login successful for user: {}", email);
                    return "Login successful";
                })
                .orElseThrow(() -> {
                    logger.warn("Failed login attempt for email: {}", email);
                    return new RuntimeException("Invalid email or password");
                });
    }

    @Override
    public User updateUser(Integer userId, User user) {
        logger.info("Updating user with ID: {}", userId);

        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!existingUser.getEmail().equals(user.getEmail()) &&
                userRepository.findByEmail(user.getEmail()).isPresent()) {
            logger.warn("Attempt to update with an already existing email: {}", user.getEmail());
            throw new RuntimeException("Email already in use");
        }

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setMobileNumber(user.getMobileNumber());
        existingUser.setAddress(user.getAddress());
        existingUser.setMember(user.isMember());
        existingUser.setCreditCardInfo(user.getCreditCardInfo());
        existingUser.setInternetBankingInfo(user.getInternetBankingInfo());

        User updatedUser = userRepository.save(existingUser);
        logger.info("User updated successfully with ID: {}", userId);

        return updatedUser;
    }

    @Override
    public boolean deleteUser(Integer userId) {
        logger.info("Deleting user with ID: {}", userId);

        return userRepository.findById(userId)
                .map(user -> {
                    userRepository.delete(user);
                    logger.info("User deleted successfully with ID: {}", userId);
                    return true;
                })
                .orElseGet(() -> {
                    logger.warn("User not found with ID: {}", userId);
                    return false;
                });
    }

    @Override
    public Optional<User> getUserDetails(Integer userId) {
        logger.info("Fetching details for user ID: {}", userId);
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getUserCart(Integer userId) {
        logger.info("Fetching cart for user ID: {}", userId);
        return userRepository.findById(userId);
    }
}