package com.prabal.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.prabal.demo.dao.TaskRepository;
import com.prabal.demo.entity.Task;

@CrossOrigin(origins = "http://127.0.0.1:5500/")  
@RestController
public class TaskController {
	
	@Autowired
	TaskRepository taskRepository;
	
	@PostMapping("/task")
	public Task saveTask(@RequestBody Task task) {
		return taskRepository.addTask(task);
	}
	
	@PutMapping("/task")
	public Task updateTask(@RequestBody Task task) {
		return taskRepository.updateTask(task);
	}
	
	@GetMapping("/tasks")
	public List<Task> getTask() {
		return taskRepository.allTasks();
	}
	
	@DeleteMapping("task/{id}")
	public String deleteTask(@PathVariable("id") int id) {
		return taskRepository.deleteTask(id);
	}

}
