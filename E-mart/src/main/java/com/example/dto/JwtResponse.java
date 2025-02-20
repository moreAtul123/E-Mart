package com.example.dto;

public class JwtResponse {
    private String token;
    private int userId;  // Change userId to int

    // Constructor with token and userId
    public JwtResponse(String token, int userId) {
        super();
        this.token = token;
        this.userId = userId;
    }

    // Default constructor
    public JwtResponse() {
        super();
    }

    // Getter and Setter for token
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // Getter and Setter for userId
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "JwtResponse [token=" + token + ", userId=" + userId + "]";
    }
}
