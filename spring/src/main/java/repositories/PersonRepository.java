package com.cis3760.digimind.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cis3760.digimind.application.entities.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
