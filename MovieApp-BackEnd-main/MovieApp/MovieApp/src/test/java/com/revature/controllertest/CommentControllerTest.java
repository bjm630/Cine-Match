package com.revature.controllertest;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import com.revature.controllers.CommentController;
import com.revature.models.Comment;
import com.revature.services.CommentService;

public class CommentControllerTest {
	
	@Mock
	private CommentService commentService;
	
	@InjectMocks
	private CommentController commentController;
	
	private MockMvc mockMvc;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();
	}
	
	int userID = 1;
	int movieID =1;
	int id = 1;
	String comm = "comment";
	List<Comment> comments = new ArrayList<>();
	
	@Test
	public void testCommentByUserID() throws Exception{
		
		when(commentService.getCommentByUserID(userID)).thenReturn(comments);
		
		mockMvc.perform(get("/comment/userID?userID={userID}", userID))
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"));
	}
	
	@Test
	public void testCommentByMovieID() throws Exception{
		
		when(commentService.getCommentByMovieID(movieID)).thenReturn(comments);
		
		mockMvc.perform(get("/comment/movieID?movieID={movieID}", movieID))
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"));
	}

}
