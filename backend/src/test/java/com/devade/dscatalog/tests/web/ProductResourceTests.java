package com.devade.dscatalog.tests.web;



import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.devade.dscatalog.dto.ProductDTO;
import com.devade.dscatalog.services.ProductService;
import com.devade.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devade.dscatalog.tests.factory.ProductFactory;


@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;

	@Value("${security.oauth2.client.client-id}")
	private String clientId;
	
	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;
	
	private Long existingId;
	private Long nonExistingId;
	private ProductDTO newProductDTO;
	private ProductDTO existingProductDTO;
	private PageImpl<ProductDTO> page;

	
	
	@BeforeEach
	void setUp() throws Exception{
		
		existingId = 1L;
		nonExistingId = 2L;
		
		newProductDTO = ProductFactory.createProductDTO(null);
		existingProductDTO = ProductFactory.createProductDTO(existingId);
		
		
		page = new PageImpl<>(List.of(existingProductDTO));
		
		when(service.findById(existingId)).thenReturn(existingProductDTO);
		when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		when(service.findAllPaged(any(), anyString(), any())).thenReturn(page);
		
	}
	
	
	
	
	@Test
	public void findAllShouldReturnPage()  throws Exception {
		
		
		ResultActions result = 
		mockMvc.perform(get("/products")
				//.contentType(org.springframework.http.MediaType.APPLICATION_JSON)
				.accept(org.springframework.http.MediaType.APPLICATION_JSON));
		
		
				result.andExpect(status().isOk());
		
	}
	
	
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists()  throws Exception {
		
		
		ResultActions result = 
		mockMvc.perform(get("/products/{id}", existingId)
				.accept(org.springframework.http.MediaType.APPLICATION_JSON));
		
		
				result.andExpect(status().isOk());
		
	}
	
	

	@Test
	public void dindByIdShouldReturnProductWhenDoesNotExists() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", existingId)
						.accept(org.springframework.http.MediaType.APPLICATION_JSON));
				
				
						result.andExpect(status().isNotFound());
						
		
	}
	
	
	
	/*
	private String obtainAccessToken(String username, String password) throws Exception {
		 
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("grant_type", "password");
	    params.add("client_id", clientId);
	    params.add("username", username);
	    params.add("password", password);
	 
	    ResultActions result 
	    	= mockMvc.perform(post("/oauth/token")
	    		.params(params)
	    		//.with(httpBasic(clientId, clientSecret))
	    		.accept("application/json;charset=UTF-8"))
	        	.andExpect(status().isOk())
	        	.andExpect(content().contentType("application/json;charset=UTF-8"));
	 
	    String resultString = result.andReturn().getResponse().getContentAsString();
	 
	    JacksonJsonParser jsonParser = new JacksonJsonParser();
	    return jsonParser.parseMap(resultString).get("access_token").toString();


	
	
	}	
	
	
	*/
	
		
	
}