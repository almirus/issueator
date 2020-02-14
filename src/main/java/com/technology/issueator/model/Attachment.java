package com.technology.issueator.model;

import lombok.Data;

@Data
public class Attachment {
    String id;
    String filename;
    Long size;
    String content;
    String self;
}
