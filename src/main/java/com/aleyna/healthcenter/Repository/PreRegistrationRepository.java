package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.PreRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreRegistrationRepository extends JpaRepository<PreRegistration,Integer> {
    public PreRegistration findByTcNo(String tcNo);

}

