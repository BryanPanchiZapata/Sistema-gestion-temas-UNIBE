import { CareerModel } from './career-model';
export interface TopicModel {
  id?:string;
  articulation?:Articulation;
  description?:Text;
  name?:string;
  topicStatus?:string;
  career?:CareerModel;
}

export enum Articulation {
  'Investigación' = 'Investigación',
  'Prácticas Laborales' = 'Prácticas Laborales',
  'Proyecto Integrador de Saberes' = 'Proyecto Integrador de Saberes',
  'Prácticas de Servicio Comunitario' = 'Prácticas de Servicio Comunitario'
}
