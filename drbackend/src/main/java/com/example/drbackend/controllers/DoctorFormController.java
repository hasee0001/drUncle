package com.example.drbackend.controllers;

import com.example.drbackend.entity.DoctorForm;
import com.example.drbackend.pojo.request.DoctorFormRequest;
import com.example.drbackend.repository.DoctorFormRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctor-forms")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorFormController {

    @Autowired
    private DoctorFormRepository doctorFormRepository;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<?> createDoctorForm(
            @RequestParam("image") MultipartFile image,
            @RequestParam("medicalDocuments") MultipartFile medicalDocuments,
            @Valid @ModelAttribute DoctorFormRequest doctorFormRequest
    ) {
        DoctorForm doctorForm = convertToEntity(doctorFormRequest);
        try {
            doctorForm.setImage(image.getBytes());
            // Save medicalDocuments accordingly
            // doctorForm.setMedicalDocuments(medicalDocuments.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error processing file uploads");
        }
        doctorFormRepository.save(doctorForm);
        return ResponseEntity.ok("Doctor Form created successfully!");
    }

    private DoctorForm convertToEntity(DoctorFormRequest doctorFormRequest) {
        return modelMapper.map(doctorFormRequest, DoctorForm.class);
    }

    // Additional endpoints for updating, deleting, and retrieving doctor forms
}
