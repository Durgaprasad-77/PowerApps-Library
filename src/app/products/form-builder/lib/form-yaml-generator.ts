import { FormConfig, FormField } from "./form-types";

// Helper to escape double quotes in strings for Power Apps YAML
const escape = (str: string) => str ? str.replace(/"/g, '\\"') : "";

/**
 * Generates Power Apps YAML code for a form.
 * - Single column: Uses Gallery-based approach
 * - Multi-column: Uses nested AutoLayout containers
 */
export function generateFormYaml(config: FormConfig, fields: FormField[], templateYaml?: string): string {
  const formWidth = config.width || 400;
  const columns = config.columns || 1;

  // For multi-column (2 or 3), use container-based approach
  if (columns > 1) {
    return generateMultiColumnForm(config, fields, columns);
  }

  // For single column, use the simpler Gallery approach
  return generateSingleColumnForm(config, fields, templateYaml);
}

/**
 * Generates a multi-column form using nested AutoLayout containers
 */
function generateMultiColumnForm(config: FormConfig, fields: FormField[], columns: number): string {
  const formWidth = config.width || 600;

  // Group fields into rows
  const rows: FormField[][] = [];
  for (let i = 0; i < fields.length; i += columns) {
    rows.push(fields.slice(i, i + columns));
  }

  // Generate row containers with fields
  const rowsYaml = rows.map((row, rowIndex) => {
    const fieldsYaml = row.map((field, colIndex) => generateFieldContainer(field, colIndex, columns)).join("\n");
    return `            - conRow${rowIndex + 1}:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =16
                  Height: =80
                  Width: =Parent.Width
                  LayoutAlignItems: =LayoutAlignItems.Start
                Children:
${fieldsYaml}`;
  }).join("\n");

  return `- conFormCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      DropShadow: =DropShadow.Regular
      Fill: =RGBA(255, 255, 255, 1)
      RadiusBottomLeft: =15
      RadiusBottomRight: =15
      RadiusTopLeft: =15
      RadiusTopRight: =15
      Width: =${formWidth}
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =0
      PaddingTop: =20
      PaddingBottom: =20
      PaddingLeft: =24
      PaddingRight: =24
    Children:
      - lblTitle:
          Control: Label@2.5.1
          Properties:
            Color: =RGBA(0, 0, 0, 1)
            Font: =Font.'Open Sans'
            FontWeight: =FontWeight.Bold
            Height: =30
            Size: =16
            Text: ="${escape(config.title || "Form Title")}"
            Width: =Parent.Width - 48
      - lblSubtitle:
          Control: Label@2.5.1
          Properties:
            Color: =RGBA(128, 128, 128, 1)
            Font: =Font.'Open Sans'
            Height: =24
            Size: =10
            Text: ="${escape(config.subtitle || "")}"
            Width: =Parent.Width - 48
      - conFormBody:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =12
            Width: =Parent.Width
            PaddingTop: =16
          Children:
${rowsYaml}
      - conButtons:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            LayoutGap: =12
            LayoutJustifyContent: =LayoutJustifyContent.End
            Height: =50
            Width: =Parent.Width
            PaddingTop: =16
          Children:
            - btnCancel:
                Control: Classic/Button@2.2.0
                Properties:
                  BorderColor: =RGBA(219, 219, 219, 1)
                  BorderThickness: =1
                  Color: =RGBA(0, 0, 0, 1)
                  Fill: =RGBA(0, 0, 0, 0)
                  Height: =36
                  HoverFill: =RGBA(245, 245, 245, 1)
                  HoverColor: =Self.Color
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8
                  RadiusTopLeft: =8
                  RadiusTopRight: =8
                  Text: ="${escape(config.cancelButtonText || "Cancel")}"
                  Width: =120
            - btnSubmit:
                Control: Classic/Button@2.2.0
                Properties:
                  BorderStyle: =BorderStyle.None
                  Color: =RGBA(255, 255, 255, 1)
                  Fill: =RGBA(59, 130, 246, 1)
                  Height: =36
                  HoverFill: =ColorFade(Self.Fill, -10%)
                  HoverColor: =Self.Color
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8
                  RadiusTopLeft: =8
                  RadiusTopRight: =8
                  Text: ="${escape(config.submitButtonText || "Submit")}"
                  Width: =120`;
}

/**
 * Generates a field container with label and input control
 */
function generateFieldContainer(field: FormField, colIndex: number, totalColumns: number): string {
  const inputControl = generateInputControl(field);

  return `                    - con${field.controlName}:
                        Control: GroupContainer@1.3.0
                        Variant: AutoLayout
                        Properties:
                          LayoutDirection: =LayoutDirection.Vertical
                          LayoutGap: =4
                          FillPortions: =1
                          LayoutMinWidth: =0
                        Children:
                          - lbl${field.controlName}:
                              Control: Label@2.5.1
                              Properties:
                                Color: =RGBA(55, 65, 81, 1)
                                Font: =Font.'Open Sans'
                                FontWeight: =FontWeight.Semibold
                                Height: =22
                                Size: =10
                                Text: ="${escape(field.label)}${field.required ? " *" : ""}"
                                Width: =Parent.Width
${inputControl}`;
}

/**
 * Generates the appropriate input control based on field type
 */
function generateInputControl(field: FormField): string {
  // Properties need 32 spaces to align with other properties
  const heightProp = `                                Height: =36`;
  const widthProp = `                                Width: =Parent.Width`;

  switch (field.type) {
    case "text":
    case "number":
      return `                          - ${field.controlName}:
                              Control: Classic/TextInput@2.3.2
                              Properties:
                                BorderColor: =RGBA(209, 213, 219, 1)
                                BorderThickness: =1
                                Fill: =RGBA(255, 255, 255, 1)
                                Font: =Font.'Open Sans'
${heightProp}
${widthProp}
                                HintText: ="${escape(field.placeholder || "")}"
                                HoverBorderColor: =RGBA(156, 163, 175, 1)
                                RadiusBottomLeft: =6
                                RadiusBottomRight: =6
                                RadiusTopLeft: =6
                                RadiusTopRight: =6
                                Size: =10`;

    case "dropdown":
      const optionsStr = field.options?.map(o => `{Value: "${escape(o.label)}"}`).join(", ") || "";
      return `                          - ${field.controlName}:
                              Control: Classic/DropDown@2.3.1
                              Properties:
                                BorderColor: =RGBA(209, 213, 219, 1)
                                ChevronBackground: =RGBA(0, 0, 0, 0)
                                ChevronFill: =RGBA(107, 114, 128, 1)
                                ChevronHoverBackground: =RGBA(0, 0, 0, 0)
                                ChevronHoverFill: =RGBA(75, 85, 99, 1)
                                Fill: =RGBA(255, 255, 255, 1)
${heightProp}
${widthProp}
                                HoverFill: =RGBA(249, 250, 251, 1)
                                Items: =[${optionsStr}]
                                Items.Value: =Value
                                RadiusBottomLeft: =6
                                RadiusBottomRight: =6
                                RadiusTopLeft: =6
                                RadiusTopRight: =6`;

    case "date":
      return `                          - ${field.controlName}:
                              Control: DatePicker@0.0.46
                              Properties:
                                BorderColor: =RGBA(209, 213, 219, 1)
${heightProp}
${widthProp}
                                SelectedDate: =Today()
                                RadiusBottomLeft: =6
                                RadiusBottomRight: =6
                                RadiusTopLeft: =6
                                RadiusTopRight: =6`;

    case "checkbox":
      return `                          - ${field.controlName}:
                              Control: Checkbox@0.0.30
                              Properties:
                                Height: =32
                                Width: =Parent.Width
                                CheckboxSize: =20
                                BorderColor: =RGBA(209, 213, 219, 1)`;

    case "toggle":
      return `                          - ${field.controlName}:
                              Control: Toggle@1.1.5
                              Properties:
                                Height: =32
                                Width: =60`;

    default:
      return `                          - ${field.controlName}:
                              Control: Classic/TextInput@2.3.2
                              Properties:
${heightProp}
${widthProp}`;
  }
}

/**
 * Single column form using Gallery approach (existing implementation)
 */
function generateSingleColumnForm(config: FormConfig, fields: FormField[], templateYaml?: string): string {
  const formWidth = config.width || 400;

  // Build the Items table entries
  const itemsEntries = fields.map((field, index) => {
    const comma = index < fields.length - 1 ? "," : "";
    const hint = field.placeholder || "";

    let extras = "";
    if (field.type === "dropdown" && field.options) {
      const optionsStr = field.options.map(o => `{Value: "${escape(o.label)}"}`).join(", ");
      extras = `, options: [${optionsStr}]`;
    }

    return `                { id: ${index + 1}, labelText: "${escape(field.label)}", hintText: "${escape(hint)}", fieldType: "${field.type}"${extras} }${comma}`;
  }).join("\n");

  return `- conFormCardContainer:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      DropShadow: =DropShadow.Regular
      Fill: =RGBA(255, 255, 255, 1)
      Height: =btnCancel.Y + btnCancel.Height + 20
      RadiusBottomLeft: =15
      RadiusBottomRight: =15
      RadiusTopLeft: =15
      RadiusTopRight: =15
      Width: =${formWidth}
      X: =465
      Y: =114
    Children:
      - lblTitle:
          Control: Label@2.5.1
          Properties:
            BorderColor: =RGBA(0, 18, 107, 1)
            Color: =RGBA(0, 0, 0, 1)
            Font: =Font.'Open Sans'
            FontWeight: =FontWeight.Bold
            Height: =27
            Text: ="${escape(config.title || "Form Title")}"
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =20
      - lblSubtitle:
          Control: Label@2.5.1
          Properties:
            BorderColor: =RGBA(0, 18, 107, 1)
            Color: =RGBA(128, 128, 128, 1)
            Font: =Font.'Open Sans'
            Height: =28
            Size: =10
            Text: ="${escape(config.subtitle || "")}"
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =lblTitle.Y + lblTitle.Height
      - galFormFields:
          Control: Gallery@2.15.0
          Variant: Vertical
          Properties:
            Height: =galFormFields.AllItemsCount * (galFormFields.TemplateHeight + 10)
            Items: |
              =Table(
${itemsEntries}
              )
            ShowScrollbar: =false
            TemplateSize: =80
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =lblSubtitle.Y + lblSubtitle.Height + 10
          Children:
            - lblFieldLabel:
                Control: Label@2.5.1
                Properties:
                  Color: =RGBA(0, 0, 0, 1)
                  Font: =Font.'Open Sans'
                  FontWeight: =FontWeight.Semibold
                  Height: =22
                  Size: =10
                  Text: =ThisItem.labelText
                  Width: =Parent.TemplateWidth
                  Y: =5
            - txtFieldValue:
                Control: Classic/TextInput@2.3.2
                Properties:
                  BorderColor: =RGBA(201, 201, 201, 1)
                  BorderThickness: =1
                  Default: =LookUp(colFormValues, id = ThisItem.id, value)
                  Fill: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Open Sans'
                  Height: =32
                  HintText: =ThisItem.hintText
                  Visible: =ThisItem.fieldType = "text" || ThisItem.fieldType = "number"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
      - btnSubmit:
          Control: Classic/Button@2.2.0
          Properties:
            BorderStyle: =BorderStyle.None
            Color: =RGBA(255, 255, 255, 1)
            Fill: =RGBA(59, 130, 246, 1)
            Height: =30
            HoverFill: =ColorFade(Self.Fill, -10%)
            HoverColor: =Self.Color
            RadiusBottomLeft: =5
            RadiusBottomRight: =5
            RadiusTopLeft: =5
            RadiusTopRight: =5
            Size: =11
            Text: ="${escape(config.submitButtonText || "Submit")}"
            Width: =(Parent.Width - (Parent.Width - lblTitle.Width))/2 - 5
            X: =lblTitle.X
            Y: =galFormFields.Y + galFormFields.Height + 20
      - btnCancel:
          Control: Classic/Button@2.2.0
          Properties:
            BorderColor: =RGBA(219, 219, 219, 1)
            BorderThickness: =1
            Color: =RGBA(0, 0, 0, 1)
            Fill: =RGBA(0, 0, 0, 0)
            Height: =30
            HoverFill: =RGBA(219, 219, 219, 1)
            HoverColor: =Self.Color
            RadiusBottomLeft: =5
            RadiusBottomRight: =5
            RadiusTopLeft: =5
            RadiusTopRight: =5
            Size: =11
            Text: ="${escape(config.cancelButtonText || "Cancel")}"
            Width: =(Parent.Width - (Parent.Width - lblTitle.Width))/2 - 5
            X: =lblTitle.X + lblTitle.Width - Self.Width
            Y: =galFormFields.Y + galFormFields.Height + 20`;
}
