package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.Pharmacist;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Repository.PharmacistRepository;
import com.aleyna.healthcenter.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PharmacistService {
    @Autowired
    private PharmacistRepository pharmacistRepository;
    @Autowired
    private UserRepository userRepository;
    public Pharmacist eczaciBilgileriniGetir(Integer userId)
    {
        User user=userRepository.findById(userId).orElse(null);
        Pharmacist eczaci=pharmacistRepository.findByUser(user);
        return eczaci;

    }
}
