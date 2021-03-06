package com.devade.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devade.dscatalog.dto.CategoryDTO;
import com.devade.dscatalog.entities.Category;
import com.devade.dscatalog.repositories.CategoryRepository;
import com.devade.dscatalog.services.exceptions.DatabaseException;
import com.devade.dscatalog.services.exceptions.ResourceNotFoundException;

@Service 
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true )
	public Page<CategoryDTO> findAllPaged(PageRequest pageResquest){
		Page<Category> list = repository.findAll(pageResquest);
		
		return  list.map( x -> new CategoryDTO(x));
		
		
		/*
		List<CategoryDTO> listDto = new ArrayList<>();
		for(Category cat : list) {
			listDto.add(new CategoryDTO(cat));
		} 
		
		return listDto;
		
		*/
	}

	
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
		
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category  entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

	
	@Transactional
	public CategoryDTO updtate(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
		
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	
	}


	public void delete(Long id) {
		try {
			repository.deleteById(id);
		
		}
		catch(EmptyResultDataAccessException e) {
			throw new  ResourceNotFoundException("Id mot Found "  + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity Violation");
		}
	}
	
	

}
