package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Pharmacist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn
    private User user;

    @Column
    private String ad;
    @Column
    private String soyad;
}
