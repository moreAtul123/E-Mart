package com.example.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends an OTP email to the user.
     *
     * @param to  Recipient email address
     * @param otp One-Time Password for verification
     */
    @Override
    public void sendOtpEmail(String to, String otp) {
        String subject = "Your OTP for Registration";
        String message = "Dear User,\n\nYour OTP code is: " + otp + 
                         "\n\nThis OTP is valid for 5 minutes. Do not share it with anyone.\n\nThank you!";
        sendEmail(to, subject, message);
    }

    /**
     * Sends an email with a PDF attachment.
     *
     * @param to             Recipient email address
     * @param subject        Email subject
     * @param message        Email body content
     * @param attachmentData PDF file data in byte array format
     * @param attachmentName Name of the attached file
     */
    @Override
    public void sendEmailWithAttachment(String to, String subject, String message, byte[] attachmentData, String attachmentName) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message);
            helper.setFrom("ikhekre@gmail.com");  // Replace with a valid sender email

            // Attaching the file
            helper.addAttachment(attachmentName, new ByteArrayResource(attachmentData));

            mailSender.send(mimeMessage);
            System.out.println("✅ Email with PDF attachment sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("❌ Error sending email with attachment: " + e.getMessage());
        }
    }

    /**
     * Helper method to send a simple email (used for OTP emails).
     *
     * @param to      Recipient email address
     * @param subject Email subject
     * @param message Email body content
     */
    public void sendEmail(String to, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message);
            helper.setFrom("ikhekre@gmail.com");  // Replace with a valid sender email

            mailSender.send(mimeMessage);
            System.out.println("✅ Email sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
        }
    }
}