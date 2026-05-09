package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine,Integer> {
    List<Medicine> findByPatientId(Integer patientId);
    List<Medicine> findByPatientIdAndBitisTarihiAfter(Integer patientId, LocalDate tarih);
    List<Medicine> findByİlacAdiContainingIgnoreCase(String ilacAdi);
}
