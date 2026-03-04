package com.fileshare.dto;

public class FileUploadResponse {

    private String accessCode;
    private String message;

    public FileUploadResponse() {}

    public FileUploadResponse(String accessCode, String message) {
        this.accessCode = accessCode;
        this.message = message;
    }

    public String getAccessCode() { return accessCode; }
    public void setAccessCode(String accessCode) { this.accessCode = accessCode; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}