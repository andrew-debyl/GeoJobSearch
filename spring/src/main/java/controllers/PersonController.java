package com.cis3760.digimind.application.controllers;

import com.cis3760.digimind.application.entities.Person;
import com.cis3760.digimind.application.repositories.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping(path = "/api/people")
    public ResponseEntity<List<Person>> getPeople() {
        List<Person> people = personRepository.findAll();
        return ResponseEntity.ok(people);
    }
}
