package com.fileshare.scheduler;

import com.fileshare.model.FileEntity;
import com.fileshare.repository.FileRepository;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class FileCleanupScheduler {

    private final FileRepository fileRepository;

    public FileCleanupScheduler(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    // Runs every 1 minute
    @Scheduled(fixedRate = 60000)
    public void deleteExpiredFiles() {

        List<FileEntity> files = fileRepository.findAll();

        for (FileEntity file : files) {

            if (file.getExpiryTime().isBefore(LocalDateTime.now())) {

                try {
                	String uploadDir = System.getProperty("user.dir") + "/uploads/";
                	Path path = Paths.get(uploadDir, file.getFileUrl());

                    Files.deleteIfExists(path);
                } catch (Exception e) {
                    System.out.println("File delete failed");
                }

                fileRepository.delete(file);

                System.out.println("Deleted expired file: " +
                        file.getFileName());
            }
        }
    }
}