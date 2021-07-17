export interface TopicDenunciationModel {
  semesterLevel: 'string';
  projectType: 'string';
  investigationModality: 'string';
  date: 'string';
  investigationLine: 'string';
  topicStudent: {
    student: {
      career: {
        degree: string;
        name: string
      };
      firstName: string;
      lastName: string;
      secondName: string;
      secondLastname: string;
      ci: string;

    };
    topic: {
      name: string;
      articulation: string;
    };
  };
}
