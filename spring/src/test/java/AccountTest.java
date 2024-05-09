package com.cis3760.digimind.application.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AccountTest {

    @Test
    void testAccountGettersAndSetters() {
        Account account = new Account();

        // Set values
        account.setAccountId(1);
        account.setUsername("testUser");
        account.setPassword("testPassword");
        account.setEmail("test@example.com");

        // Assert that getters return the correct values
        assertEquals(1, account.getAccountId());
        assertEquals("testUser", account.getUsername());
        assertEquals("testPassword", account.getPassword());
        assertEquals("test@example.com", account.getEmail());
    }
}
