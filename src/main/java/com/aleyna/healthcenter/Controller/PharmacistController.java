package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Pharmacist;
import com.aleyna.healthcenter.Service.PatientService;
import com.aleyna.healthcenter.Service.PharmacistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PharmacistController {
    @Autowired
    private PharmacistService pharmacistService;
    @GetMapping("/eczaci/bilgileri")
    public Pharmacist eczaciBilgileriniGetir(@RequestParam Integer userId){
        return pharmacistService.eczaciBilgileriniGetir(userId);
    }
}
