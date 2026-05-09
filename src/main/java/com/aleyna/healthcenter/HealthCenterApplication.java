package com.aleyna.healthcenter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // Dikkat: Sonunda noktalı virgül yok!
public class HealthCenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthCenterApplication.class, args);
    }

}