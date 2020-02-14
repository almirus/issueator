package com.technology.issueator.controller;


import com.technology.issueator.client.JiraClient;
import com.technology.issueator.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@Slf4j
@RestController
@RequestMapping("/jira")
public class JiraController {
    private final JiraClient jiraClient;
    @Value("${jira.issue.issuetype.id}")
    private String bugId;
    @Value("${jira.issue.project.key}")
    private String projectKey;

    public JiraController(JiraClient jiraClient) {
        this.jiraClient = jiraClient;
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

    @PostMapping("issue")
    public HttpEntity<IssueResponse> createIssue(@RequestParam(value = "project", defaultValue = "${jira.issue.project.key}") String projectKey,
                                                 @RequestParam(value = "issueType", defaultValue = "${jira.issue.issuetype.id}") String issueType,
                                                 @RequestParam(value = "priority", defaultValue = "${jira.issue.priority.id}") String priority,
                                                 @RequestParam(value = "components", required = false) Optional<String[]> components,
                                                 @RequestParam(value = "base64FileBody", required = false) String base64body,
                                                 @RequestBody String title) {
        log.info("M=createIssues, project={}, issueType={}, priority={}",
                projectKey, issueType, priority);
        IssueRequest issueRequest = IssueRequest.builder().fields(
                IssueField.builder().summary(title)
                        .description(title)
                        .project(new IssueProject(projectKey))
                        .issuetype(new IssueType(issueType))
                        .priority(new IssuePriority(priority))
                        .components(
                                Arrays.stream(components.orElse(new String[]{}))
                                        .map(IssueComponent::new)
                                        .collect(Collectors.toList()))
                        .build()
        ).build();
        IssueResponse issueResponse = jiraClient.createIssue(issueRequest);
        log.info("issueResponse={}", issueResponse);

        return new HttpEntity<>(issueResponse);
    }

}
