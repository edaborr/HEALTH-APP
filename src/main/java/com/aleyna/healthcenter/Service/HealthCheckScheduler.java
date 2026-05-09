package com.aleyna.healthcenter.Service; // Burası senin paket yolun olmalı
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;

@Component // "Bu dosyayı takip et, bu önemli bir parça!"
public class HealthCheckScheduler {

    @Autowired
    private NotificationService notificationService; // Senin yazdığın o kuralları buraya çağırıyoruz

    @Autowired
    private PatientRepository patientRepository; // Hastaları bulmak için veritabanı anahtarını alıyoruz

    @Scheduled(cron = "0 0 0 * * ?") //her gece 00.00 da kontrol olur
    public void gunlukKontrolYap() {

        // Veritabanındaki tüm hastaların listesini çıkarıyoruz
        List<Patient> tumHastalar = patientRepository.findAll();

        // Listeyi tek tek geziyoruz
        for (Patient hasta : tumHastalar) {
            // Her bir hasta için senin yazdığın o 3 kuralı (Tarama, İlaç, Vitamin) işletiyoruz
            notificationService.checkHealthRules(hasta);
        }

        System.out.println("Gece yarısı kontrolü bitti: Tüm bildirimler hazır!");
    }
}