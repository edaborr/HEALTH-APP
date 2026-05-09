package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;
    @Column
    private String tip;
    @Column
    private String mesaj;
    @Column
    private LocalDate bildiriTarihi;
    @Column
    private Boolean okunduBilgisi;
}
