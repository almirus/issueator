package com.technology.issueator;

import com.fasterxml.jackson.databind.ObjectMapper;

;
import com.technology.issueator.client.JiraClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.cloud.netflix.ribbon.RibbonAutoConfiguration;
import org.springframework.cloud.netflix.ribbon.StaticServerList;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.cloud.openfeign.ribbon.FeignRibbonClientAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
public class MockFeignTest {
    private static ObjectMapper mapper = new ObjectMapper();

    @Configuration
    @EnableFeignClients(clients = {JiraClient.class})
    @ImportAutoConfiguration({
            HttpMessageConvertersAutoConfiguration.class,
            RibbonAutoConfiguration.class,
            FeignRibbonClientAutoConfiguration.class,
            FeignAutoConfiguration.class})
    @Import(UserService.class)
    static class ContextConfiguration {

        @Autowired
        Environment env;

        @Bean
        ServletWebServerFactory servletWebServerFactory(){
            return new TomcatServletWebServerFactory();
        }

        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", Integer.valueOf(this.env.getProperty("wiremock.server.port"))));
        }
    }
    @MockBean
    private JiraClient jiraClient;

    @Test
    public void getIssueTest() {
        //...
        mockSomeBehavior();
        //...
    }

    private void mockSomeBehavior() {
        //Mockito.doReturn(someKindOfUser).when(jiraClient).getIssue();
    }

    @Configuration
    @Import({FeignClientConfiguration.class})
    public static class TestConfiguration {
    }
}
