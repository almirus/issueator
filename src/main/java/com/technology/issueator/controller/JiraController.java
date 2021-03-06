package com.technology.issueator.controller;


import com.technology.issueator.model.Attachment;
import com.technology.issueator.model.ClientIssue;
import com.technology.issueator.model.IssueResponse;
import com.technology.issueator.service.IssueService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.MediaType.*;

@Slf4j
@RestController
@RequestMapping("/jira")
public class JiraController {

    private final IssueService issueService;

    @Autowired
    public JiraController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("issue/{issueIdOrKey}")
    public HttpEntity<IssueResponse> getIssue(@PathVariable String issueIdOrKey) {
        return new HttpEntity<>(issueService.getIssue(issueIdOrKey));
    }

    @PostMapping(value = "issue/{issueIdOrKey}/attachments", consumes = MULTIPART_FORM_DATA_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Attachment>> uploadAttachment(@PathVariable String issueIdOrKey, @RequestParam("attachment") MultipartFile file) throws IOException {
        log.info("M=uploadAttachment, issueIdOrKey={}",
                issueIdOrKey);
        IssueResponse issueResponse = issueService.getIssue(issueIdOrKey);
        log.info("M=getIssue, issueIdOrKey={}",
                issueResponse.getKey());

        List<Attachment> attachment = issueService.uploadAttachment(issueIdOrKey, file);
        log.info("M=uploadedFile, id={}, filename={}",
                attachment.get(0).getId(), attachment.get(0).getFilename());
        return new ResponseEntity<>(attachment, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping(value = "issue", consumes = APPLICATION_FORM_URLENCODED_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<IssueResponse> createIssue(@Validated ClientIssue clientIssue) {
        log.info("M=createIssue, clientIssue={}",
                clientIssue);

        IssueResponse issueResponse = issueService.createIssue(clientIssue);
        log.info("issueResponse={}", issueResponse);

        List<Attachment> attachments = issueService.uploadImageAttachment(issueResponse.getId(), clientIssue.getBase64FileBody());
        log.info("attachResponse={}", attachments);

        attachments = issueService.uploadLogAttachment(issueResponse.getId(), clientIssue.getLog());
        log.info("attachResponse={}", attachments);

        return new ResponseEntity<>(issueResponse, HttpStatus.CREATED);
    }

}
