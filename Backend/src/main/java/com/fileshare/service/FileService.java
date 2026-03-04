package com.fileshare.service;

import com.fileshare.dto.FileUploadResponse;
import com.fileshare.dto.FileAccessResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    FileUploadResponse uploadFile(MultipartFile file,
                                  int expiryHours,
                                  int maxDownloads);

    FileAccessResponse accessFile(String accessCode);
}