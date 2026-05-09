package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.*;
import com.aleyna.healthcenter.Repository.AllergyRepository;
import com.aleyna.healthcenter.Repository.MedicineRepository;
import com.aleyna.healthcenter.Repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private AllergyRepository allergyRepository;
    public String ilacEkle(Integer receteId, Medicine yeniİlac){
        Prescription recete=prescriptionRepository.findById(receteId).orElse(null);
        Patient hasta=recete.getPatient();
        List<Allergy> alerjiler=allergyRepository.findByPatientId(hasta.getId());
            for(Allergy alerji:alerjiler){
                if(alerji.getMaddeAdi().equalsIgnoreCase(yeniİlac.getEtkenMadde())){
                    return "dikkat, hastanın "+yeniİlac.getEtkenMadde()+" maddesine alerjisi var";
                }
            }
            yeniİlac.setPrescription(recete);
            medicineRepository.save(yeniİlac);
            return "hastaya "+yeniİlac.getIlacAdi()+" ilacı yazılabilir.";

    }
    public List<Prescription> recetelerimiGetir(Integer patientId){
        return prescriptionRepository.findByPatientIdOrderByOlusturulmaTarihiDesc(patientId);
    }
    public String receteOnayla(String barkod){
        Prescription recete=prescriptionRepository.findByBarkod(barkod);
            if(recete==null){
                return "barkod bulunamadı";
            }
            else if(recete.getStatus()== PrescriptionStatus.Tamamlandı){
                return "reçetedeki ilaçlar aha önce teslim edilmiş";
            }
            else if(recete.getStatus()==PrescriptionStatus.Süresi_doldu){
                return "recetenin süresi dolmuştur";
            }
            else{
                recete.setStatus(PrescriptionStatus.Tamamlandı);
                prescriptionRepository.save(recete);
                return "ilaçlar teslim edildi,iyi günler";
            }
    }
}
