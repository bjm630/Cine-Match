package com.revature.servicetest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.revature.models.User;
import com.revature.repositories.UserRepoImp;
import com.revature.services.UserService;

public class UserServiceTest {

	@Mock
	private UserRepoImp userRepoImp;
	
	@InjectMocks
	private UserService userService;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	int userID = 1;
	int movieID =1;
	int id = 1;
	String comm = "comment";
	List<User> users = new ArrayList<>();
	List<User> usersTest = new ArrayList<>();

	@Test
	public void testUserByUsername() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		
		when(userRepoImp.getUserByUsername(user.getUsername())).thenReturn(user);
		
		assertNotNull(userService.getUserByUsername(user.getUsername()));
		assertEquals("username1", user.getUsername());		
		assertEquals(null, user.getPassword());		
	}

	@Test
	public void testRegisterUser() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		
		when(userRepoImp.insertUser(user)).thenReturn(true);
		
		assertTrue(userService.registerUser(user));
		assertEquals("first1", user.getFirstName());		
		assertEquals("last1", user.getLastName());		
	}

}
