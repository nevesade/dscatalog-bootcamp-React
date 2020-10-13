package com.devade.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devade.dscatalog.dto.CategoryDTO;
import com.devade.dscatalog.entities.Category;
import com.devade.dscatalog.repositories.CategoryRepository;
import com.devade.dscatalog.services.exceptions.EntityNotFoundException;

@Service 
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true )
	public List<CategoryDTO> findAll(){
		List<Category> list = repository.findAll();
		
		return  list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
		
		/*
		List<CategoryDTO> listDto = new ArrayList<>();
		for(Category cat : list) {
			listDto.add(new CategoryDTO(cat));
		} */
		
		
		
	}

	
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
		
	}
	

}
