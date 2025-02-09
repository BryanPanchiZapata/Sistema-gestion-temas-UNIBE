import { TopicStudentModel } from "./topic-student-model";

export interface TopicProposalModel {
  id?: string,
  objectiveGeneral?: string,
  objectivesSpecific?: string[],
  studyJustification?: string,
  topicDescription?: string,
  topicStudent?: TopicStudentModel,
}
