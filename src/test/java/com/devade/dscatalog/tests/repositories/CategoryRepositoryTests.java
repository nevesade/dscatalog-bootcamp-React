package com.devade.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devade.dscatalog.entities.Category;
import com.devade.dscatalog.entities.Product;
import com.devade.dscatalog.repositories.CategoryRepository;

@DataJpaTest
public class CategoryRepositoryTests {
	
	@Autowired
	private CategoryRepository repository;
	
	private long existingId;
	private PageRequest pageRequest;
	
	
	@BeforeEach
	void setUp() throws Exception{
		
		
		existingId = 1L;
		pageRequest = PageRequest.of(0, 10);
		
	}
	
	
	

	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existingId);
		
		Optional<Category>  result = repository.findById(existingId);
		
		
		//result.isPresent();
		
		Assertions.assertFalse(result.isPresent());
	}
	
	/*
	
	@Test
	public  void findShouldreturnCategorysWhenNameExists() {
		
		String name = "";
	
		
		Page<Product> result = repository.find(null,  "",  pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}
	
	*/
}
