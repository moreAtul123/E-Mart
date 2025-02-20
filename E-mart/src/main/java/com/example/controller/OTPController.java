package com.example.controller;


import com.example.service.EmailService;
import com.example.service.OTPService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:3000")
public class OTPController {

    private final OTPService otpService;
    private final EmailService emailService;

    public OTPController(OTPService otpService, EmailService emailService) {
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOTP(@RequestParam String email) {
        String otp = otpService.generateOTP(email);
        emailService.sendOtpEmail(email, otp);
        return ResponseEntity.ok("OTP sent successfully.");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOTP(@RequestParam String email, @RequestParam String otp) {
        if (otpService.verifyOTP(email, otp)) {
            return ResponseEntity.ok("OTP verified successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid OTP.");
        }
    }
}