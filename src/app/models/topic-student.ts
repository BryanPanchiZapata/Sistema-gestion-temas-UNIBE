export interface TopicStudentModel {
  id: 'string';
  semesterLevel: 'string';
  projectType: 'string';
  investigationModality: 'string';
  date: 'string';
  investigationLine: 'string';
  student: {
    firstName: string;
    lastName: string;
    secondName: string;
    secondLastname: string;
    ci: string;
    email: string
    career: {
      degree: string;
      name: string;
    };
  };
  topic: {
    name: string;
    articulation: string;
  };
}
