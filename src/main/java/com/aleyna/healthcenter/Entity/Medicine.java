package com.aleyna.healthcenter.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String ilacAdi;

    @Column
    private String etkenMadde; // Alerji kontrolleri için kritik

    @Column
    private Integer kullanimSuresi; // Gün cinsinden

    @Column
    private String dozaj; // Örn: "Günde 2 defa", "Sabah-Akşam"

    @Column
    private LocalDate baslangicTarihi;

    @Column
    private LocalDate bitisTarihi; // 3 gün kala bildirim göndermek için kullanılacak

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @Column
    private Boolean raporluMu = false; // Raporlu hasta bildirimleri için
}