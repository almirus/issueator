package com.technology.issueator.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class IssueResponse {
    private String id;
    private String key;
    private String self;
}
