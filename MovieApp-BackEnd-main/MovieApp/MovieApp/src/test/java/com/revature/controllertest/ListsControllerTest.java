package com.revature.controllertest;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.revature.controllers.ListsController;
import com.revature.models.Lists;
import com.revature.services.ListsService;

public class ListsControllerTest {
	
	@Mock
	private ListsService listsService;
	
	@InjectMocks
	private ListsController listsController;
	
	private MockMvc mockMvc;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(listsController).build();
	}
	
	int userID = 1;
	int movieID =1;
	List<Lists> lists = new ArrayList<>();
	
	@Test
	public void testListsByMovieID() throws Exception{
		lists.add(new Lists());
		lists.add(new Lists());
		
		when(listsService.getListsByUserID(movieID)).thenReturn(lists);
		
		mockMvc.perform(get("/lists/movieID?movieID={movieID}", movieID))
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"));

	}

	@Test
	public void testListsByUserID() throws Exception{
		lists.add(new Lists());
		lists.add(new Lists());
		
		when(listsService.getListsByUserID(userID)).thenReturn(lists);
		
		mockMvc.perform(get("/lists/userID?userID={userID}", userID))
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andReturn();
	}
	
	
	@Test
	public void testLikedByUserID() throws Exception{
		lists.add(new Lists());
		lists.add(new Lists());
		
		when(listsService.getLikedByUserID(userID)).thenReturn(lists);
		
		mockMvc.perform(get("/lists/user/likedlist?userID={userID}", userID))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andReturn();
	}
	
	@Test
	public void testLikedByMovieID() throws Exception{
		lists.add(new Lists());
		lists.add(new Lists());
		
		when(listsService.getWatchListByUserID(userID)).thenReturn(lists);
		
		mockMvc.perform(get("/lists/user/watchlist?userID={userID}", userID))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andReturn();
	}
	
}
