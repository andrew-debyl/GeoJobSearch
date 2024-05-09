package com.cis3760.digimind.application.controllers;

import com.cis3760.digimind.application.entities.Account;
import com.cis3760.digimind.application.repositories.AccountRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(AccountsController.class)
public class AccountsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountRepository accountRepository;

    @Test
    public void getAllAccounts_ShouldReturnAccounts() throws Exception {
        Account account = new Account();
        account.setUsername("user1");

        given(accountRepository.findAll()).willReturn(Collections.singletonList(account));

        mockMvc.perform(get("/api/accounts/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("user1"));
    }

    @Test
    public void getAccountById_ShouldReturnAccount() throws Exception {
        Account account = new Account();
        account.setAccountId(1);
        account.setUsername("user1");

        given(accountRepository.findById(1)).willReturn(Optional.of(account));

        mockMvc.perform(get("/api/accounts/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user1"));
    }
    @Test
    public void createAccount_ShouldReturnCreatedAccount() throws Exception {
        Account account = new Account();
        account.setUsername("user2");

        given(accountRepository.save(any(Account.class))).willReturn(account);

        mockMvc.perform(post("/api/accounts/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user2\",\"password\":\"pass2\",\"email\":\"user2@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user2"));
    }

    @Test
    public void updateAccount_ShouldReturnUpdatedAccount() throws Exception {
        Account existingAccount = new Account();
        existingAccount.setAccountId(1);
        existingAccount.setUsername("user1");

        Account updatedAccount = new Account();
        updatedAccount.setUsername("user1_updated");

        given(accountRepository.findById(1)).willReturn(Optional.of(existingAccount));
        given(accountRepository.save(any(Account.class))).willReturn(updatedAccount);

        mockMvc.perform(put("/api/accounts/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1_updated\",\"password\":\"pass1\",\"email\":\"user1@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user1_updated"));
    }

    @Test
    public void updateAccount_ShouldReturnNotFoundForNonExistentAccount() throws Exception {
        given(accountRepository.findById(99)).willReturn(Optional.empty());

        mockMvc.perform(put("/api/accounts/users/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user99\",\"password\":\"pass99\",\"email\":\"user99@example.com\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void deleteAccount_ShouldReturnOkForExistingAccount() throws Exception {
        given(accountRepository.existsById(1)).willReturn(true);

        mockMvc.perform(delete("/api/accounts/users/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteAccount_ShouldReturnNotFoundForNonExistentAccount() throws Exception {
        given(accountRepository.existsById(99)).willReturn(false);

        mockMvc.perform(delete("/api/accounts/users/99"))
                .andExpect(status().isNotFound());
    }
}
