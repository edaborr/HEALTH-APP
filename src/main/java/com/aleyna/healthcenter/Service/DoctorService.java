package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.Doctor;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Repository.DoctorRepository;
import com.aleyna.healthcenter.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;
    public Doctor doktorBilgilerniGetir(Integer userId){
        User user=userRepository.findById(userId).orElse(null);
        Doctor doktor=doctorRepository.findByUser(user);
        return doktor;
    }

}
