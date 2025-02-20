package com.example.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name should be between 2 to 50 characters")
    private String name;

    @Column(unique = true)
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be a 10-digit number")
    private String mobileNumber;

    @Column(unique = true)
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Column(length = 255) // Necessary for hashed passwords
    private String password;

    @NotBlank(message = "Address is required")
    private String address;  // *Added field*

    private boolean member;  // *Added field*

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() { 
        return address;
    }

    public void setAddress(String address) { 
        this.address = address;
    }

    public boolean isMember() { 
        return member;
    }

    public void setMember(boolean member) { 
        this.member = member;
    }
}