import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	/**
	 * Get all tasks and send to http response.
	 * @returns Task
	 */
	@Get()
	public getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getTasks(filterDto);
	}

	/**
	 * Create new task from http.
	 *
	 * @param createTaskDto
	 * @returns Task
	 */
	@Post()
	public createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.createNewTask(createTaskDto);
	}

	/**
	 * Get a specific task
	 * @param params
	 * @returns Task
	 */
	@Get(':id')
	public getTaskById(@Param('id') params): Promise<Task> {
		return this.tasksService.getTaskById(params);
	}

	@Patch(':id')
	public updateTaskById(
		@Param('id') id: string,
		@Body() body: UpdateTaskDto,
	): Promise<Task> {
		return this.tasksService.updateTaskById(id, body);
	}

	/**
	 * Delete a task
	 * @param id
	 * @returns void
	 */
	@Delete(':id')
	public delteTask(@Param('id') id): Promise<void> {
		return this.tasksService.deleteTask(id);
	}
}
