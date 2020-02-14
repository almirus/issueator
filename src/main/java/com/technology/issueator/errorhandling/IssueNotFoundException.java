package com.technology.issueator.errorhandling;

public class IssueNotFoundException extends RuntimeException  {
    public IssueNotFoundException(String id) {
        super("Issue not found : " + id);
    }
}
