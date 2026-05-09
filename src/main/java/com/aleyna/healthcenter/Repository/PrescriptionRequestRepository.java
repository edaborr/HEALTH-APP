package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.PrescriptionRequest;
import com.aleyna.healthcenter.Entity.PrescriptionStatus;
import com.aleyna.healthcenter.Entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRequestRepository extends JpaRepository<PrescriptionRequest, Integer> {
    List<PrescriptionRequest> findByDoctorIdAndDurum(Integer doctorId, RequestStatus durum);
    List<PrescriptionRequest> findByPatientIdOrderByTalepTarihiDesc(Integer patientId);
    Integer countByDurum(RequestStatus durum);
}