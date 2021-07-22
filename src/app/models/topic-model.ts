import { CareerModel } from './career-model';
export interface TopicModel {
  id?:string;
  articulation?:Articulation;
  description?:Text;
  name?:string;
  topicStatus?:TopicStatus;
  career?:CareerModel;
}

export enum Articulation {
  'Investigación' = 'INVESTIGACION',
  'Prácticas Laborales' = 'PRACTICAS_LABORALES',
  'Proyecto Integrador de Saberes' = 'PROYECTO_INTEGRADOR_SABERES',
  'Prácticas de Servicio Comunitario' = 'P_SERVICIO_COMUNITARIO'
}

export enum TopicStatus {
  'Disponible' = 'DISPONIBLE',
  'Ejecutado' = 'EJECUTADO',
  'En ejecución' = 'EN_EJECUCION'
}
