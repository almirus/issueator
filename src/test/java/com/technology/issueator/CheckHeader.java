package com.technology.issueator;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CheckHeader {

    @Autowired
    private RequestInterceptor requestInterceptor;

    @Test
    public void testBasicAuthRequestInterceptor() {
        RequestTemplate template = new RequestTemplate();
        requestInterceptor.apply(template);
        Collection<String> headers = template.headers().get("Authorization");
        Assert.assertTrue(headers.iterator().next().startsWith("Basic"));
    }
    @Test
    public void testRequestInterceptor() {
        RequestTemplate template = new RequestTemplate();
        requestInterceptor.apply(template);
        Collection<String> headers = template.headers().get("Accept");
        Assert.assertTrue(headers.iterator().next().startsWith(APPLICATION_JSON_VALUE));
    }

}
