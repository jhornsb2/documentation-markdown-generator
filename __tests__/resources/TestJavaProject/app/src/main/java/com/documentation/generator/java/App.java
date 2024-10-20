package com.documentation.generator.java;

/**
 * This is a simple class that returns a greeting message. This is meant for
 * testing a basic Java class.
 */
public class App {
    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println(new App().getGreeting());
    }
}
