package com.revature.servicetest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.revature.models.Lists;
import com.revature.models.User;
import com.revature.repositories.ListsRepoImp;
import com.revature.services.ListsService;

public class ListsServiceTest {

	@Mock
	private ListsRepoImp listsRepoImp;
	
	@InjectMocks
	private ListsService listsService;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	int userID = 1;
	int movieID =1;
	int id = 1;
	String comm = "comment";
	List<Lists> lists = new ArrayList<>();
	List<Lists> listsTest = new ArrayList<>();

	@Test
	public void testListByUserID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		lists.add(list);
		
		when(listsRepoImp.getListsByUserId(userID)).thenReturn(lists);
		
		listsTest = listsService.getListsByUserID(userID);
		
		assertNotNull(listsService.getListsByUserID(userID));
		assertEquals(0, lists.get(0).getListId());		
		assertEquals(1, lists.get(0).getMovieID());	
		assertTrue(lists.get(0).isMovieLike());
	}

	@Test
	public void testListByMovieID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		lists.add(list);
		
		when(listsRepoImp.getListsByMovieId(movieID)).thenReturn(lists);
		
		listsTest = listsService.getListsByMovieID(movieID);
		
		assertNotNull(listsService.getListsByMovieID(movieID));
		assertEquals(0, lists.get(0).getListId());		
		assertEquals(1, lists.get(0).getMovieID());	
		assertTrue(lists.get(0).isMovieLike());
	}

	@Test
	public void testLikedByUserID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		lists.add(list);
		
		when(listsRepoImp.getLikedByUserId(userID)).thenReturn(lists);
		
		listsTest = listsService.getLikedByUserID(userID);
		
		assertNotNull(listsService.getLikedByUserID(userID));
		assertEquals(0, lists.get(0).getListId());		
		assertEquals(1, lists.get(0).getMovieID());	
		assertTrue(lists.get(0).isMovieLike());
	}

	@Test
	public void testWatchListByUserID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		lists.add(list);
		
		when(listsRepoImp.getWatchListByUserId(userID)).thenReturn(lists);
		
		listsTest = listsService.getWatchListByUserID(userID);
		
		assertNotNull(listsService.getWatchListByUserID(userID));
		assertEquals(0, lists.get(0).getListId());		
		assertEquals(1, lists.get(0).getMovieID());	
		assertTrue(lists.get(0).isMovieLike());
	}

	@Test
	public void testInsertList() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		lists.add(list);
		
		when(listsRepoImp.insertList(list)).thenReturn(true);
		when(listsRepoImp.getListsByMovieId(1)).thenReturn(lists);
		listsTest = listsRepoImp.getListsByMovieId(1);
		
		assertTrue(listsService.insertList(list));
		assertEquals(0, listsTest.get(0).getListId());		
		assertEquals(1, listsTest.get(0).getMovieID());	
		verify(listsRepoImp, times(1)).insertList(list);
	}

	@Test
	public void testRemoveLike() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		
		when(listsRepoImp.insertList(list)).thenReturn(true);
		when(listsRepoImp.updateRemoveLike(userID, movieID)).thenReturn(true);
		assertTrue(listsService.removeLike(userID, movieID));
		verify(listsRepoImp, times(1)).updateRemoveLike(1, 1);
		
	}

		@Test
	public void testRemoveWatch() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Lists list = new Lists(0, 1, true, true, user);
		
		when(listsRepoImp.insertList(list)).thenReturn(true);
		when(listsRepoImp.updateRemoveWatchList(userID, movieID)).thenReturn(true);
		assertTrue(listsService.removeWatchList(userID, movieID));
		verify(listsRepoImp, times(1)).updateRemoveWatchList(1, 1);
		
	}

}
