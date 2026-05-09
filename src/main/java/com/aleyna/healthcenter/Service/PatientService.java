package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Repository.PatientRepository;
import com.aleyna.healthcenter.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private UserRepository userRepository;

    public Patient hastaBilgileriniGetir(Integer userId){
        User user = userRepository.findById(userId).orElse(null);
        Patient hasta=patientRepository.findByUser(user);
        return hasta;
    }
    public String hastaGuncelle(Integer userId, Integer kilo, Double boy){
        User user = userRepository.findById(userId).orElse(null);
        Patient hasta=patientRepository.findByUser(user);
        hasta.setKilo(kilo);
        hasta.setBoy(boy);
        patientRepository.save(hasta);
        return "bilgiler guncellendi.";
    }
}
