package com.technology.issueator.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class IssueField {
    IssueProject project;
    IssueType issuetype;
    String summary;
    IssuePriority priority;
    String description;
    List<IssueComponent> components;
}
