package com.technology.issueator.service;

import com.technology.issueator.client.JiraClient;
import com.technology.issueator.errorhandling.Base64ConvertException;
import com.technology.issueator.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueService {
    private final JiraClient jiraClient;
    @Value("${jira.issue.project.key}")
    private String projectKey;
    @Value("${jira.issue.issuetype.id}")
    private String issueType;
    @Value("${jira.issue.priority.id}")
    private String issuePriority;

    public IssueService(JiraClient jiraClient) {
        this.jiraClient = jiraClient;
    }

    public IssueResponse getIssue(String issueIdOrKey) {
        return jiraClient.getIssue(issueIdOrKey, "summary");
    }

    public List<Attachment> uploadAttachment(String issueIdOrKey, MultipartFile file) throws IOException {
        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };
        multiValueMap.add("file", contentsAsResource);
        return jiraClient.uploadAttachment("no-check", issueIdOrKey, multiValueMap);
    }

    public List<Attachment> uploadAttachment(String issueIdOrKey, String base64body, String log) {
        MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
        if (!base64body.isEmpty()) {
            String[] part = base64body.split(",");
            try {
                final byte[] decoded64 = Base64.getDecoder().decode(part[1]);
                ByteArrayResource contentsAsResource = new ByteArrayResource(decoded64) {
                    @Override
                    public String getFilename() {
                        return "screenshot.png";
                    }
                };
                multiValueMap.add("file", contentsAsResource);
            } catch (ArrayIndexOutOfBoundsException | IllegalArgumentException iae) {
                throw new Base64ConvertException();
            }
        }
        if (!log.isEmpty()) {
            ByteArrayResource contentsAsResource = new ByteArrayResource(log.getBytes()) {
                @Override
                public String getFilename() {
                    return "exception.log";
                }
            };
            multiValueMap.add("file", contentsAsResource);
        }
        return jiraClient.uploadAttachment("no-check", issueIdOrKey, multiValueMap);
    }

    public IssueResponse createIssue(ClientIssue clientIssue) {
        IssueRequest issueRequest = IssueRequest.builder().fields(
                IssueField.builder().summary(clientIssue.getTitle())
                        .description(clientIssue.getDescription())
                        .project(new IssueProject(projectKey))
                        .issuetype(new IssueType(issueType))
                        .priority(new IssuePriority(issuePriority))
                        .components(
                                Arrays.stream(new String[]{})
                                        .map(IssueComponent::new)
                                        .collect(Collectors.toList()))
                        .build()
        ).build();
        return jiraClient.createIssue(issueRequest);
    }
}
