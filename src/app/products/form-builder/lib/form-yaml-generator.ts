import { FormConfig, FormField } from "./form-types";
import { getGalleryChildren } from "./gallery-generator";

// Helper to escape double quotes in strings for Power Apps YAML
const escape = (str: string) => str ? str.replace(/"/g, '\\"') : "";

/**
 * Generates Power Apps YAML code for a form using a template-based system.
 * Supports multiple iterations (Classic, Modern, Glass, Slim).
 */
export function generateFormYaml(config: FormConfig, fields: FormField[], templateYaml?: string): string {
  const formWidth = config.width || 387;
  const columns = config.columns || 1;

  // Build the Items table entries with column index for multi-column layout
  const itemsEntries = fields.map((field, index) => {
    const comma = index < fields.length - 1 ? "," : "";
    const hint = field.placeholder || "";
    const colIndex = index % columns; // Column position (0, 1, or 2)
    const rowIndex = Math.floor(index / columns); // Row position

    let extras = "";
    if (field.type === "dropdown" && field.options) {
      // Power Fx Table options: [{Value: "Opt1"}, {Value: "Opt2"}]
      const optionsStr = field.options.map(o => `{Value: "${escape(o.label)}"}`).join(", ");
      extras = `, options: [${optionsStr}]`;
    }

    return `                { id: ${index + 1}, labelText: "${escape(field.label)}", hintText: "${escape(hint)}", fieldType: "${field.type}", colIndex: ${colIndex}, rowIndex: ${rowIndex}${extras} }${comma}`;
  }).join("\n");

  // Use provided template or fallback to the Classic Card structure
  const structure = templateYaml || getClassicTemplate(columns);

  // Replace placeholders
  let yaml = structure
    .replace(/{{FORM_WIDTH}}/g, formWidth.toString())
    .replace(/{{TITLE}}/g, escape(config.title || "Form Title"))
    .replace(/{{SUBTITLE}}/g, escape(config.subtitle || ""))
    .replace(/{{SUBMIT_TEXT}}/g, escape(config.submitButtonText || "Submit"))
    .replace(/{{CANCEL_TEXT}}/g, escape(config.cancelButtonText || "Cancel"))
    .replace(/{{COLUMNS}}/g, columns.toString())
    .replace(/{{ITEMS_ENTRIES}}/g, itemsEntries)
    .replace(/{{GALLERY_CHILDREN}}/g, getGalleryChildren(fields, templateYaml?.includes("modern-fluent") ? "modern" : templateYaml?.includes("glassmorphic") ? "glass" : templateYaml?.includes("slim-sidebar") ? "slim" : "classic", columns));

  return yaml;
}

function getClassicTemplate(columns: number = 1): string {
  // Calculate row count for proper height calculation
  const heightFormula = columns === 1
    ? `=galFormFields.AllItemsCount * (galFormFields.TemplateHeight + 10)`
    : `=RoundUp(galFormFields.AllItemsCount / ${columns}, 0) * (galFormFields.TemplateHeight + 10)`;

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
      Width: ={{FORM_WIDTH}}
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
            Text: ="{{TITLE}}"
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
            Text: ="{{SUBTITLE}}"
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =lblTitle.Y + lblTitle.Height
      - galFormFields:
          Control: Gallery@2.15.0
          Variant: Vertical
          Properties:
            Height: ${heightFormula}
            Items: |
              =Table(
{{ITEMS_ENTRIES}}
              )
            ShowScrollbar: =false
            TemplateSize: =80
            Width: =Parent.Width * 0.9
            X: =Parent.Width * 0.05
            Y: =lblTitle2.Y + lblTitle2.Height + 10
          Children:
{{GALLERY_CHILDREN}}
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
            Text: ="{{SUBMIT_TEXT}}"
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
            Text: ="{{CANCEL_TEXT}}"
            Width: =(Parent.Width - (Parent.Width - lblTitle.Width))/2 - 5
            X: =lblTitle.X + lblTitle.Width - Self.Width
            Y: =galFormFields.Y + galFormFields.Height + 20`;
}
