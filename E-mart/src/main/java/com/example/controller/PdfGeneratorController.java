package com.example.controller;

import com.example.entity.Cart;
import com.example.entity.Product;
import com.example.entity.User;
import com.example.service.CartService;
import com.example.service.EmailService;
import com.example.service.UserService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/pdf")
public class PdfGeneratorController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendInvoice/{userId}")
    public ResponseEntity<String> generateAndSendInvoice(@PathVariable Integer userId) {
        try {
            Optional<User> userOptional = userService.getUserDetails(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }
            User user = userOptional.get();
            List<Cart> cartItems = cartService.getUserCart(userId);
            if (cartItems.isEmpty()) {
                return ResponseEntity.status(404).body("No cart items found for user");
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("eMart - Online Shopping Invoice", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph("\n"));

            // Invoice Header
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            document.add(new Paragraph("Invoice No: #INV202500" + userId + "    Date: " + java.time.LocalDate.now(), normalFont));
            document.add(new Paragraph("Customer Name: " + user.getName(), normalFont));
            document.add(new Paragraph("Email: " + user.getEmail(), normalFont));
            document.add(new Paragraph("Shipping Address: " + user.getAddress(), normalFont));
            document.add(new Paragraph("\n------------------------------------------------------------\n"));

            // Table Setup
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);
            table.setWidths(new float[]{3, 5, 2, 2, 2}); // Column widths

            // Table Headers
            String[] headers = {"Item Name", "Description", "Quantity", "Unit Price", "Total Price"};
            for (String header : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(5);
                table.addCell(cell);
            }

            double subtotal = 0.0;
            for (Cart item : cartItems) {
                Product product = item.getProduct();
                if (product == null) continue;

                double price = product.getPrice();
                double unitPrice = product.getPrice();
                double totalPrice = item.getQuantity() * unitPrice;
                subtotal += totalPrice;

              

                table.addCell(new Phrase(product.getProductName(), normalFont));
                table.addCell(new Phrase(product.getDescription() != null ? product.getDescription() : "N/A", normalFont));
                table.addCell(new Phrase(String.valueOf(item.getQuantity()), normalFont));
                table.addCell(new Phrase("" + String.format("%.2f", unitPrice), normalFont));
                table.addCell(new Phrase("" + String.format("%.2f", totalPrice), normalFont));
            }

            document.add(table);

            // Summary
            double tax = subtotal * 0.05;
            double discount = subtotal * 0.10;
            double grandTotal = subtotal + tax - discount;

            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Subtotal: " + String.format("%.2f", subtotal), headerFont));
            document.add(new Paragraph("Tax (5%): " + String.format("%.2f", tax), headerFont));
            document.add(new Paragraph("Discount (10%):- " + String.format("%.2f", discount), headerFont));
            document.add(new Paragraph("Grand Total: " + String.format("%.2f", grandTotal), titleFont));
            document.add(new Paragraph("\nPayment Method: Credit Card", headerFont));
            document.add(new Paragraph("\nThank you for shopping with eMart!", headerFont));

            document.close();

            // Send Email with Invoice PDF
            byte[] pdfBytes = byteArrayOutputStream.toByteArray();
            emailService.sendEmailWithAttachment(user.getEmail(), "Your eMart Invoice", "Please find your invoice attached.", pdfBytes, "Invoice.pdf");

            return ResponseEntity.ok("Invoice sent successfully to " + user.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error generating or sending invoice: " + e.getMessage());
        }
    }
}
