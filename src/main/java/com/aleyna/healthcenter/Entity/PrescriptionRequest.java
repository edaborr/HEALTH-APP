package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "prescription_requests") // Veritabanı tablo ismi
public class PrescriptionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient; // Talebi oluşturan hasta

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine; // Seçilen ilaç

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor; // Talebin iletildiği doktor

    @Enumerated(EnumType.STRING) // Enum'un veritabanına String (BEKLIYOR vb.) olarak yazılmasını sağlar
    private RequestStatus durum = RequestStatus.Bekliyor;

    @Column(columnDefinition = "TEXT")
    private String sikayet;

    @Column
    private Boolean hamilelikSuphesi;

    @Column
    private String bilinenAlerji;

    @Column
    private String kronikHastalik;

    @Column
    private LocalDate ilacBitisTarihi;

    @Column(columnDefinition = "TEXT")
    private String redAciklamasi;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime talepTarihi;
}