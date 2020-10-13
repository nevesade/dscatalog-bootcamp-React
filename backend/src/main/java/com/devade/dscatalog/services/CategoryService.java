package com.devade.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devade.dscatalog.entities.Category;
import com.devade.dscatalog.repositories.CategoryRepository;

@Service 
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		return repository.findAll();
	}
	

}
