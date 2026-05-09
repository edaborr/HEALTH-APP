package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PatientController {
    @Autowired
    private PatientService patientService;
    @GetMapping("/hasta/bilgileri")
    public Patient hastaBilgileriniGetir(@RequestParam Integer userId ){
        return patientService.hastaBilgileriniGetir(userId);
    }
    @PutMapping("/hasta/guncelle")
    public String hastaGuncelle(@RequestParam Integer userId, @RequestParam Integer kilo, @RequestParam Double boy){
        return patientService.hastaGuncelle(userId,kilo,boy);
    }
}
