package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.*;
import com.aleyna.healthcenter.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrescriptionRequestService {
    @Autowired
    private PrescriptionRequestRepository prescriptionRequestRepository;
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    public String talepOlustur(Integer patientId, Integer doctorId, Integer medicineId,
                               String sikayet, Boolean hamilelikSuphesi, String bilinenAlerji,
                               String kronikHastalik, LocalDate bitisTarihi) {

        Doctor doctor=doctorRepository.findById(doctorId).orElse(null);
        Patient patient=patientRepository.findById(patientId).orElse(null);
        Medicine medicine=medicineRepository.findById(medicineId).orElse(null);
        if (doctor == null || patient==null|| medicine==null) {
            return "hatali bilgi";
        }
        PrescriptionRequest yeniTalep=new PrescriptionRequest();
        yeniTalep.setDoctor(doctor);
        yeniTalep.setMedicine(medicine);
        yeniTalep.setPatient(patient);
        yeniTalep.setSikayet(sikayet);
        yeniTalep.setHamilelikSuphesi(hamilelikSuphesi);
        yeniTalep.setKronikHastalik(kronikHastalik);
        yeniTalep.setBilinenAlerji(bilinenAlerji);
        yeniTalep.setIlacBitisTarihi(bitisTarihi);
        yeniTalep.setDurum(RequestStatus.Bekliyor);
        prescriptionRequestRepository.save(yeniTalep);
        return "talebiniz basarılı bir sekilde oluşturuldu";
    }
    public String talepDegerlendir(Integer talepId,RequestStatus yeniDurum,String redAciklamasi){
       PrescriptionRequest mevcutTalep= prescriptionRequestRepository.findById(talepId).orElse(null);
       if(mevcutTalep==null){
           return "talep bulunamadı";
       }
       if(mevcutTalep.getDurum()!=RequestStatus.Bekliyor){
           return "talep daha önce degerlendirilmiştir";
       }
       mevcutTalep.setDurum(yeniDurum);
       if(yeniDurum==RequestStatus.Onaylandı){
           Prescription recete=new Prescription();
           recete.setPatient(mevcutTalep.getPatient());
           recete.setDoctor(mevcutTalep.getDoctor());
           recete.setGecerlilikTarihi(mevcutTalep.getIlacBitisTarihi());
           recete.setMedicines(java.util.List.of(mevcutTalep.getMedicine()));
           recete.setOlusturulmaTarihi(LocalDate.now());
           prescriptionRepository.save(recete);
       }
       else if(yeniDurum==RequestStatus.Reddedildi){
           mevcutTalep.setRedAciklamasi(redAciklamasi);
       }
        prescriptionRequestRepository.save(mevcutTalep);
        return "talep başarıyla güncellendi";
    }
    public List<PrescriptionRequest> doktorunBekleyenTalepleri(Integer doctorId){
        return prescriptionRequestRepository.findByDoctorIdAndDurum(doctorId,RequestStatus.Bekliyor);
    }
    public List<PrescriptionRequest> hastaninTalepGecmisi(Integer patientId){
        return prescriptionRequestRepository.findByPatientIdOrderByTalepTarihiDesc(patientId);
    }
    public List<Medicine> ilacAra(String ilacAdi){
        return medicineRepository.findByİlacAdiContainingIgnoreCase(ilacAdi);
    }
}
