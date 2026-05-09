package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.Pharmacist;
import com.aleyna.healthcenter.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacistRepository extends JpaRepository<Pharmacist,Integer> {
    Pharmacist findByUser(User user);
}
