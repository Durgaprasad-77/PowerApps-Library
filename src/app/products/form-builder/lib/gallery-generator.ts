import { FormField } from "./form-types";

export function getGalleryChildren(fields: FormField[], style: string): string {
  const usedTypes = new Set(fields.map(f => f.type));

  // Always include the label
  let children = [getLabelSnippet(style)];

  if (usedTypes.has("text") || usedTypes.has("number")) {
    children.push(getTextSnippet(style));
  }
  if (usedTypes.has("dropdown")) {
    children.push(getDropdownSnippet(style));
  }
  if (usedTypes.has("toggle")) {
    children.push(getToggleSnippet(style));
  }
  if (usedTypes.has("checkbox")) {
    children.push(getCheckboxSnippet(style));
  }
  if (usedTypes.has("date")) {
    children.push(getDateSnippet(style));
  }

  return children.join("\n");
}

function getLabelSnippet(style: string): string {
  const common = `            - lblFieldLabel:
                Control: Label@2.5.1
                Properties:`;
  if (style === "modern") {
    return `${common}
                  Color: =RGBA(55, 65, 81, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Medium
                  Height: =20
                  Size: =9
                  Text: =ThisItem.labelText
                  Width: =Parent.TemplateWidth
                  Y: =0`;
  }
  if (style === "glass") {
    return `${common}
                  Color: =RGBA(255, 255, 255, 0.8)
                  FontWeight: =FontWeight.Semibold
                  Height: =20
                  Size: =9
                  Text: =ThisItem.labelText
                  Y: =0`;
  }
  if (style === "slim") {
    return `${common}
                  Color: =RGBA(75, 85, 99, 1)
                  Height: =20
                  Size: =9
                  Text: =ThisItem.labelText
                  Y: =8`;
  }
  // Classic
  return `${common}
                  Color: =RGBA(0, 0, 0, 1)
                  Font: =Font.'Open Sans'
                  FontWeight: =FontWeight.Semibold
                  Height: =22
                  Size: =10
                  Text: =ThisItem.labelText
                  Width: =Parent.TemplateWidth
                  Y: =5`;
}

