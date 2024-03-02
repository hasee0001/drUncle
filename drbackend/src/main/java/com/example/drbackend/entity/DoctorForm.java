// src/main/java/com/example/drbackend/entity/DoctorForm.java

package com.example.drbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor_forms")
public class DoctorForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nmc_number", nullable = false)
    private String nmcNumber;

    @Column(name = "salutation")
    private String salutation;
    @Lob
    @Column(name = "image", nullable = false)
    private byte[] image;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String experienced;
    private String speciality;
    private String qualification;
    private String gender;
    private String description;
    private byte[] medicalDocuments;

    public void setImage(byte[] bytes) {
    }

    // Add other necessary fields

    // Constructors, getters, and setters
}
