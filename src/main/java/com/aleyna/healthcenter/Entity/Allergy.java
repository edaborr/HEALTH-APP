package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Allergy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne //her alerji kaydının bir sahibi olmalı
    @JoinColumn (name = "patient_id")
    private Patient patient;

    @Column(nullable = false)
    private String maddeAdi;
}
