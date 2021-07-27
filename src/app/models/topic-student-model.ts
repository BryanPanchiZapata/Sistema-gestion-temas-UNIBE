import { TopicModel } from './topic-model';
import { UserAcademicModel } from './user-model';

export interface TopicStudentModel {
  id?: string,
  assignedDate?: string,
  paymentDenunciation?: PaymentDenunciation,
  student?: UserAcademicModel,
  topic?: TopicModel,
  topicEvaluation?: TopicEvaluation

}

export enum TopicEvaluation {
  'Aprobado' = 'Aprobado',
  'Aprobado con observaciones' = 'Aprobado con observaciones',
  'Reprobado' = 'Reprobado'
}

export enum PaymentDenunciation {
  'No pagado' = 'No pagado',
  'Pagado' = 'Pagado'
}
