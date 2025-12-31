export const CONTROL_SNIPPETS: Record<string, any> = {
  "classic": {
    "text": `            - txtFieldValue:
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
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`,
    "number": `            - txtFieldValue:
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
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`,
    "dropdown": `            - ddFieldValue:
                Control: Classic/DropDown@2.3.1
                Properties:
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
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`,
    "toggle": `            - tglFieldValue:
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
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`,
    "checkbox": `            - chkFieldValue:
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
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`,
    "date": `            - dpFieldValue:
                Control: DatePicker@0.0.46
                Properties:
                  SelectedDate: =Today()
                  Height: =32
                  OnChange: |
                    =RemoveIf(colFormValues, id = ThisItem.id);
                    Collect(colFormValues, { id: ThisItem.id, value: Text(Self.SelectedDate) })
                  Visible: =ThisItem.fieldType = "date"
                  Width: =Parent.TemplateWidth
                  Y: =lblFieldLabel.Y + lblFieldLabel.Height + 4`
  },
  // Modern snippets follow the same logic but with modern styling...
};
