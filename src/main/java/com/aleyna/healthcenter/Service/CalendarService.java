package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.MedicationLog;
import com.aleyna.healthcenter.Repository.MedicationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CalendarService {

    @Autowired
    private MedicationLogRepository medicationLogRepository;

    public List<MedicationLog> getGunlukPlan(Integer patientId, LocalDate tarih) {
        // Gelen tarihi günün başlangıç ve bitiş saatlerine çeviriyoruz
        LocalDateTime startOfDay = tarih.atStartOfDay();
        LocalDateTime endOfDay = tarih.atTime(23, 59, 59);

        // Yeni metodu çağırıyoruz
        return medicationLogRepository.findByPatient_IdAndIlacSaatiBetween(patientId, startOfDay, endOfDay);
    }

    public MedicationLog ilacAlindiIsaretle(Integer logId) {
        MedicationLog log = medicationLogRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("İlaç kaydı bulunamadı!"));

        log.setAlindiMi(true);
        log.setIlacSaati(LocalDateTime.now());

        return medicationLogRepository.save(log);
    }
}