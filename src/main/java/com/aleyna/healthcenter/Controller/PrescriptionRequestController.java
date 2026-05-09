package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Medicine;
import com.aleyna.healthcenter.Entity.PrescriptionRequest;
import com.aleyna.healthcenter.Entity.RequestStatus;
import com.aleyna.healthcenter.Service.PrescriptionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/talepler")
public class PrescriptionRequestController {
    @Autowired
    private PrescriptionRequestService prescriptionRequestService;

    @PostMapping("/olustur")
    public String talepOlustur(@RequestParam Integer patientId, @RequestParam Integer doctorId, @RequestParam Integer medicineId,
                               @RequestParam String sikayet, @RequestParam Boolean hamilelikSuphesi, @RequestParam String bilinenAlerji,
                               @RequestParam String kronikHastalik, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate bitisTarihi) {
        return prescriptionRequestService.talepOlustur(patientId, doctorId, medicineId, sikayet, hamilelikSuphesi, bilinenAlerji, kronikHastalik, bitisTarihi);
    }

    @PostMapping("/degerlendir")
    public String talepDegerlendir(@RequestParam Integer talepId, @RequestParam RequestStatus yeniDurum, @RequestParam(required = false) String redAciklamasi) {
        return prescriptionRequestService.talepDegerlendir(talepId, yeniDurum, redAciklamasi);
    }

    @GetMapping("/doktor/bekleyen")
    public List<PrescriptionRequest> doktorunBekleyenTalepleri(@RequestParam Integer doctorId){
        return prescriptionRequestService.doktorunBekleyenTalepleri(doctorId);
    }

    @GetMapping("/hasta/bekleyen")
    public List<PrescriptionRequest> hastaninTalepGecmisi(@RequestParam Integer patientId){
        return prescriptionRequestService.hastaninTalepGecmisi(patientId);
    }
    @GetMapping("/ilac/ara")
    public List<Medicine> ilacAra(@RequestParam String ilacAdi){
        return prescriptionRequestService.ilacAra(ilacAdi);
    }
}

