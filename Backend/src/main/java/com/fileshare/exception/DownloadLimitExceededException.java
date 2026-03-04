package com.fileshare.exception;

public class DownloadLimitExceededException extends RuntimeException {
    public DownloadLimitExceededException(String message) {
        super(message);
    }
}