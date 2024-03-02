package com.example.drbackend.repository;

import com.example.drbackend.entity.DoctorForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorFormRepository extends JpaRepository<DoctorForm, Long> {

}
