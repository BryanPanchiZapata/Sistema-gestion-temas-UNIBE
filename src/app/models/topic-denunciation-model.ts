import { TopicStudentModel } from 'src/app/models/topic-student-model';

export interface TopicDenunciationModel {
  id?: string
  date?: string,
  investigationLine?: string
  investigationModality?: InvestigationModality,
  projectType?: ProjectType,
  semesterLevel?: string,
  topicStudent?: TopicStudentModel,
  ciudad? : string,
  articulationTopic?: string
}

export enum InvestigationModality {
  'Emprendimiento' = 'EMPRENDIMIENTO',
  'Examen Complexivo' = 'EXAMEN_COMPLEXIVO',
  'Modelo de Negocio' = 'MODELO_DE_NEGOCIO',
  'Producto o Presentación Artística' = 'PRODUCTO_O_PRESENTACION_ARTISTICA',
  'Propuesta Tecnológica' = 'PROPUESTA_TECNOLOGICA',
  'Proyecto de Investigación' = 'PROYECTO_DE_INVESTIGACION'
}

export enum ProjectType {
  'Docencia' = 'DOCENCIA',
  'Investigación' = 'INVESTIGACION',
  'Vinculación' = 'VINCULACION'
}

export enum SemesterLevel {
  'Sexto' = 'SEXTO',
  'Séptimo' = 'SEPTIMO',
  'Octavo' = 'OCTAVO',
  'Noveno' = 'NOVENO',
  'Décimo' = 'DECIMO'

}
