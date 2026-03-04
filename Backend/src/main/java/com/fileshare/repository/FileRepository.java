package com.fileshare.repository;

import com.fileshare.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    Optional<FileEntity> findByAccessCode(String accessCode);
}