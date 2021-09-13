import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	/**
	 * Create a new task.
	 *
	 * @param title
	 * @param description
	 * @returns Task
	 */
	public async createNewTask(
		createTaskDto: CreateTaskDto,
		user: User,
	): Promise<Task> {
		return this.taskRepository.createNewTask(createTaskDto, user);
	}

	public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}

	/**
	 * Find a task by ID
	 *
	 * @param id string
	 * @returns Task
	 */
	public async getTaskById(id: string): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if (!found) throw new NotFoundException('Task not found');

		return found;
	}

	public async updateTaskById(
		id: string,
		updateTaskDto: UpdateTaskDto,
	): Promise<Task> {
		// const task = this.tasks.find((task) => task.id == id);
		const task = await this.getTaskById(id);
		const { title, description, status } = updateTaskDto;
		task.title = title;
		task.description = description;
		task.status = status;
		await this.taskRepository.save(task);
		return task;
	}

	/**
	 * Delete a task.
	 * @param id
	 */
	public async deleteTask(id: string): Promise<any> {
		const result = await this.taskRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException();
		}
		const response = {
			message: 'Task deleted successfully',
		};
		return response;
	}
}
