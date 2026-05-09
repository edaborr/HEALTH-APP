package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.LabResult;
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Repository.LabResultRepository;
import com.aleyna.healthcenter.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LabResultService {
    @Autowired
    private LabResultRepository labResultRepository;
    @Autowired
    private PatientRepository patientRepository;
    public String tahlilEkle(Integer patientId,String tahlilAdi,Double deger){
        Patient hasta =patientRepository.findById(patientId).orElse(null);
        if(hasta!=null){
            LabResult yeniTahlil=new LabResult();
            yeniTahlil.setPatient(hasta);
            yeniTahlil.setTahlilAdi(tahlilAdi);
            yeniTahlil.setDeger(deger);
            labResultRepository.save(yeniTahlil);
            return "tahlil basarıyla eklendi.";
        }
        else{
            return "hasta bulunamadı";
        }
    }
    public List<LabResult> tahlilListele(Integer patientId,Integer sorgulayanId, String rol) {
        if (rol.equals("HASTA")) {
            if (!sorgulayanId.equals(patientId)){
                return null;
            }
        }
        return labResultRepository.findByPatientIdOrderByTahlilTarihiDesc(patientId);
    }
}
