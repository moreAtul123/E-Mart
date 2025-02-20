package com.example.service;

import java.util.List;
import java.util.Optional;
import com.example.entity.PaymentDetail;

public interface PaymentDetailService {
    List<PaymentDetail> getAllPaymentDetails();
    Optional<PaymentDetail> getPaymentDetailById(int id);
    PaymentDetail createPaymentDetail(PaymentDetail paymentDetail);
    PaymentDetail updatePaymentDetail(int id, PaymentDetail paymentDetail);
    boolean deletePaymentDetail(int id);
}
