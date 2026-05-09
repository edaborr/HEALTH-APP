package com.aleyna.healthcenter.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PreRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 11)
    private String tcNo;
    @Column
    private String ad;
    @Column
    private String soyad;
    @ManyToOne
    @JoinColumn
    private Role rolId;
}
