package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String barkod;
    @Column
    private LocalDate olusturulmaTarihi;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;

    @OneToOne
    @JoinColumn(name="talep_id")
    private PrescriptionRequest prescriptionRequest;

    @Column
    private LocalDate gecerlilikTarihi;

    @Enumerated(EnumType.STRING) // Veritabanına 0, 1 diye değil, "BEKLIYOR" diye kaydeder
    @Column(name = "durum")
    private PrescriptionStatus status;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL)
    private List<Medicine> medicines;

    @ManyToOne
    @JoinColumn(name="doctor_id")
    private Doctor doctor;
}
