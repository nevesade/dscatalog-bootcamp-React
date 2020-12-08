package com.devade.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

/*
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

*/

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devade.dscatalog.entities.Product;
import com.devade.dscatalog.repositories.ProductRepository;
import com.devade.dscatalog.services.ProductService;
import com.devade.dscatalog.services.exceptions.DatabaseException;
import com.devade.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devade.dscatalog.tests.factory.ProductFactory;


@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	
	@InjectMocks
	private ProductService service;
	
	
	@Mock
	private ProductRepository repository;
	
	
	private long existingId;
	private long nonExistingid;
	private long dependentId;
	private Product product;
	private PageImpl<Product> page;
	
	
	
	
	@BeforeEach
	void setUp() throws Exception {
		
		existingId = 1L;
		nonExistingid = 1332L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		page  =  new PageImpl<>(List.of(product));
		
		
		
		
		
		
		Mockito.when(repository.find(ArgumentMatchers.any(),ArgumentMatchers.anyString(),ArgumentMatchers.any()))
		.thenReturn(page);
		
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		
		
		Mockito.when(repository.findById(nonExistingid)).thenReturn(Optional.empty());
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingid);
		
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenDependetIDExists() {
		
		//service.delete(existingId);
		
		Assertions.assertThrows(DatabaseException.class,  () ->  {
			
			service.delete(dependentId);
		});
		
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
		
	}
	
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdExists() {
		
		//service.delete(existingId);
		
		Assertions.assertThrows(ResourceNotFoundException.class,  () ->  {
			
			service.delete(nonExistingid);
		});
		
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingid);
		
	}
	
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		//service.delete(existingId);
		
		Assertions.assertDoesNotThrow(() ->  {
			
			service.delete(existingId);
		});
		
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
		
	}

}
