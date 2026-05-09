package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.LabResult;
import com.aleyna.healthcenter.Service.LabResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LabResultController {
    @Autowired
    private LabResultService labResultService;
    @PostMapping("/tahlil/ekle")
    public String tahlilEkle(@RequestParam Integer patientId, @RequestParam String tahlilAdi, @RequestParam Double deger){
        return labResultService.tahlilEkle(patientId, tahlilAdi, deger);
    }
    @GetMapping("/tahlil/listele")
    public List<LabResult> tahlilListele(@RequestParam Integer patientId,@RequestParam Integer sorgulayanId, @RequestParam String rol){
        return labResultService.tahlilListele(patientId,sorgulayanId,rol);
    }
}
