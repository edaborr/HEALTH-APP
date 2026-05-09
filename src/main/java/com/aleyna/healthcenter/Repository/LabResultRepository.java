package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.LabResult;
import com.aleyna.healthcenter.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabResultRepository extends JpaRepository<LabResult,Integer> {
    List<LabResult> findByPatientIdOrderByTahlilTarihiDesc(Integer patientId);
}
