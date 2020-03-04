package com.technology.issueator.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class IssueResponse {
    String id;
    String key;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String self;
    String link;
}
