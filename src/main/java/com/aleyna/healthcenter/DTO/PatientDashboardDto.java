package com.aleyna.healthcenter.DTO;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDashboardDto {
    private Integer unreadNotificationCount;
}
