export interface TopicApprovalModel {
  id?: string;
  meetingDate?: Text;
  meetingNumber?: string;
  observations?: string;
  topicStudent: {
    student: {
      career:{
        degree: string;
      }
      firstName: string;
      lastName: string;
      secondName: string;
      secondLastname: string;
    };
    topic: {
      name: string;
    }
  };
}
