import { TopicStudentModel } from 'src/app/models/topic-student-model';

export interface TopicApprovalModel {
  id?: string,
  date?: string,
  documentNumber?: number,
  meetingDate?: string,
  meetingNumber?: string,
  observations?: Text,
  topicStudent?: TopicStudentModel,
  trato?: string
}
