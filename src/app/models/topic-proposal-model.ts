import { TopicStudentModel } from "./topic-student-model";

export interface TopicProposalModel {
  id?: string,
  objectives?: string,
  studyJustification?: string,
  topicDescription?: string,
  topicStudent?: TopicStudentModel
}
