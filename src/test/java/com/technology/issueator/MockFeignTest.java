package com.technology.issueator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.technology.issueator.client.JiraClient;
import com.technology.issueator.model.IssueResponse;
import com.technology.issueator.service.IssueService;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.cloud.contract.wiremock.WireMockSpring;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class MockFeignTest {
    public static WireMockServer wiremock = new WireMockServer(WireMockSpring.options().dynamicPort());
    private static ObjectMapper mapper = new ObjectMapper();
    @Autowired
    private IssueService issueService;

    @BeforeAll
    static void setupClass() {
        wiremock.start();
    }

    @AfterAll
    static void clean() {
        wiremock.shutdown();
    }

    @AfterEach
    void after() {
        wiremock.resetAll();
    }

    @Test
    public void getIssueTest() throws Exception {
        String expected = mapper.writeValueAsString(getIssue());

        wiremock.stubFor(get(urlEqualTo("/users"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody(expected)
                )
        );

        String actual = mapper.writeValueAsString(issueService.getIssue("CR-1"));
        assertEquals(expected, actual);
    }

    private IssueResponse getIssue() {

        return IssueResponse.builder()
                .id("1250")
                .key("cr-5")
                .self("url").build();
    }

    @Configuration
    @EnableFeignClients(clients = {JiraClient.class})
    @ImportAutoConfiguration({
            FeignAutoConfiguration.class})
    @Import(IssueService.class)
    static class ContextConfiguration {

        @Autowired
        Environment env;

        @Bean
        ServletWebServerFactory servletWebServerFactory() {
            return new TomcatServletWebServerFactory();
        }

    }
}
