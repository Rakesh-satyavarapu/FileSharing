package com.fileshare.controller;

import com.fileshare.dto.FileAccessResponse;
import com.fileshare.dto.FileUploadResponse;
import com.fileshare.model.FileEntity;
import com.fileshare.repository.FileRepository;
import com.fileshare.service.FileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileController {

    private final FileService fileService;
    private final FileRepository fileRepository;

    public FileController(FileService fileService,
                          FileRepository fileRepository) {
        this.fileService = fileService;
        this.fileRepository = fileRepository;
    }

    // 🔹 Upload API
    @PostMapping("/upload")
    public FileUploadResponse uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam int expiryHours,
            @RequestParam int maxDownloads) {

        return fileService.uploadFile(file, expiryHours, maxDownloads);
    }

    // 🔹 Access API
    @PostMapping("/access")
    public FileAccessResponse accessFile(
            @RequestParam String code) {

        return fileService.accessFile(code);
    }

    // 🔹 Download API
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String code) {

        // Validate & increment download count
        fileService.accessFile(code);

        // Get full entity to fetch original filename
        FileEntity file = fileRepository.findByAccessCode(code)
                .orElseThrow(() -> new RuntimeException("File not found"));

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        Path path = Paths.get(uploadDir, file.getFileUrl());

        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
        } catch (Exception e) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFileName() + "\"")
                .body(resource);
    }
}