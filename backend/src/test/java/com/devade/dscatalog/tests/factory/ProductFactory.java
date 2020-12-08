package com.devade.dscatalog.tests.factory;

import java.time.Instant;

import com.devade.dscatalog.dto.ProductDTO;
import com.devade.dscatalog.entities.Category;
import com.devade.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createProduct() {
		
		 Product product =  new Product(1L, "Phone", "Good Phone", 8787.0, "https:img.com/img.png", Instant.parse("2020-07-13T20:50:07.12345Z"));
		 product.getCategories().add(new Category(1L, null));
		 return product;
	}
	
	public static ProductDTO createProductDTO() {
		
		Product product = createProduct();
		
		return new ProductDTO(product, product.getCategories());
	}
	
	
public static ProductDTO createProductDTO(Long id) {
		
	ProductDTO  dto = createProductDTO();
	dto.setId(id);
	return dto;
	}

}
