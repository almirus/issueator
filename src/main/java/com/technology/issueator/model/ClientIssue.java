package com.technology.issueator.model;

import lombok.Data;

@Data
public class ClientIssue {
    String title;
    String discriptionl;
    String base64FileBody;
    String log;
}
