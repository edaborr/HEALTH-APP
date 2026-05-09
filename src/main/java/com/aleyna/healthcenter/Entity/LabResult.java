package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class LabResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient; //tahlil hangi hastaya ait
    @Column
    private String tahlilAdi;
    @Column
    private Double deger;

    @CreationTimestamp //veritabanına kaydettiğimiz tarih
    @Column(updatable = false)
    private LocalDateTime tahlilTarihi; //hem tarih hem saat
}
