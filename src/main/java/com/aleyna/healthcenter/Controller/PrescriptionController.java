package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Medicine;
import com.aleyna.healthcenter.Entity.Prescription;
import com.aleyna.healthcenter.Service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;
    @PostMapping("/ilac/ekle")
    public String ilacEkle(@RequestParam Integer receteId, @RequestBody Medicine yeniİlac){
        return prescriptionService.ilacEkle(receteId, yeniİlac);
    }
    @GetMapping("/hasta/receteler")
    public List<Prescription> recetelerimiGetir(@RequestParam Integer patientId){
        return prescriptionService.recetelerimiGetir(patientId);
    }
    @PutMapping("/recete/onayla")
    public String receteOnayla(@RequestParam String barkod){
        return prescriptionService.receteOnayla(barkod);
    }
}
