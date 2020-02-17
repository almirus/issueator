package com.technology.issueator;

import com.technology.issueator.client.JiraClient;
import com.technology.issueator.config.FeignClientConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MockTest {
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
