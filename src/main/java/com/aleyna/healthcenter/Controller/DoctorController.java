package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Doctor;
import com.aleyna.healthcenter.Service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DoctorController {
    @Autowired
    private DoctorService doctorService;
    @GetMapping("/doktor/bilgileri")
    public Doctor doktorBilgilerniGetir(@RequestParam Integer userId){
        return doctorService.doktorBilgilerniGetir(userId);
    }

}
