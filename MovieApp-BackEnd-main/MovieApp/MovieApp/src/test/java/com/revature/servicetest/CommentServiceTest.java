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

import com.revature.models.Comment;
import com.revature.models.User;
import com.revature.repositories.CommentRepoImp;
import com.revature.services.CommentService;

public class CommentServiceTest {

	@Mock
	private CommentRepoImp commentRepoImp;

	
	@InjectMocks
	private CommentService commentService;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
	}
	
	int userID = 1;
	int movieID =1;
	int id = 1;
	String comm = "comment";
	List<Comment> comments = new ArrayList<>();
	List<Comment> commTest = new ArrayList<>();
	List<Comment> commTest1 = new ArrayList<>();
	
	@Test
	public void testCommentByUserID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Comment comment = new Comment(0,"comment test", 1, user);
		comments.add(comment);
		
		when(commentRepoImp.getCommentByUserId(userID)).thenReturn(comments);
		
		commTest = commentService.getCommentByUserID(userID);
		
		assertNotNull(commTest);
		assertEquals(0, commTest.get(0).getId());		
		assertEquals("comment test", commTest.get(0).getComment());		
		assertEquals("username1", commTest.get(0).getUser().getUsername());		
	}

	@Test
	public void testCommentByMovieID() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Comment comment = new Comment(0,"comment test", 1, user);
		comments.add(comment);
		
		when(commentRepoImp.getCommentByMovieId(movieID)).thenReturn(comments);
		commTest = commentService.getCommentByMovieID(movieID);
		
		assertNotNull(commTest);
		assertEquals(0, commTest.get(0).getId());		
		assertEquals("comment test", commTest.get(0).getComment());		
		assertEquals(1, commTest.get(0).getMovieID());		
		assertEquals("username1", commTest.get(0).getUser().getUsername());		
	}

	@Test
	public void testInsertComment() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Comment comment = new Comment(0,"comment test", 1, user);
		comments.add(comment);
		
		when(commentRepoImp.insertComment(comment)).thenReturn(true);
		when(commentRepoImp.getCommentByMovieId(movieID)).thenReturn(comments);
		commTest = commentService.getCommentByMovieID(movieID);
		
		assertEquals(0, commTest.get(0).getId());		
		assertEquals("comment test", commTest.get(0).getComment());		
		assertEquals(1, commTest.get(0).getMovieID());		
		assertEquals("username1", commTest.get(0).getUser().getUsername());		
	}
	@Test
	public void testUpdateComment() throws Exception{
		
		User user = new User(1, "username1", "password1", "first1", "last1");
		Comment comment = new Comment(0,"comment test", 1, user);
		comments.add(comment);
		
		when(commentRepoImp.getCommentById(comment.getId())).thenReturn(comment);
		when(commentRepoImp.updateComment(comment.getId(), "updated comment test")).thenReturn(true);
		comment.setComment("updated comment test");
		
		when(commentRepoImp.getCommentByMovieId(movieID)).thenReturn(comments);
		commTest = commentService.getCommentByMovieID(movieID);

		assertTrue(commentService.updateComment(commTest.get(0).getId(), "updated comment test",commTest.get(0).getUser().getId()));
		assertEquals(0, commTest.get(0).getId());		
		assertEquals("updated comment test", commTest.get(0).getComment());		
		assertEquals(1, commTest.get(0).getMovieID());		
		assertEquals("username1", commTest.get(0).getUser().getUsername());
	}

	@Test
	public void testDeleteComment() throws Exception{
		
		when(commentRepoImp.getCommentById(1)).thenReturn(new Comment(1, "comment test", 1, new User(1, "username1", "password1","first1","last1")));
		when(commentRepoImp.deleteComment(1)).thenReturn(true);

		Comment comment1 = commentRepoImp.getCommentById(1);
		
		assertTrue(commentService.deleteComment(comment1.getId(), comment1.getUser().getId()));
		verify(commentRepoImp, times (1)).deleteComment(1);
	}

}
