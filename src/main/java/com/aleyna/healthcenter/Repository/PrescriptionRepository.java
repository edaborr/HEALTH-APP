package com.aleyna.healthcenter.Repository;

import com.aleyna.healthcenter.Entity.Prescription;
import com.aleyna.healthcenter.Entity.PrescriptionStatus; // Doğru Enum tipini ekledik
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    Prescription findByBarkod(String barkod);

    List<Prescription> findByPatientIdAndOlusturulmaTarihiAfter(Integer patientId, LocalDate tarih);

    List<Prescription> findByPatientIdOrderByOlusturulmaTarihiDesc(Integer patientId);

    // DEĞİŞİKLİK BURADA:
    // Değişken ismin 'status' olduğu için metot 'countByStatus' olmalı.
    Integer countByStatus(PrescriptionStatus status);
}