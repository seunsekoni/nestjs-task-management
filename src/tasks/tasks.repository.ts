import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	async createNewTask(
		createTaskDto: CreateTaskDto,
		user: User,
	): Promise<Task> {
		const { title, description, status } = createTaskDto;
		const task = this.create({
			title,
			description,
			status,
			user,
		});
		await this.save(task);
		return task;
	}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const query = this.createQueryBuilder('task');

		const { search, status } = filterDto;

		if (status) {
			query.andWhere('task.status = :status', { status: status });
		}

		if (search) {
			query.andWhere(
				'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
				{ search: `%${search}%` },
			);
		}
		const tasks = await query.getMany();
		return tasks;
	}

	// async getTaskById(id: string): Promise<Task> {
	// 	const found = await this.findOne(id);
	// 	return found;
	// }
}
