package com.devade.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devade.dscatalog.dto.CategoryDTO;
import com.devade.dscatalog.services.CategoryService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	@Autowired
	private CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll(){
		/* List<Category> list = new ArrayList<>();
		list.add(new Category(1L, "Books"));
		list.add(new Category(2L, "Electronics")); */
		
		List<CategoryDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> findById( @PathVariable Long id){
		CategoryDTO list = service.findById(id);
		return ResponseEntity.ok().body(list);
	}
}
