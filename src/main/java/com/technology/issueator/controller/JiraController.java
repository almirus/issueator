package com.technology.issueator.controller;


import com.technology.issueator.client.JiraClient;
import com.technology.issueator.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.*;

@Slf4j
@RestController
@RequestMapping("/jira")
public class JiraController {
    private final JiraClient jiraClient;
    private final Environment env;

    @Autowired
    public JiraController(JiraClient jiraClient, Environment env) {
        this.jiraClient = jiraClient;
        this.env = env;
    }

    @GetMapping("issue/{issueIdOrKey}")
    public HttpEntity<IssueResponse> getIssue(@PathVariable String issueIdOrKey) {
        return new HttpEntity<>(jiraClient.getIssue(issueIdOrKey, "summary"));
    }

    @PostMapping(value = "issue/{issueIdOrKey}/attachments", consumes = MULTIPART_FORM_DATA_VALUE, produces = APPLICATION_JSON_VALUE)
    public Map uploadAttachment(@PathVariable String issueIdOrKey, @RequestParam("attachment") MultipartFile file) throws IOException {
        log.info("M=uploadAttachment, issueIdOrKey={}",
                issueIdOrKey);
        IssueResponse issueResponse = jiraClient.getIssue(issueIdOrKey, "summary");
        log.info("M=getIssue, issueIdOrKey={}",
                issueResponse.getKey());
        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };
        multiValueMap.add("file", contentsAsResource);
        List<Attachment> attachment = jiraClient.uploadAttachment("no-check", issueIdOrKey, multiValueMap);
        log.info("M=uploadedFile, id={}, filename={}",
                attachment.get(0).getId(), attachment.get(0).getFilename());
        return Collections.singletonMap("id", attachment.get(0).getId());
    }

    @PostMapping(value = "issue", consumes = APPLICATION_FORM_URLENCODED_VALUE, produces = APPLICATION_JSON_VALUE)
    public HttpEntity<IssueResponse> createIssue(@Validated ClientIssue clientIssue) {
        log.info("M=createIssue, project={}, issueType={}, priority={}",
                env.getProperty("jira.issue.project.key"), env.getProperty("jira.issue.issuetype.id"), env.getProperty("jira.issue.priority.id"));
        IssueRequest issueRequest = IssueRequest.builder().fields(
                IssueField.builder().summary(clientIssue.getTitle())
                        .description(clientIssue.getDescription())
                        .project(new IssueProject(env.getProperty("jira.issue.project.key")))
                        .issuetype(new IssueType(env.getProperty("jira.issue.issuetype.id")))
                        .priority(new IssuePriority(env.getProperty("jira.issue.priority.id")))
                        .components(
                                Arrays.stream(new String[]{})
                                        .map(IssueComponent::new)
                                        .collect(Collectors.toList()))
                        .build()
        ).build();
        IssueResponse issueResponse = jiraClient.createIssue(issueRequest);
        log.info("issueResponse={}", issueResponse);

        if (!clientIssue.getBase64FileBody().isEmpty()) {
            MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
            String[] part = clientIssue.getBase64FileBody().split(",");

            final byte[] decoded64 = Base64.getDecoder().decode(part[1]);
            ByteArrayResource contentsAsResource = new ByteArrayResource(decoded64) {
                @Override
                public String getFilename() {
                    return "screenshot.png";
                }
            };
            multiValueMap.add("file", contentsAsResource);
            List<Attachment> attachment = jiraClient.uploadAttachment("no-check", issueResponse.getId(), multiValueMap);
            log.info("attachResponse={}", attachment);
        }
        return new HttpEntity<>(issueResponse);
    }

}
