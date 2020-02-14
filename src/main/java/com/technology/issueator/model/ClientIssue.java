package com.technology.issueator.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ClientIssue {
    @NotNull @ApiModelProperty(required = true)
    String title;
    @NotNull @ApiModelProperty(required = true)
    String description;
    String base64FileBody;
    String log;
}
