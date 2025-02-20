package com.example.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name should be between 2 to 50 characters")
    private String name;

    @Column(unique = true)
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be a 10-digit number")
    private String mobileNumber;

    @Column(unique = true)
    @Email(message = "Please provide a valid email address")
    private String email;

    private String address;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Column(length = 255) // Necessary for hashed passwords
    @JsonIgnore
    private String password;

    @JsonIgnore
    private String creditCardInfo;
    
    @Column(name = "supercoins") 
    private int superCoins;

    public int getSuperCoins() {
		return superCoins;
	}

	public void setSuperCoins(int superCoins) {
		this.superCoins = superCoins;
	}

	@JsonIgnore
    private String internetBankingInfo;

    private boolean member; // Changed from isMember to member

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion when fetching users with orders
    private List<Order> orders;

    // Getters and setters for the fields

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    // Setter for password (hashed password)
    public void setPassword(String password) {
        this.password = password;
    }

    public String getCreditCardInfo() {
        return creditCardInfo;
    }

    public void setCreditCardInfo(String creditCardInfo) {
        this.creditCardInfo = creditCardInfo;
    }

    public String getInternetBankingInfo() {
        return internetBankingInfo;
    }

    public void setInternetBankingInfo(String internetBankingInfo) {
        this.internetBankingInfo = internetBankingInfo;
    }

    public boolean isMember() {
        return member;
    }

    public void setMember(boolean member) {
        this.member = member;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    // Add methods to manage the relationship with the orders

    public void addOrder(Order order) {
        orders.add(order);
        order.setUser(this); // Set the user reference in the order
    }

    public void removeOrder(Order order) {
        orders.remove(order);
        order.setUser(null); // Remove the user reference in the order
    }
}
