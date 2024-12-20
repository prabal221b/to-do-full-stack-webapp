package com.prabal.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.prabal.demo.entity.Task;

@Repository
public class TaskRepositoryImpl implements TaskRepository{
	
	private static final String INSERT_TASK_QUERY = "INSERT INTO to_do (taskName, taskDesc, taskStatus, dueDate) VALUES (?,?,?,?);";
	private static final String UPDATE_TASK_STATUS_QUERY = "UPDATE to_do SET taskStatus=? WHERE id=?";
	private static final String DELETE_TASK_QUERY = "DELETE FROM to_do WHERE id=?";
	private static final String SELECT_ALL_QUERY= "SELECT * FROM to_do";
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@Override
	public Task addTask(Task task) {
		jdbcTemplate.update(INSERT_TASK_QUERY, task.getTaskName(), task.getTaskDesc(), task.getTaskStatus(), task.getDueDate());
		return task;
	}

	@Override
	public Task updateTask(Task task) {
		jdbcTemplate.update(UPDATE_TASK_STATUS_QUERY, task.getTaskStatus(), task.getId());
		return task;
	}

	@Override
	public String deleteTask(int id) {
		jdbcTemplate.update(DELETE_TASK_QUERY, id);
		return "Task Deleted Successfully";
	}

	@Override
	public List<Task> allTasks() {
		return jdbcTemplate.query(SELECT_ALL_QUERY, (rs, rowNum) -> {
			return new Task(rs.getInt("id"),
					rs.getString("taskName"),
					rs.getString("taskDesc"),
					rs.getString("taskStatus"),
					rs.getString("dueDate"));
		});
		
	}

}
