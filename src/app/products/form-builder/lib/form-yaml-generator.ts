import { FormConfig, FormField } from "./form-types";

// Helper to escape double quotes in strings for Power Apps YAML
const escape = (str: string) => str ? str.replace(/"/g, '\\"') : "";

/**
 * Generates Power Apps YAML code for a form using the proven working pattern
 * Validated against user's working snippet and yaml_component.md rules
 * Fixed property names for control validation
 */
export function generateFormYaml(config: FormConfig, fields: FormField[]): string {
    const formWidth = config.width || 387;

    // Build the Items table entries
    const itemsEntries = fields.map((field, index) => {
        const comma = index < fields.length - 1 ? "," : "";
        const hint = field.placeholder || "";

        let extras = "";
        if (field.type === "dropdown" && field.options) {
            const optionsStr = field.options.map(o => `"${escape(o.label)}"`).join(", ");
            extras = `, options: [${optionsStr}]`;
        }

        return `                { id: ${index + 1}, labelText: "${escape(field.label)}", hintText: "${escape(hint)}", fieldType: "${field.type}"${extras} }${comma}`;
    }).join("\n");

    const yaml = `- conFormCardContainer:
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
      - lblTitle2:
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
            Height: =galFormFields.AllItemsCount * (galFormFields.TemplateHeight +10)
            Items: |
              =Table(
${itemsEntries}
              )
            ShowScrollbar: =false
            TemplateSize: =80
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =lblTitle2.Y + lblTitle2.Height + 10
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
                  Color: =RGBA(0, 0, 0, 1)
                  Default: =LookUp(colFormValues, id = ThisItem.id).value
                  Fill: =RGBA(255, 255, 255, 1)
                  FocusedBorderThickness: =2
                  Font: =Font.'Open Sans'
                  Height: =32
                  HintText: =ThisItem.hintText
                  HoverBorderColor: =Self.BorderColor
                  HoverFill: =RGBA(249, 250, 251, 1)
                  Mode: =If(ThisItem.fieldType = "number", TextMode.Number, TextMode.SingleLine)
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Text })
                  PressedBorderColor: =RGBA(135, 135, 135, 1)
                  PressedFill: =ColorFade(Self.HoverFill, -10%)
                  Size: =9
                  Visible: =ThisItem.fieldType = "text" || ThisItem.fieldType = "number"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
            - ddFieldValue:
                Control: Classic/DropDown@2.3.1
                Properties:
                  BorderColor: =RGBA(201, 201, 201, 1)
                  ChevronFill: =RGBA(107, 114, 128, 1)
                  Fill: =RGBA(255, 255, 255, 1)
                  Height: =32
                  Items: =ThisItem.options
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Selected.Value })
                  Visible: =ThisItem.fieldType = "dropdown"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
            - tglFieldValue:
                Control: Toggle@1.1.5
                Properties:
                  Checked: =LookUp(colFormValues, id = ThisItem.id).value
                  Height: =32
                  OnCheck: |
                    =Collect(colFormValues, { id: ThisItem.id, value: true })
                  OnUncheck: |
                    =Collect(colFormValues, { id: ThisItem.id, value: false })
                  Visible: =ThisItem.fieldType = "toggle"
                  Width: =60
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
            - chkFieldValue:
                Control: Checkbox@1.0.3
                Properties:
                  Checked: =LookUp(colFormValues, id = ThisItem.id).value
                  Height: =32
                  OnCheck: |
                    =Collect(colFormValues, { id: ThisItem.id, value: true })
                  OnUncheck: |
                    =Collect(colFormValues, { id: ThisItem.id, value: false })
                  Visible: =ThisItem.fieldType = "checkbox"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
            - dpFieldValue:
                Control: DatePicker@0.0.46
                Properties:
                  Value: =Today()
                  Height: =32
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Self.Value })
                  Visible: =ThisItem.fieldType = "date"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4
      - btnDeploy:
          Control: Classic/Button@2.2.0
          Properties:
            BorderStyle: =BorderStyle.None
            Color: =RGBA(255, 255, 255, 1)
            Fill: =RGBA(59, 130, 246, 1)
            Height: =30
            HoverBorderColor: =ColorFade(Self.BorderColor, -20%)
            HoverColor: =Self.Color
            HoverFill: =ColorFade(Self.Fill, -10%)
            PressedBorderColor: =ColorFade(Self.BorderColor, -40%)
            PressedFill: =ColorFade(Self.Fill, -20%)
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
            FocusedBorderThickness: =1
            Height: =30
            HoverBorderColor: =ColorFade(Self.BorderColor, -10%)
            HoverColor: =Self.Color
            HoverFill: =RGBA(219, 219, 219, 1)
            PressedBorderColor: =ColorFade(Self.BorderColor, -20%)
            PressedColor: =RGBA(0, 0, 0, 1)
            PressedFill: =ColorFade(Self.HoverFill, -10%)
            RadiusBottomLeft: =5
            RadiusBottomRight: =5
            RadiusTopLeft: =5
            RadiusTopRight: =5
            Size: =11
            Text: ="${escape(config.cancelButtonText || "Cancel")}"
            Width: =(Parent.Width - (Parent.Width - lblTitle.Width))/2 - 5
            X: =lblTitle.X + lblTitle.Width - Self.Width
            Y: =galFormFields.Y + galFormFields.Height + 20`;

    return yaml;
}
