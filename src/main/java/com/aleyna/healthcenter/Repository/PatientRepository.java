package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.Doctor;
import com.aleyna.healthcenter.Entity.Patient;
import com.aleyna.healthcenter.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer> {
    Patient findByUser(User user);
    List<Patient> findByDoctor(Doctor doctor);

}
