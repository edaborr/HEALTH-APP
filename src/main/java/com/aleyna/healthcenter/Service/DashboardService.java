package com.aleyna.healthcenter.Service;

import com.aleyna.healthcenter.DTO.DoctorDashboardDto;
import com.aleyna.healthcenter.DTO.PatientDashboardDto;
import com.aleyna.healthcenter.Repository.NotificationRepository;
import com.aleyna.healthcenter.Repository.PrescriptionRequestRepository;
import com.aleyna.healthcenter.Entity.RequestStatus; // Enum'ı ekledik
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private PrescriptionRequestRepository requestRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Doktor için dashboard verilerini hazırlar.
     */
    public DoctorDashboardDto getDoctorDashboardStats() {
        // 'countByStatus' yerine 'countByDurum'
        // "PENDING" yerine RequestStatus.Bekliyor kullanıyoruz
        Integer count = requestRepository.countByDurum(RequestStatus.Bekliyor);

        return new DoctorDashboardDto(count);
    }

    /**
     * Hasta için dashboard verilerini hazırlar.
     */
    public PatientDashboardDto getPatientDashboardStats(Integer patientId) {
        // Bildirim sayısını getiren mevcut metodunuz
        Integer count = notificationRepository.countByPatientIdAndOkunduBilgisiFalse(patientId);

        return new PatientDashboardDto(count);
    }
}