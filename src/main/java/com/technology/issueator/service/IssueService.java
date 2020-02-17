package com.technology.issueator.service;

import com.technology.issueator.model.IssueResponse;
import org.springframework.http.HttpEntity;

public interface IssueService {
    HttpEntity<IssueResponse> getIssue(String issueIdOrKey);
}
