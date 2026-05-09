package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.Allergy;
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Repository.AllergyRepository;
import com.aleyna.healthcenter.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllergyService {
    @Autowired
    private AllergyRepository allergyRepository;
    @Autowired
    private PatientRepository patientRepository;
    public List<Allergy> alerjileriGetir(Integer patientId){
       return allergyRepository.findByPatientId(patientId);
    }
    public String alerjiEkle(Integer patientId,String madde){
        Patient hasta=patientRepository.findById(patientId).orElse(null);
        if(hasta!=null){
            Allergy yeniAlerji=new Allergy();
            yeniAlerji.setPatient(hasta);
            yeniAlerji.setMaddeAdi(madde);
            allergyRepository.save(yeniAlerji);
            return "alerji başarıyla eklendi.";
        }
        else {
            return "hasta bulunamadı";
        }
    }

}
