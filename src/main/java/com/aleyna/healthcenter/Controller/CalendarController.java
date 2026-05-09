package com.aleyna.healthcenter.Controller;

import com.aleyna.healthcenter.Entity.MedicationLog;
import com.aleyna.healthcenter.Service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    // 1. Belirli bir tarihteki ilaç listesini getirir
    // Örnek: /api/calendar/plan/5?tarih=2026-05-09
    @GetMapping("/plan/{patientId}")
    public List<MedicationLog> getGunlukPlan(
            @PathVariable Integer patientId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tarih) {
        return calendarService.getGunlukPlan(patientId, tarih);
    }

    // 2. İlacı "alındı" olarak işaretler (Tik atma işlemi)
    // Örnek: /api/calendar/take/10
    @PutMapping("/take/{logId}")
    public MedicationLog ilacAlindi(@PathVariable Integer logId) {
        return calendarService.ilacAlindiIsaretle(logId);
    }
}