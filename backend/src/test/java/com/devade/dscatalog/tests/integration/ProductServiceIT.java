package com.devade.dscatalog.tests.integration;






/*
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

*/

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.devade.dscatalog.dto.ProductDTO;
import com.devade.dscatalog.services.ProductService;
import com.devade.dscatalog.services.exceptions.ResourceNotFoundException;



@SpringBootTest
@Transactional
public class ProductServiceIT {
	
	
	@Autowired
	private ProductService service;
	
	private long existingId;
	private long nonExistingid;	
	private long countTotalProducts = 25L;
	private long countPCGamerProducts = 21L;
	private PageRequest pageRequest;


	
	
	
	@BeforeEach
	void setUp() throws Exception {
		
		existingId = 1L;
		nonExistingid = 1332L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		
		}
	
	
	
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		
		//service.delete(existingId);
		
		Assertions.assertThrows(ResourceNotFoundException.class,  () ->  {
			
			service.delete(nonExistingid);
		});
		
	}
	
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		//service.delete(existingId);
		
		Assertions.assertDoesNotThrow(() ->  {
			
			service.delete(existingId);
		});
		
	}
	
	
	@Test
	public  void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
		
		String name = "Camera";
	
		
		Page<ProductDTO> result = service.findAllPaged(0L,  name,  pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
		
		
	}


	
	@Test
	public  void findAllPagedShouldreturnAllProductsWhenNameIsEmpty() {
		
		String name = " ";
	
		
		Page<ProductDTO> result = service.findAllPaged(0L,  name,  pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}
	
	
	
	@Test
	public  void findAllPagedShouldreturnAllProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc GaMeR";
	
		
		Page<ProductDTO> result = service.findAllPaged(0L,  name,  pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
		
	}
	

}
