package com.devade.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devade.dscatalog.entities.Role;

@Repository 
public interface  RoleRepository extends JpaRepository<Role, Long> {

}
