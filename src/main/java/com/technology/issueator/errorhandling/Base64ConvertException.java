package com.technology.issueator.errorhandling;

public class Base64ConvertException extends RuntimeException  {
    public Base64ConvertException() {
        super("Cant't upload because isn't base64 image" );
    }
}
