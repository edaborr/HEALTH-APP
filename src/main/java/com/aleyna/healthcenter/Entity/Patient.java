package com.aleyna.healthcenter.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String ad;

    @Column(nullable = false)
    private String soyad;

    @Enumerated(EnumType.STRING) // Enum olarak güncellendi
    private Gender cinsiyet;

    @Column(nullable = false)
    private LocalDate dogumTarihi;

    @Column(length = 5)
    private String kanGrubu;

    @Column
    private Integer kilo;

    @Column
    private Double boy;

    @Column
    private LocalDate sonTaramaTarihi; // 40 yaş ve periyodik tarama kontrolü için

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    // Akıllı bildirimlerde kullanmak için yardımcı metod
    public Integer getYas() {
        if (this.dogumTarihi == null) return null;
        return Period.between(this.dogumTarihi, LocalDate.now()).getYears();
    }
}