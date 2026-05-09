package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Allergy;
import com.aleyna.healthcenter.Service.AllergyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AllergyController {
    @Autowired
    private AllergyService allergyService;
    @GetMapping("/alerjileri/getir")
    public List<Allergy> alerjileriGetir(@RequestParam Integer patientId){
        return allergyService.alerjileriGetir(patientId);
    }
    @PostMapping("/alerji/ekle")
    public String alerjiEkle(@RequestParam Integer patientId,@RequestParam String madde){
        return allergyService.alerjiEkle(patientId, madde);
    }
}
