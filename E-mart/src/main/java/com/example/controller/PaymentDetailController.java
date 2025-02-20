package com.example.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.PaymentDetail;
import com.example.service.PaymentDetailService;

@RestController
@RequestMapping("/api/paymentdetails")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentDetailController {
    @Autowired
    private PaymentDetailService paymentDetailService;

    @GetMapping
    public List<PaymentDetail> getAllPayments() {
        return paymentDetailService.getAllPaymentDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDetail> getPaymentById(@PathVariable int id) {
        Optional<PaymentDetail> paymentDetail = paymentDetailService.getPaymentDetailById(id);
        return paymentDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public PaymentDetail createPayment(@RequestBody PaymentDetail paymentDetail) {
        return paymentDetailService.createPaymentDetail(paymentDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDetail> updatePayment(@PathVariable int id, @RequestBody PaymentDetail paymentDetail) {
        PaymentDetail updatedPayment = paymentDetailService.updatePaymentDetail(id, paymentDetail);
        return updatedPayment != null ? ResponseEntity.ok(updatedPayment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable int id) {
        return paymentDetailService.deletePaymentDetail(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
