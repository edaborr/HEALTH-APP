package com.aleyna.healthcenter.Controller;

import com.aleyna.healthcenter.Service.DashboardService;
import com.aleyna.healthcenter.DTO.DoctorDashboardDto;
import com.aleyna.healthcenter.DTO.PatientDashboardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // Bu sınıfın dış dünyaya veri sunan bir kapı olduğunu belirtir
@RequestMapping("/api/dashboard") // Tüm adreslerin başına bunu ekler
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Doktor istatistiklerini getiren kapı
    @GetMapping("/doctor")
    public DoctorDashboardDto getDoctorStats() {
        return dashboardService.getDoctorDashboardStats();
    }

    // Hastaya özel istatistikleri getiren kapı
    @GetMapping("/patient/{id}")
    public PatientDashboardDto getPatientStats(@PathVariable Integer id) {
        return dashboardService.getPatientDashboardStats(id);
    }
}