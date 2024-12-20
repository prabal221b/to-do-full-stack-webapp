package com.prabal.demo.dao;
import java.util.List;

import com.prabal.demo.entity.Task;

public interface TaskRepository {
	Task addTask(Task task);
	Task updateTask(Task task);
	String deleteTask(int id);
	List<Task> allTasks();
	
}
