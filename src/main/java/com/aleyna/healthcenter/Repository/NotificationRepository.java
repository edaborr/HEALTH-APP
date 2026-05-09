package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.Notification;
import com.aleyna.healthcenter.Entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    List<Notification> findByPatientIdAndOkunduBilgisiFalse(Integer patientId);
    boolean existsByPatientIdAndTipAndOkunduBilgisiFalse(Integer patientId, NotificationType tip);
    Integer countByPatientIdAndOkunduBilgisiFalse(Integer patientId);
}
