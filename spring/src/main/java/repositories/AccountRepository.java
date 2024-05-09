package com.cis3760.digimind.application.repositories;

import com.cis3760.digimind.application.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}
