package com.fileshare.dto;

public class FileAccessResponse {

    private String fileUrl;
    private String message;

    public FileAccessResponse() {}

    public FileAccessResponse(String fileUrl, String message) {
        this.fileUrl = fileUrl;
        this.message = message;
    }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}