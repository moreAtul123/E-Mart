package com.example.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.PaymentDetail;
import com.example.repository.PaymentDetailRepository;

@Service
public class PaymentDetailServiceImpl implements PaymentDetailService {
    @Autowired
    private PaymentDetailRepository paymentDetailRepository;

    @Override
    public List<PaymentDetail> getAllPaymentDetails() {
        return paymentDetailRepository.findAll();
    }

    @Override
    public Optional<PaymentDetail> getPaymentDetailById(int id) {
        return paymentDetailRepository.findById(id);
    }

    @Override
    public PaymentDetail createPaymentDetail(PaymentDetail paymentDetail) {
        return paymentDetailRepository.save(paymentDetail);
    }

    @Override
    public PaymentDetail updatePaymentDetail(int id, PaymentDetail paymentDetail) {
        return paymentDetailRepository.findById(id).map(existingPayment -> {
            existingPayment.setPaymentMethod(paymentDetail.getPaymentMethod());
            existingPayment.setPaymentStatus(paymentDetail.getPaymentStatus());
            existingPayment.setOrder(paymentDetail.getOrder());
            return paymentDetailRepository.save(existingPayment);
        }).orElse(null);
    }

    @Override
    public boolean deletePaymentDetail(int id) {
        return paymentDetailRepository.findById(id).map(paymentDetail -> {
            paymentDetailRepository.delete(paymentDetail);
            return true;
        }).orElse(false);
    }
}
