package com.aleyna.healthcenter.Repository;

import com.aleyna.healthcenter.Entity.Role; // Bunu ekledik
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// import javax.management.relation.Role; <-- BU SATIRI SİLDİK

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}