function getTextSnippet(style: string): string {
  if (style === "modern") {
    return `            - txtFieldValue:
                Control: Classic/TextInput@2.3.2
                Properties:
                  BorderColor: =RGBA(209, 213, 219, 1)
                  BorderThickness: =1
                  Color: =RGBA(17, 24, 39, 1)
                  Default: =LookUp(colFormValues, id = ThisItem.id).value
                  Fill: =RGBA(255, 255, 255, 1)
                  FocusedBorderThickness: =2
                  Font: =Font.'Segoe UI'
                  Height: =36
                  HintText: =ThisItem.hintText
                  HoverBorderColor: =RGBA(59, 130, 246, 1)
                  HoverFill: =RGBA(249, 250, 251, 1)
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Text })
                  PressedBorderColor: =RGBA(37, 99, 235, 1)
                  Size: =10
                  Visible: =ThisItem.fieldType = "text" || ThisItem.fieldType = "number"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
  }
  if (style === "glass") {
    return `            - txtFieldValue:
                Control: Classic/TextInput@2.3.2
                Properties:
                  BorderColor: =RGBA(255, 255, 255, 0.3)
                  Color: =RGBA(255, 255, 255, 1)
                  Default: =LookUp(colFormValues, id = ThisItem.id).value
                  Fill: =RGBA(255, 255, 255, 0.05)
                  Font: =Font.'Open Sans'
                  Height: =36
                  HintText: =ThisItem.hintText
                  HoverFill: =RGBA(255, 255, 255, 0.1)
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Text })
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
  }
  if (style === "slim") {
    return `            - txtFieldValue:
                Control: Classic/TextInput@2.3.2
                Properties:
                  BorderColor: =RGBA(229, 231, 235, 1)
                  Default: =LookUp(colFormValues, id = ThisItem.id).value
                  Fill: =RGBA(255, 255, 255, 1)
                  Height: =32
                  HintText: =ThisItem.hintText
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Text })
                  RadiusBottomLeft: =4
                  RadiusBottomRight: =4
                  RadiusTopLeft: =4
                  RadiusTopRight: =4
                  Size: =9
                  Visible: =ThisItem.fieldType = "text" || ThisItem.fieldType = "number"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 2`;
  }
  // Classic
  return `            - txtFieldValue:
                Control: Classic/TextInput@2.3.2
                Properties:
                  BorderColor: =RGBA(201, 201, 201, 1)
                  BorderThickness: =1
                  Color: =RGBA(0, 0, 0, 1)
                  Default: =LookUp(colFormValues, id = ThisItem.id).value
                  Fill: =RGBA(255, 255, 255, 1)
                  FocusedBorderThickness: =2
                  Font: =Font.'Open Sans'
                  Height: =32
                  HintText: =ThisItem.hintText
                  HoverBorderColor: =Self.BorderColor
                  HoverFill: =RGBA(249, 250, 251, 1)
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Text })
                  PressedBorderColor: =RGBA(135, 135, 135, 1)
                  PressedFill: =ColorFade(Self.HoverFill, -10%)
                  Size: =9
                  Visible: =ThisItem.fieldType = "text" || ThisItem.fieldType = "number"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
}

function getDropdownSnippet(style: string): string {
  const common = `            - ddFieldValue:
                Control: Classic/DropDown@2.3.1
                Properties:`;
  if (style === "modern") {
    return `${common}
                  BorderColor: =RGBA(209, 213, 219, 1)
                  ChevronBackground: =
                  ChevronFill: =RGBA(107, 114, 128, 1)
                  ChevronHoverBackground: =RGBA(0, 0, 0, 0)
                  ChevronHoverFill: =RGBA(0, 69, 120, 1)
                  Height: =36
                  HoverFill: =RGBA(255, 255, 255, 1)
                  Items: =ThisItem.options
                  Items.Value: =Value
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Selected.Value })
                  Visible: =ThisItem.fieldType = "dropdown"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
  }
  if (style === "glass") {
    return `${common}
                  BorderColor: =RGBA(255, 255, 255, 0.3)
                  ChevronBackground: =
                  ChevronFill: =RGBA(255, 255, 255, 0.7)
                  ChevronHoverBackground: =RGBA(255, 255, 255, 0.1)
                  ChevronHoverFill: =RGBA(255, 255, 255, 1)
                  Color: =RGBA(255, 255, 255, 1)
                  Fill: =RGBA(255, 255, 255, 0.05)
                  Height: =36
                  HoverFill: =RGBA(255, 255, 255, 0.1)
                  Items: =ThisItem.options
                  Items.Value: =Value
                  Visible: =ThisItem.fieldType = "dropdown"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
  }
  if (style === "slim") {
    return `${common}
                  BorderColor: =RGBA(229, 231, 235, 1)
                  ChevronBackground: =
                  ChevronFill: =RGBA(107, 114, 128, 1)
                  ChevronHoverBackground: =RGBA(0, 0, 0, 0)
                  ChevronHoverFill: =RGBA(0, 69, 120, 1)
                  Fill: =RGBA(255, 255, 255, 1)
                  Height: =32
                  HoverFill: =RGBA(255, 255, 255, 1)
                  Items: =ThisItem.options
                  Items.Value: =Value
                  Visible: =ThisItem.fieldType = "dropdown"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 2`;
  }
  // Classic
  return `${common}
                  BorderColor: =RGBA(201, 201, 201, 1)
                  ChevronBackground: =
                  ChevronFill: =RGBA(107, 114, 128, 1)
                  ChevronHoverBackground: =RGBA(0, 0, 0, 0)
                  ChevronHoverFill: =RGBA(0, 69, 120, 1)
                  Height: =32
                  HoverFill: =RGBA(255, 255, 255, 1)
                  Items: =ThisItem.options
                  Items.Value: =Value
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Selected.Value })
                  Visible: =ThisItem.fieldType = "dropdown"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
}

function getToggleSnippet(style: string): string {
  return `            - tglFieldValue:
                Control: Toggle@1.1.5
                Properties:
                  Checked: =LookUp(colFormValues, id = ThisItem.id).value = "true"
                  Height: =32
                  OnCheck: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: "true" })
                  OnUncheck: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: "false" })
                  Visible: =ThisItem.fieldType = "toggle"
                  Width: =60
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
}

function getCheckboxSnippet(style: string): string {
  return `            - chkFieldValue:
                Control: Checkbox@0.0.30
                Properties:
                  Checked: =LookUp(colFormValues, id = ThisItem.id).value = "true"
                  Height: =32
                  OnCheck: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: "true" })
                  OnUncheck: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: "false" })
                  Visible: =ThisItem.fieldType = "checkbox"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
}

function getDateSnippet(style: string): string {
  return `            - dpFieldValue:
                Control: DatePicker@0.0.46
                Properties:
                  SelectedDate: =Today()
                  Height: =32
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Text(Self.SelectedDate) })
                  Visible: =ThisItem.fieldType = "date"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`;
}
