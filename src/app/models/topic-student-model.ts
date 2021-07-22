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
  'Aprobado' = 'APROBADO',
  'Aprobado con observaciones' = 'APROBADO_CON_OBSERVACIONES',
  'No presentado' = 'NO_PRESENTADO',
  'Reprobado' = 'REPROBABO'
}

export enum PaymentDenunciation {
  'No pagado' = 'NO_PAGADO',
  'Pagado' = 'PAGADO'
}
