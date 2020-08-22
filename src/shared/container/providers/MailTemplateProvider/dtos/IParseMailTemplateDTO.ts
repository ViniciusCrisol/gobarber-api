interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IPaeseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
