package com.example.service;

public interface EmailService {
	


	void sendEmailWithAttachment(String to, String subject, String message, byte[] attachmentData,
			String attachmentName);
	
	void sendOtpEmail(String to, String otp);
    void sendEmail(String to, String subject, String message);

}