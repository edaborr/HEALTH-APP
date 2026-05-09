package com.aleyna.healthcenter.Service;

import com.aleyna.healthcenter.Entity.*;
import com.aleyna.healthcenter.Repository.MedicineRepository;
import com.aleyna.healthcenter.Repository.NotificationRepository;
import com.aleyna.healthcenter.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public void checkHealthRules(Patient patient) {
        LocalDate dogumTarihi = patient.getDogumTarihi();
        LocalDate bugun = LocalDate.now();

        // Yaş Hesabı
        int yas = Period.between(dogumTarihi, bugun).getYears();

        // KURAL 1: 40 YAŞ ÜSTÜ KADIN TARAMASI
        if (yas >= 40 && patient.getCinsiyet() == Gender.Kadın) {
            if (patient.getSonTaramaTarihi() == null || Period.between(patient.getSonTaramaTarihi(), bugun).getYears() >= 2) {

                boolean durum = notificationRepository.existsByPatientIdAndTipAndOkunduBilgisiFalse(patient.getId(), NotificationType.Tarama);

                if (!durum) {
                    Notification bildirim = new Notification();
                    bildirim.setPatient(patient);
                    bildirim.setTip(NotificationType.Tarama.name()); // String hatası alıyorsan .name() ekledim
                    bildirim.setMesaj("Sayın " + patient.getAd() + ", Mammografi ve HPV tarama vaktiniz gelmiştir. Erken teşhis hayat kurtarır.");
                    bildirim.setOkunduBilgisi(false);
                    bildirim.setBildiriTarihi(bugun);
                    notificationRepository.save(bildirim);
                }
            }
        }

        // KURAL 2: RAPORLU İLAÇ BİTİŞİNE 3 GÜN KALA
        List<Medicine> ilaclar = medicineRepository.findByPatientId(patient.getId());

        for (Medicine ilac : ilaclar) {
            if (ilac.getBitisTarihi() != null && ilac.getRaporluMu()) {
                long gunFarki = ChronoUnit.DAYS.between(bugun, ilac.getBitisTarihi());

                if (gunFarki == 3) {
                    // Tip kontrolünde Türkçe karakter hatasını engellemek için ILAC_TAKIP kullandım
                    boolean durum = notificationRepository.existsByPatientIdAndTipAndOkunduBilgisiFalse(patient.getId(), NotificationType.İlaç_takip);

                    if (!durum) {
                        Notification bildirim = new Notification();
                        bildirim.setPatient(patient);
                        bildirim.setTip(NotificationType.İlaç_takip.name());
                        bildirim.setMesaj("Sayın " + patient.getAd() + ", " + ilac.getIlacAdi() +
                                " isimli raporlu ilacınızın bitmesine 3 gün kalmıştır. Lütfen tedavinizi aksatmayınız.");
                        bildirim.setOkunduBilgisi(false);
                        bildirim.setBildiriTarihi(bugun);
                        notificationRepository.save(bildirim);
                    }
                }
            }
        }
        // KURAL 3: VİTAMİN BİTTİKTEN 6 AY SONRA TAHLİL HATIRLATMA
        for (Medicine ilac : ilaclar) {
            if (ilac.getIlacAdi().toUpperCase().contains("VITAMIN") || ilac.getIlacAdi().toUpperCase().contains("VİTAMİN")) {

                if (ilac.getBitisTarihi() != null) {
                    LocalDate tahlilVakti = ilac.getBitisTarihi().plusMonths(6);

                    if (tahlilVakti.isEqual(bugun)) {
                        boolean durum = notificationRepository.existsByPatientIdAndTipAndOkunduBilgisiFalse(patient.getId(), NotificationType.Tahlil_hatırlatma);

                        if (!durum) {
                            Notification bildirim = new Notification();
                            bildirim.setPatient(patient);
                            bildirim.setTip(NotificationType.Tahlil_hatırlatma.name());
                            bildirim.setMesaj("Sayın " + patient.getAd() + ", vitamin kullanımınızın üzerinden 6 ay geçti. Değerlerinizi kontrol ettirmek için tahlil yaptırmanızı öneririz.");
                            bildirim.setOkunduBilgisi(false);
                            bildirim.setBildiriTarihi(bugun);
                            notificationRepository.save(bildirim);
                        }
                    }
                }
            }
        }

    }
}