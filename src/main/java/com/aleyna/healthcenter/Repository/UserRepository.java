package com.aleyna.healthcenter.Repository;
import com.aleyna.healthcenter.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public User findByTcNoAndSifre(String tcNo,String sifre);
    public User findByTcNo(String tcNo);
}
