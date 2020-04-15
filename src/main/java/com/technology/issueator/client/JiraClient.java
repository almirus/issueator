package com.technology.issueator.client;


import com.technology.issueator.model.Attachment;
import com.technology.issueator.model.IssueRequest;
import com.technology.issueator.model.IssueResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@FeignClient(name = "issue-client", url = "${jira.server}", configuration = com.technology.issueator.config.FeignClientConfiguration.class)
public interface JiraClient {
    @PostMapping("/rest/api/2/issue")
    IssueResponse createIssue(@RequestBody IssueRequest issueRequest);

    @PostMapping(value = "/rest/api/2/issue/{issueIdOrKey}/attachments",
            consumes = MULTIPART_FORM_DATA_VALUE,
            produces = APPLICATION_JSON_VALUE,
            headers = "X-Atlassian-Token=no-check")
    List<Attachment> uploadAttachment(@PathVariable String issueIdOrKey,
                                      @RequestPart(name = "file") MultiValueMap<String, Object> file);

    @GetMapping("/rest/api/2/issue/{issueIdOrKey}")
    IssueResponse getIssue(@PathVariable String issueIdOrKey, @RequestParam(value = "fields", defaultValue = "summary") String fields);

}
