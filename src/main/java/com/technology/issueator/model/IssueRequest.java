package com.technology.issueator.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IssueRequest {
    IssueField fields;
}

