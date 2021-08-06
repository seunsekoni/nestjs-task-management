import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}
	// /**
	//  * Get all tasks.
	//  * @returns array
	//  */
	// public getAllTasks(): Task[] {
	// 	return this.tasks;
	// }

	// /**
	//  * Create a new task.
	//  *
	//  * @param title
	//  * @param description
	//  * @returns Task
	//  */
	// public createNewTask(createTaskDto: CreateTaskDto): Task {
	// 	const { title, description, status } = createTaskDto;
	// 	const task = {
	// 		id: uuid(),
	// 		title: title,
	// 		description: description,
	// 		status: status,
	// 	};
	// 	// Push new task into the tasks array
	// 	this.tasks.push(task);
	// 	return task;
	// }

	// /**
	//  * Find a task by ID
	//  *
	//  * @param id string
	//  * @returns Task
	//  */
	public async getTaskById(id: string): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if (!found) throw new NotFoundException('Task not found')

		return found;
	}
	// public getTaskById(id: string): Task {
	// 	// find task by id
	// 	const found = this.tasks.find((task) => task.id === id);
	// 	if (!found) {
	// 		throw new NotFoundException(`Task not found`);
	// 	}
	// 	return found;
	// }

	// public updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
	// 	// const task = this.tasks.find((task) => task.id == id);
	// 	const task = this.getTaskById(id);
	// 	const { title, description, status } = updateTaskDto;

	// 	task.title = title;
	// 	task.description = description;
	// 	task.status = status;
	// 	return task;
	// }

	// public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
	// 	let tasks = this.getAllTasks();
	// 	const { status, search } = filterDto;
	// 	if (status) {
	// 		tasks = tasks.filter((task) => task.status === status);
	// 	}
	// 	if (search) {
	// 		tasks = tasks.filter((task) => {
	// 			if (
	// 				task.title.includes(search) ||
	// 				task.description.includes(search)
	// 			) {
	// 				return true;
	// 			}
	// 			return false;
	// 		});
	// 	}
	// 	return tasks;
	// }

	// /**
	//  * Delete a task.
	//  * @param id
	//  */
	// public deleteTask(id: string): void {
	// 	const found = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter((task) => task.id !== found.id);
	// }
}
