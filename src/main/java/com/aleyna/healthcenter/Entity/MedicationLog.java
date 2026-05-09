package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class MedicationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name="medicine_id")
    private Medicine medicine;

    @Column
    private LocalDateTime ilacSaati;
    @Column
    private Boolean alindiMi;

}
