package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.Allergy;
import com.aleyna.healthcenter.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy,Integer> {
    List<Allergy> findByPatientId(Integer patient);
}
