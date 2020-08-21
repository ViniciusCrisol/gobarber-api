interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IPaeseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
