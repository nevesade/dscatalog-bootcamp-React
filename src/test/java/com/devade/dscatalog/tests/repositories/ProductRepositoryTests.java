package com.devade.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devade.dscatalog.entities.Product;
import com.devade.dscatalog.repositories.CategoryRepository;
import com.devade.dscatalog.repositories.ProductRepository;
import com.devade.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryrepository;
	
	
	
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts = 25L;
	private long countPCGamerProducts = 21L;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp()  throws Exception{
		existingId = 1L;
		nonExistingId = 1212L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		
	}
	
	
	
	@Test
	public  void ShouldreturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc Gamer";
	
		
		Page<Product> result = repository.find(null,  name,  pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
		
	}
	

	@Test
	public  void findShouldreturnProductsWhenCategoryExists() {
		
		//String name = "";
		String categories = "";
	
		
		Page<Product> result = repository.find(null,   categories, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}
	
	
	@Test
	public  void findShouldreturnProductsWhenNameIsEmpty() {
		
		String name = "";
	
		
		Page<Product> result = repository.find(null,  name,  pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}
	
	
	

	
	
	@Test
	public  void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
		
	}
	
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existingId);
		
		Optional<Product>  result = repository.findById(existingId);
		
		
		//result.isPresent();
		
		Assertions.assertFalse(result.isPresent());
	}
	
	
	@Test
	public void deleteShouldThrowsEmptyResultDataAccessExceptionWhenIdExists() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			
			repository.deleteById(nonExistingId);
			
			/*
			
			Optional<Product>  result = repository.findById(nonExistingId);
			
			
			//result.isPresent();
			 * 
			 * */
			 
			
			//Assertions.assertFalse(result.isPresent());
			
		});
		
		
	}
	



}
