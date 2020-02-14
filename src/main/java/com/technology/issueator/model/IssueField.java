package com.technology.issueator.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class IssueField {
    private IssueProject project;
    private IssueType issuetype;
    private String summary;
    private IssuePriority priority;
    private String description;
    private List<IssueComponent> components;
}
