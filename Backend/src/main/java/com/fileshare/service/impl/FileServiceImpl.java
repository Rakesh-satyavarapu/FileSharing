package com.fileshare.service.impl;

import com.fileshare.dto.FileAccessResponse;
import com.fileshare.dto.FileUploadResponse;
import com.fileshare.exception.DownloadLimitExceededException;
import com.fileshare.exception.FileExpiredException;
import com.fileshare.exception.FileNotFoundException;
import com.fileshare.model.FileEntity;
import com.fileshare.repository.FileRepository;
import com.fileshare.service.FileService;
import com.fileshare.util.CodeGenerator;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public FileUploadResponse uploadFile(MultipartFile file,
                                         int expiryHours,
                                         int maxDownloads) {

        try {

            // 1️⃣ Generate Unique 6-digit code
            String code;
            do {
                code = CodeGenerator.generate6DigitCode();
            } while (fileRepository.findByAccessCode(code).isPresent());

            // 2️⃣ Save file physically
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            
            String uniqueFileName =
                    System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            // 3️⃣ Save metadata
            FileEntity entity = new FileEntity();
            entity.setFileName(uniqueFileName);
            entity.setFileUrl(uniqueFileName); // ✅ store only filename
            entity.setAccessCode(code);
            entity.setExpiryTime(LocalDateTime.now().plusHours(expiryHours));
            entity.setMaxDownloads(maxDownloads);
            entity.setDownloadCount(0);
            entity.setCreatedAt(LocalDateTime.now());

            fileRepository.save(entity);

            return new FileUploadResponse(code,
                    "File uploaded successfully");

        } catch (IOException e) {
            throw new RuntimeException("File upload failed");
        }
    }

    @Override
    public FileAccessResponse accessFile(String accessCode) {

        FileEntity file = fileRepository.findByAccessCode(accessCode)
                .orElseThrow(() ->
                        new FileNotFoundException("Invalid access code"));

        // Expiry validation
        if (file.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new FileExpiredException("File has expired");
        }

        // Download limit validation
        if (file.getDownloadCount() >= file.getMaxDownloads()) {
            throw new DownloadLimitExceededException("Download limit exceeded");
        }

        // Increase download count
        file.setDownloadCount(file.getDownloadCount() + 1);
        fileRepository.save(file);

        return new FileAccessResponse(file.getFileUrl(),
                "Access granted");
    }
}