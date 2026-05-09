package com.aleyna.healthcenter.Entity;
import com.aleyna.healthcenter.Entity.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Table(name = "app_user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique=true,length = 11)
    @NotBlank()
    private String tcNo;

    @Column
    @Size(min=8 ,max=12)
    private String sifre;

    @ManyToOne
    @JoinColumn
    private Role rolAdi;
}
