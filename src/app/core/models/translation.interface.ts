export type TranslationValue = string | string[] | ITranslationObject;

export interface ITranslationObject {
  [key: string]: TranslationValue;
}