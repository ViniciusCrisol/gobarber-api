import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDtO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDtO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
