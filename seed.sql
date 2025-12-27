-- Seeding categories
INSERT INTO public.categories (slug, name, description, icon, order_index, components_count, free_count) VALUES
('tabs', 'Tabs', 'Tab navigation components', '📑', 1, 4, 2),
('buttons', 'Buttons', 'Interactive buttons', '🔘', 2, 4, 2),
('navigation', 'Navigation', 'Navigation components', '🧭', 3, 4, 2),
('feedback', 'Feedback', 'User feedback components', '💬', 4, 12, 7),
('forms', 'Forms', 'Form input components', '📝', 5, 9, 7),
('app-shells', 'App Shells', 'Complete app layouts', '🏠', 6, 2, 0),
('modals', 'Modals', 'Dialog and popup components', '🪟', 7, 4, 1),
('cards', 'Cards', 'Content card components', '🃏', 8, 5, 1),
('data', 'Data', 'Tables and lists', '📊', 9, 1, 1),
('layout', 'Layout', 'Layout containers', '📐', 10, 1, 1),
('display', 'Display', 'Visual display components', '🎨', 11, 1, 1);

-- Seeding components

-- Seeding components in batches
INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('tab-bar', 'tabs', 'Tab Bar', 'Basic horizontal tab navigation with selection state', '- conTabBar:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      Fill: =RGBA(255, 255, 255, 1)
      Height: =50
      Width: =Parent.Width
    Children:
      - btnTab1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 1"
            Fill: =If(locSelectedTab = 1, RGBA(59, 130, 246, 0.1), RGBA(0,0,0,0))
            Color: =If(locSelectedTab = 1, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            HoverFill: =RGBA(243, 244, 246, 0.5)
            BorderStyle: =BorderStyle.None
            Height: =Parent.Height
            FillPortions: =1
            OnSelect: =Set(locSelectedTab, 1)
      - btnTab2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 2"
            Fill: =If(locSelectedTab = 2, RGBA(59, 130, 246, 0.1), RGBA(0,0,0,0))
            Color: =If(locSelectedTab = 2, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            HoverFill: =RGBA(243, 244, 246, 0.5)
            BorderStyle: =BorderStyle.None
            Height: =Parent.Height
            FillPortions: =1
            OnSelect: =Set(locSelectedTab, 2)
      - btnTab3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 3"
            Fill: =If(locSelectedTab = 3, RGBA(59, 130, 246, 0.1), RGBA(0,0,0,0))
            Color: =If(locSelectedTab = 3, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            HoverFill: =RGBA(243, 244, 246, 0.5)
            BorderStyle: =BorderStyle.None
            Height: =Parent.Height
            FillPortions: =1
            OnSelect: =Set(locSelectedTab, 3)

# Screen.OnVisible: Set(locSelectedTab, 1)', NULL, false, false, NULL, NULL),
('animated-underline-tabs', 'tabs', 'Animated Underline Tabs', 'Tab bar with smooth sliding underline indicator', '# Timer for smooth animation
- timerTabAnim:
    Control: Timer@2.1.0
    Properties:
      Duration: =200
      AutoStart: =false
      Repeat: =false
      Visible: =false
      Start: =locStartTabAnim
      OnTimerEnd: |-
        =Set(locStartTabAnim, false);
        Set(locPrevTabX, locTargetTabX)

- conTabBar:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(255, 255, 255, 1)
      Height: =50
      Width: =Parent.Width
    Children:
      - recUnderline:
          Control: Rectangle@2.3.0
          Properties:
            Fill: =RGBA(59, 130, 246, 1)
            Height: =3
            Width: =Parent.Width / 4
            Y: =Parent.Height - 3
            X: |-
              =If(
                locStartTabAnim,
                locPrevTabX + (locTargetTabX - locPrevTabX) * (1 - Power(1 - timerTabAnim.Value / timerTabAnim.Duration, 3)),
                locTargetTabX
              )
      - btnTab1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 1"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(243, 244, 246, 0.3)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 1, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =If(locSelectedTab = 1, RGBA(59, 130, 246, 1), RGBA(75, 85, 99, 1))
            PressedColor: =Self.Color
            FontWeight: =If(locSelectedTab = 1, FontWeight.Semibold, FontWeight.Normal)
            Height: =Parent.Height
            Width: =Parent.Width / 4
            X: =0
            Y: =0
            OnSelect: |-
              =If(locSelectedTab <> 1,
                Set(locPrevTabX, locTargetTabX);
                Set(locTargetTabX, 0);
                Set(locSelectedTab, 1);
                Set(locStartTabAnim, true)
              )
      - btnTab2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 2"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(243, 244, 246, 0.3)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 2, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =If(locSelectedTab = 2, RGBA(59, 130, 246, 1), RGBA(75, 85, 99, 1))
            PressedColor: =Self.Color
            FontWeight: =If(locSelectedTab = 2, FontWeight.Semibold, FontWeight.Normal)
            Height: =Parent.Height
            Width: =Parent.Width / 4
            X: =Parent.Width / 4
            Y: =0
            OnSelect: |-
              =If(locSelectedTab <> 2,
                Set(locPrevTabX, locTargetTabX);
                Set(locTargetTabX, conTabBar.Width / 4);
                Set(locSelectedTab, 2);
                Set(locStartTabAnim, true)
              )
      - btnTab3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 3"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(243, 244, 246, 0.3)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 3, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =If(locSelectedTab = 3, RGBA(59, 130, 246, 1), RGBA(75, 85, 99, 1))
            PressedColor: =Self.Color
            FontWeight: =If(locSelectedTab = 3, FontWeight.Semibold, FontWeight.Normal)
            Height: =Parent.Height
            Width: =Parent.Width / 4
            X: =Parent.Width / 4 * 2
            Y: =0
            OnSelect: |-
              =If(locSelectedTab <> 3,
                Set(locPrevTabX, locTargetTabX);
                Set(locTargetTabX, conTabBar.Width / 4 * 2);
                Set(locSelectedTab, 3);
                Set(locStartTabAnim, true)
              )
      - btnTab4:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Tab 4"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(243, 244, 246, 0.3)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 4, RGBA(59, 130, 246, 1), RGBA(107, 114, 128, 1))
            HoverColor: =If(locSelectedTab = 4, RGBA(59, 130, 246, 1), RGBA(75, 85, 99, 1))
            PressedColor: =Self.Color
            FontWeight: =If(locSelectedTab = 4, FontWeight.Semibold, FontWeight.Normal)
            Height: =Parent.Height
            Width: =Parent.Width / 4
            X: =Parent.Width / 4 * 3
            Y: =0
            OnSelect: |-
              =If(locSelectedTab <> 4,
                Set(locPrevTabX, locTargetTabX);
                Set(locTargetTabX, conTabBar.Width / 4 * 3);
                Set(locSelectedTab, 4);
                Set(locStartTabAnim, true)
              )

# Screen.OnVisible:
# Set(locSelectedTab, 1);
# Set(locPrevTabX, 0);
# Set(locTargetTabX, 0);
# Set(locStartTabAnim, false)', NULL, false, true, NULL, NULL),
('animated-pill-tabs', 'tabs', 'Animated Pill Tabs', 'Modern iOS-style tabs with sliding pill background', '- conPillTabs:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(243, 244, 246, 1)
      Height: =44
      Width: =Parent.Width
      RadiusTopLeft: =22
      RadiusTopRight: =22
      RadiusBottomLeft: =22
      RadiusBottomRight: =22
    Children:
      - conPill:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(59, 130, 246, 1)
            Height: =36
            Width: =Parent.Width / 3 - 8
            Y: =4
            X: =4 + (locSelectedTab - 1) * (Parent.Width / 3)
            RadiusTopLeft: =18
            RadiusTopRight: =18
            RadiusBottomLeft: =18
            RadiusBottomRight: =18
      - btnPill1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Photos"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 1, RGBA(255, 255, 255, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Height: =Parent.Height
            Width: =Parent.Width / 3
            X: =0
            Y: =0
            OnSelect: =Set(locSelectedTab, 1)
      - btnPill2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Music"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 2, RGBA(255, 255, 255, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Height: =Parent.Height
            Width: =Parent.Width / 3
            X: =Parent.Width / 3
            Y: =0
            OnSelect: =Set(locSelectedTab, 2)
      - btnPill3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Videos"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Color: =If(locSelectedTab = 3, RGBA(255, 255, 255, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Height: =Parent.Height
            Width: =Parent.Width / 3
            X: =Parent.Width / 3 * 2
            Y: =0
            OnSelect: =Set(locSelectedTab, 3)

# Screen.OnVisible: Set(locSelectedTab, 1)', NULL, true, true, NULL, NULL),
('segmented-tabs', 'tabs', 'Segmented Tabs', 'iOS-style segmented control for compact view switching', '- conSegmented:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      Fill: =RGBA(229, 231, 235, 1)
      Height: =36
      Width: =300
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      PaddingLeft: =2
      PaddingRight: =2
      PaddingTop: =2
      PaddingBottom: =2
    Children:
      - btnSeg1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Day"
            Fill: =If(locSelected = 1, RGBA(255, 255, 255, 1), RGBA(0, 0, 0, 0))
            HoverFill: =If(locSelected = 1, RGBA(255, 255, 255, 1), RGBA(243, 244, 246, 0.5))
            BorderStyle: =BorderStyle.None
            Color: =If(locSelected = 1, RGBA(17, 24, 39, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Size: =13
            Height: =Parent.Height - 4
            FillPortions: =1
            RadiusTopLeft: =6
            RadiusTopRight: =6
            RadiusBottomLeft: =6
            RadiusBottomRight: =6
            OnSelect: =Set(locSelected, 1)
      - btnSeg2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Week"
            Fill: =If(locSelected = 2, RGBA(255, 255, 255, 1), RGBA(0, 0, 0, 0))
            HoverFill: =If(locSelected = 2, RGBA(255, 255, 255, 1), RGBA(243, 244, 246, 0.5))
            BorderStyle: =BorderStyle.None
            Color: =If(locSelected = 2, RGBA(17, 24, 39, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Size: =13
            Height: =Parent.Height - 4
            FillPortions: =1
            RadiusTopLeft: =6
            RadiusTopRight: =6
            RadiusBottomLeft: =6
            RadiusBottomRight: =6
            OnSelect: =Set(locSelected, 2)
      - btnSeg3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Month"
            Fill: =If(locSelected = 3, RGBA(255, 255, 255, 1), RGBA(0, 0, 0, 0))
            HoverFill: =If(locSelected = 3, RGBA(255, 255, 255, 1), RGBA(243, 244, 246, 0.5))
            BorderStyle: =BorderStyle.None
            Color: =If(locSelected = 3, RGBA(17, 24, 39, 1), RGBA(107, 114, 128, 1))
            HoverColor: =Self.Color
            FontWeight: =FontWeight.Semibold
            Size: =13
            Height: =Parent.Height - 4
            FillPortions: =1
            RadiusTopLeft: =6
            RadiusTopRight: =6
            RadiusBottomLeft: =6
            RadiusBottomRight: =6
            OnSelect: =Set(locSelected, 3)

# Screen.OnVisible: Set(locSelected, 1)', NULL, true, false, NULL, NULL),
('classic-button', 'buttons', 'Classic Button', 'Standard button with hover and pressed states', '- btnPrimary:
    Control: Classic/Button@2.2.0
    Properties:
      Text: ="Click Me"
      Fill: =RGBA(59, 130, 246, 1)
      HoverFill: =RGBA(37, 99, 235, 1)
      PressedFill: =RGBA(29, 78, 216, 1)
      DisabledFill: =RGBA(156, 163, 175, 1)
      Color: =RGBA(255, 255, 255, 1)
      HoverColor: =RGBA(255, 255, 255, 1)
      PressedColor: =RGBA(255, 255, 255, 1)
      BorderStyle: =BorderStyle.None
      Font: =Font.''Open Sans''
      FontWeight: =FontWeight.Semibold
      Size: =14
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Height: =44
      Width: =160
      OnSelect: =Notify("Button clicked!")', NULL, false, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('outline-button', 'buttons', 'Outline Button', 'Transparent button with border, perfect for secondary actions', '- btnOutline:
    Control: Classic/Button@2.2.0
    Properties:
      Text: ="Secondary"
      Fill: =RGBA(0, 0, 0, 0)
      HoverFill: =RGBA(59, 130, 246, 0.1)
      PressedFill: =RGBA(59, 130, 246, 0.2)
      Color: =RGBA(59, 130, 246, 1)
      HoverColor: =RGBA(59, 130, 246, 1)
      PressedColor: =RGBA(59, 130, 246, 1)
      BorderColor: =RGBA(59, 130, 246, 1)
      BorderStyle: =BorderStyle.Solid
      BorderThickness: =2
      Font: =Font.''Open Sans''
      FontWeight: =FontWeight.Semibold
      Size: =14
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Height: =44
      Width: =160
      OnSelect: =Notify("Outline button clicked!")', NULL, false, false, NULL, NULL),
('loading-button', 'buttons', 'Loading Button', 'Button with loading spinner to prevent double-clicks', '- conLoadingBtn:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =8
      Fill: =If(locIsLoading, RGBA(37, 99, 235, 1), RGBA(59, 130, 246, 1))
      Height: =44
      Width: =160
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - imgSpinner:
          Control: Image@2.2.3
          Properties:
            Visible: =locIsLoading
            Width: =20
            Height: =20
            Image: |-
              ="data:image/svg+xml;utf8," & EncodeUrl("
              <svg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 24 24'' fill=''none''>
                <circle cx=''12'' cy=''12'' r=''10'' stroke=''white'' stroke-width=''3'' stroke-opacity=''0.3''/>
                <path d=''M12 2a10 10 0 0 1 10 10'' stroke=''white'' stroke-width=''3'' stroke-linecap=''round''>
                  <animateTransform attributeName=''transform'' type=''rotate'' from=''0 12 12'' to=''360 12 12'' dur=''1s'' repeatCount=''indefinite''/>
                </path>
              </svg>")
      - lblBtnText:
          Control: Label@2.5.1
          Properties:
            Text: =If(locIsLoading, "Loading...", "Submit")
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            Size: =14
      - btnOverlay:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =If(locIsLoading, RGBA(0, 0, 0, 0), RGBA(255, 255, 255, 0.1))
            BorderStyle: =BorderStyle.None
            DisplayMode: =If(locIsLoading, DisplayMode.Disabled, DisplayMode.Edit)
            Width: =Parent.Width
            Height: =Parent.Height
            X: =0
            Y: =0
            OnSelect: |-
              =Set(locIsLoading, true);
              // Your async action here
              // Set(locIsLoading, false) when done

# Screen.OnVisible: Set(locIsLoading, false)', NULL, true, true, NULL, NULL),
('icon-button', 'buttons', 'Icon Button', 'Button with icon and text for enhanced visual appeal', '- conIconBtn:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =8
      Fill: =RGBA(16, 185, 129, 1)
      Height: =44
      Width: =160
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
    Children:
      - icnBtn:
          Control: Classic/Icon@2.5.0
          Properties:
            Icon: =Icon.Add
            Color: =RGBA(255, 255, 255, 1)
            Width: =20
            Height: =20
      - lblIconBtn:
          Control: Label@2.5.1
          Properties:
            Text: ="Add Item"
            Color: =RGBA(255, 255, 255, 1)
            FontWeight: =FontWeight.Semibold
            Size: =14
      - btnIconOverlay:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(255, 255, 255, 0.1)
            BorderStyle: =BorderStyle.None
            Width: =Parent.Width
            Height: =Parent.Height
            X: =0
            Y: =0
            OnSelect: =Notify("Add Item clicked!")', NULL, true, false, NULL, NULL),
('toast-notification', 'feedback', 'Toast Notification', 'Auto-dismissing notification for user feedback', '# Timer for auto-dismiss
- timerToast:
    Control: Timer@2.1.0
    Properties:
      Duration: =3000
      AutoStart: =false
      Repeat: =false
      Visible: =false
      Start: =locShowToast
      OnTimerEnd: =Set(locShowToast, false)

- conToast:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =12
      PaddingLeft: =16
      PaddingRight: =16
      PaddingTop: =12
      PaddingBottom: =12
      Fill: =RGBA(17, 24, 39, 1)
      Width: =320
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      X: =Parent.Width / 2 - Self.Width / 2
      Y: =If(locShowToast, Parent.Height - Self.Height - 20, Parent.Height + 10)
      Visible: =locShowToast || timerToast.Value > 0
    Children:
      - icnToast:
          Control: Classic/Icon@2.5.0
          Properties:
            Icon: =Icon.CheckMark
            Color: =RGBA(34, 197, 94, 1)
            Width: =20
            Height: =20
      - lblToast:
          Control: Label@2.5.1
          Properties:
            Text: ="Action completed successfully!"
            Color: =RGBA(255, 255, 255, 1)
            Size: =14
      - btnCloseToast:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="✕"
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(255, 255, 255, 0.1)
            Color: =RGBA(156, 163, 175, 1)
            HoverColor: =RGBA(255, 255, 255, 1)
            BorderStyle: =BorderStyle.None
            Width: =24
            Height: =24
            OnSelect: =Set(locShowToast, false)

# To show toast: Set(locShowToast, true)
# Screen.OnVisible: Set(locShowToast, false)', NULL, false, false, NULL, NULL),
('loading-spinner', 'feedback', 'Loading Spinner', 'Animated SVG spinner for loading states', '- imgSpinner:
    Control: Image@2.2.3
    Properties:
      Width: =48
      Height: =48
      Image: |-
        ="data:image/svg+xml;utf8," & EncodeUrl("
        <svg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 50 50''>
          <circle cx=''25'' cy=''25'' r=''20'' fill=''none'' stroke=''#e5e7eb'' stroke-width=''4''/>
          <circle cx=''25'' cy=''25'' r=''20'' fill=''none'' stroke=''#3b82f6'' stroke-width=''4'' stroke-dasharray=''90 60''>
            <animateTransform attributeName=''transform'' type=''rotate'' from=''0 25 25'' to=''360 25 25'' dur=''1s'' repeatCount=''indefinite''/>
          </circle>
        </svg>
        ")', NULL, false, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('simple-badge', 'feedback', 'Simple Badge', 'Colored badge with auto-light background', '- conBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =ColorFade(RGBA(36, 80, 150, 1), 80%)
      RadiusBottomLeft: =6
      RadiusBottomRight: =6
      RadiusTopLeft: =6
      RadiusTopRight: =6
      PaddingLeft: =12
      PaddingRight: =12
      PaddingTop: =6
      PaddingBottom: =6
      Height: =28
      Width: =80
    Children:
      - lblBadgeText:
          Control: Label@2.5.1
          Properties:
            Text: ="Default"
            Color: =RGBA(36, 80, 150, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Semibold
            Size: =12
            Align: =Align.Center', NULL, false, true, NULL, NULL),
('outline-badge', 'feedback', 'Outline Badge', 'Subtle badge with border and transparent fill', '- conOutlineBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =RGBA(0, 0, 0, 0)
      BorderColor: =RGBA(107, 114, 128, 1)
      BorderThickness: =1
      RadiusBottomLeft: =6
      RadiusBottomRight: =6
      RadiusTopLeft: =6
      RadiusTopRight: =6
      PaddingLeft: =12
      PaddingRight: =12
      PaddingTop: =6
      PaddingBottom: =6
      Height: =28
      Width: =80
    Children:
      - lblOutlineBadgeText:
          Control: Label@2.5.1
          Properties:
            Text: ="Pending"
            Color: =RGBA(107, 114, 128, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Semibold
            Size: =12
            Align: =Align.Center', NULL, false, true, NULL, NULL),
('icon-badge', 'feedback', 'Icon Badge', 'Badge with leading icon for status indication', '- conIconBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =4
      Fill: =ColorFade(RGBA(34, 197, 94, 1), 80%)
      RadiusBottomLeft: =6
      RadiusBottomRight: =6
      RadiusTopLeft: =6
      RadiusTopRight: =6
      PaddingLeft: =10
      PaddingRight: =12
      PaddingTop: =6
      PaddingBottom: =6
      Height: =28
      Width: =100
    Children:
      - lblIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="✓"
            Color: =RGBA(34, 197, 94, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Bold
            Size: =12
      - lblIconBadgeText:
          Control: Label@2.5.1
          Properties:
            Text: ="Success"
            Color: =RGBA(34, 197, 94, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Semibold
            Size: =12', NULL, false, true, NULL, NULL),
('counter-badge', 'feedback', 'Counter Badge', 'Circular notification counter badge', '- conCounterBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =RGBA(239, 68, 68, 1)
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      RadiusTopLeft: =12
      RadiusTopRight: =12
      Height: =24
      Width: =24
    Children:
      - lblCount:
          Control: Label@2.5.1
          Properties:
            Text: ="5"
            Color: =RGBA(255, 255, 255, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Bold
            Size: =11
            Align: =Align.Center', NULL, false, true, NULL, NULL),
('status-dot', 'feedback', 'Status Dot', 'Minimal dot indicator for online/offline status', '- conStatusDot:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =8
      Height: =24
      Width: =80
    Children:
      - conDot:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(34, 197, 94, 1)
            RadiusBottomLeft: =6
            RadiusBottomRight: =6
            RadiusTopLeft: =6
            RadiusTopRight: =6
            Height: =12
            Width: =12
      - lblStatusText:
          Control: Label@2.5.1
          Properties:
            Text: ="Online"
            Color: =RGBA(107, 114, 128, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Normal
            Size: =12', NULL, false, true, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('pulsing-badge', 'feedback', 'Pulsing Badge', 'Animated badge with pulsing glow effect for attention', '- conPulsingBadge:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Height: =40
      Width: =100
    Children:
      - imgPulse:
          Control: Image@2.2.3
          Properties:
            Image: |-
              ="data:image/svg+xml;utf8," & EncodeUrl("
              <svg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 100 40''>
                <rect x=''10'' y=''6'' width=''80'' height=''28'' rx=''14'' fill=''#ef4444'' opacity=''0.4''>
                  <animate attributeName=''opacity'' values=''0.4;0.1;0.4'' dur=''1.5s'' repeatCount=''indefinite''/>
                  <animate attributeName=''width'' values=''80;90;80'' dur=''1.5s'' repeatCount=''indefinite''/>
                  <animate attributeName=''x'' values=''10;5;10'' dur=''1.5s'' repeatCount=''indefinite''/>
                </rect>
                <rect x=''10'' y=''6'' width=''80'' height=''28'' rx=''14'' fill=''#ef4444''/>
                <text x=''50'' y=''24'' text-anchor=''middle'' fill=''white'' font-size=''12'' font-weight=''600'' font-family=''Segoe UI''>New</text>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =Parent.Width
            Height: =Parent.Height', NULL, true, true, NULL, NULL),
('dismissible-chip', 'feedback', 'Dismissible Chip', 'Tag with close button for filters and removable items', '- conDismissibleChip:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =6
      Fill: =RGBA(229, 231, 235, 1)
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      RadiusTopLeft: =16
      RadiusTopRight: =16
      PaddingLeft: =12
      PaddingRight: =8
      PaddingTop: =6
      PaddingBottom: =6
      Height: =32
      Width: =120
    Children:
      - lblChipText:
          Control: Label@2.5.1
          Properties:
            Text: ="Marketing"
            Color: =RGBA(55, 65, 81, 1)
            Font: =Font.''Segoe UI''
            FontWeight: =FontWeight.Semibold
            Size: =12
      - btnClose:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="✕"
            Width: =20
            Height: =20
            Fill: =RGBA(156, 163, 175, 1)
            HoverFill: =RGBA(107, 114, 128, 1)
            Color: =RGBA(255, 255, 255, 1)
            HoverColor: =RGBA(255, 255, 255, 1)
            PressedColor: =RGBA(255, 255, 255, 1)
            RadiusBottomLeft: =10
            RadiusBottomRight: =10
            RadiusTopLeft: =10
            RadiusTopRight: =10
            BorderStyle: =BorderStyle.None
            Size: =10
            OnSelect: =Set(locChipVisible, false)

# Add to Screen.OnVisible:
# Set(locChipVisible, true)', NULL, true, true, NULL, NULL),
('avatar-status', 'feedback', 'Avatar Status', 'Profile avatar with status dot overlay for user presence', '- conAvatarStatus:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Height: =48
      Width: =48
    Children:
      - imgAvatar:
          Control: Image@2.2.3
          Properties:
            Image: |-
              ="data:image/svg+xml;utf8," & EncodeUrl("
              <svg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 48 48''>
                <circle cx=''24'' cy=''24'' r=''24'' fill=''#e5e7eb''/>
                <circle cx=''24'' cy=''18'' r=''8'' fill=''#9ca3af''/>
                <path d=''M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16'' fill=''#9ca3af''/>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =48
            Height: =48
      - conStatusDot:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(34, 197, 94, 1)
            BorderColor: =RGBA(255, 255, 255, 1)
            BorderThickness: =2
            RadiusBottomLeft: =7
            RadiusBottomRight: =7
            RadiusTopLeft: =7
            RadiusTopRight: =7
            X: =34
            Y: =34
            Height: =14
            Width: =14', NULL, true, true, NULL, NULL),
('gradient-badge', 'feedback', 'Gradient Badge', 'Modern gradient-filled badge for premium features', '- conGradientBadge:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Height: =28
      Width: =80
    Children:
      - imgGradient:
          Control: Image@2.2.3
          Properties:
            Image: |-
              ="data:image/svg+xml;utf8," & EncodeUrl("
              <svg xmlns=''http://www.w3.org/2000/svg'' viewBox=''0 0 80 28''>
                <defs>
                  <linearGradient id=''grad'' x1=''0%'' y1=''0%'' x2=''100%'' y2=''0%''>
                    <stop offset=''0%'' style=''stop-color:#667eea''/>
                    <stop offset=''100%'' style=''stop-color:#764ba2''/>
                  </linearGradient>
                </defs>
                <rect width=''80'' height=''28'' rx=''14'' fill=''url(#grad)''/>
                <text x=''40'' y=''18'' text-anchor=''middle'' fill=''white'' font-size=''12'' font-weight=''600'' font-family=''Segoe UI''>PRO</text>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =Parent.Width
            Height: =Parent.Height', NULL, true, true, NULL, NULL),
('bottom-navigation', 'navigation', 'Bottom Navigation', 'Mobile-style bottom navigation bar with 4 tabs', '- conBottomNav:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutMode: =LayoutMode.Auto
      LayoutMinHeight: =60
      Fill: =RGBA(255, 255, 255, 1)
      DropShadow: =DropShadow.Light
      BorderStyle: =BorderStyle.None
      Height: =60
      Width: =Parent.Width
      X: =0
      Y: =Parent.Height - Self.Height
    Children:
      - btnNav1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Home"
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locBottomNav = 1, RGBA(59, 130, 246, 1), RGBA(156, 163, 175, 1))
            HoverColor: =Self.Color
            BorderStyle: =BorderStyle.None
            FillPortions: =1
            Height: =Parent.Height
            OnSelect: =Set(locBottomNav, 1)
      - btnNav2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Search"
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locBottomNav = 2, RGBA(59, 130, 246, 1), RGBA(156, 163, 175, 1))
            HoverColor: =Self.Color
            BorderStyle: =BorderStyle.None
            FillPortions: =1
            Height: =Parent.Height
            OnSelect: =Set(locBottomNav, 2)
      - btnNav3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Profile"
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locBottomNav = 3, RGBA(59, 130, 246, 1), RGBA(156, 163, 175, 1))
            HoverColor: =Self.Color
            BorderStyle: =BorderStyle.None
            FillPortions: =1
            Height: =Parent.Height
            OnSelect: =Set(locBottomNav, 3)
      - btnNav4:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Settings"
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locBottomNav = 4, RGBA(59, 130, 246, 1), RGBA(156, 163, 175, 1))
            HoverColor: =Self.Color
            BorderStyle: =BorderStyle.None
            FillPortions: =1
            Height: =Parent.Height
            OnSelect: =Set(locBottomNav, 4)

# Screen.OnVisible: Set(locBottomNav, 1)', NULL, false, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('breadcrumb', 'navigation', 'Breadcrumb', 'Breadcrumb navigation for hierarchical navigation', '- conBreadcrumb:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =8
      Height: =40
      Width: =Parent.Width
    Children:
      - lblHome:
          Control: Label@2.5.1
          Properties:
            Text: ="Home"
            Color: =RGBA(59, 130, 246, 1)
            Size: =14
      - lblSep1:
          Control: Label@2.5.1
          Properties:
            Text: ="/"
            Color: =RGBA(156, 163, 175, 1)
            Size: =14
      - lblCategory:
          Control: Label@2.5.1
          Properties:
            Text: ="Category"
            Color: =RGBA(59, 130, 246, 1)
            Size: =14
      - lblSep2:
          Control: Label@2.5.1
          Properties:
            Text: ="/"
            Color: =RGBA(156, 163, 175, 1)
            Size: =14
      - lblCurrent:
          Control: Label@2.5.1
          Properties:
            Text: ="Current Page"
            Color: =RGBA(107, 114, 128, 1)
            Size: =14', NULL, false, false, NULL, NULL),
('sidebar-navigation', 'navigation', 'Sidebar Navigation', 'Collapsible sidebar navigation with icons', '- conSidebar:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =4
      PaddingTop: =16
      PaddingBottom: =16
      PaddingLeft: =8
      PaddingRight: =8
      Fill: =RGBA(31, 41, 55, 1)
      Width: =240
      Height: =Parent.Height
    Children:
      - btnNavItem1:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Dashboard"
            Fill: =If(locNavItem = 1, RGBA(59, 130, 246, 0.2), RGBA(0, 0, 0, 0))
            HoverFill: =RGBA(55, 65, 81, 1)
            Color: =If(locNavItem = 1, RGBA(96, 165, 250, 1), RGBA(209, 213, 219, 1))
            HoverColor: =RGBA(255, 255, 255, 1)
            BorderStyle: =BorderStyle.None
            Align: =Align.Left
            PaddingLeft: =12
            Height: =44
            Width: =Parent.Width - 16
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            OnSelect: =Set(locNavItem, 1)
      - btnNavItem2:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Analytics"
            Fill: =If(locNavItem = 2, RGBA(59, 130, 246, 0.2), RGBA(0, 0, 0, 0))
            HoverFill: =RGBA(55, 65, 81, 1)
            Color: =If(locNavItem = 2, RGBA(96, 165, 250, 1), RGBA(209, 213, 219, 1))
            HoverColor: =RGBA(255, 255, 255, 1)
            BorderStyle: =BorderStyle.None
            Align: =Align.Left
            PaddingLeft: =12
            Height: =44
            Width: =Parent.Width - 16
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            OnSelect: =Set(locNavItem, 2)
      - btnNavItem3:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Settings"
            Fill: =If(locNavItem = 3, RGBA(59, 130, 246, 0.2), RGBA(0, 0, 0, 0))
            HoverFill: =RGBA(55, 65, 81, 1)
            Color: =If(locNavItem = 3, RGBA(96, 165, 250, 1), RGBA(209, 213, 219, 1))
            HoverColor: =RGBA(255, 255, 255, 1)
            BorderStyle: =BorderStyle.None
            Align: =Align.Left
            PaddingLeft: =12
            Height: =44
            Width: =Parent.Width - 16
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            OnSelect: =Set(locNavItem, 3)

# Screen.OnVisible: Set(locNavItem, 1)', NULL, true, false, NULL, NULL),
('top-navbar', 'navigation', 'Top Navbar', 'Responsive top navigation bar with logo and menu', '- conTopNav:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.SpaceBetween
      PaddingLeft: =24
      PaddingRight: =24
      Fill: =RGBA(255, 255, 255, 1)
      DropShadow: =DropShadow.Light
      Height: =64
      Width: =Parent.Width
    Children:
      - lblLogo:
          Control: Label@2.5.1
          Properties:
            Text: ="MyApp"
            Color: =RGBA(17, 24, 39, 1)
            FontWeight: =FontWeight.Bold
            Size: =20
      - conNavLinks:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            LayoutGap: =32
          Children:
            - lblHome:
                Control: Label@2.5.1
                Properties:
                  Text: ="Home"
                  Color: =RGBA(59, 130, 246, 1)
                  Size: =14
            - lblAbout:
                Control: Label@2.5.1
                Properties:
                  Text: ="About"
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14
            - lblContact:
                Control: Label@2.5.1
                Properties:
                  Text: ="Contact"
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14', NULL, true, false, NULL, NULL),
('text-input', 'forms', 'Text Input', 'Styled text input field with label', '- conTextInput:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =6
      Width: =300
    Children:
      - lblInputLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="Label"
            Color: =RGBA(55, 65, 81, 1)
            FontWeight: =FontWeight.Semibold
            Size: =14
      - txtInput:
          Control: Classic/TextInput@2.3.2
          Properties:
            Default: =""
            HintText: ="Enter text here"
            BorderColor: =RGBA(209, 213, 219, 1)
            BorderStyle: =BorderStyle.Solid
            Fill: =RGBA(255, 255, 255, 1)
            Color: =RGBA(17, 24, 39, 1)
            HoverBorderColor: =RGBA(156, 163, 175, 1)
            FocusedBorderColor: =RGBA(59, 130, 246, 1)
            Height: =44
            Width: =Parent.Width
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8', NULL, false, false, NULL, NULL),
('search-input', 'forms', 'Search Input', 'Search input field with search icon', '- conSearch:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =8
      PaddingLeft: =12
      PaddingRight: =12
      Fill: =RGBA(243, 244, 246, 1)
      Height: =44
      Width: =300
      RadiusTopLeft: =22
      RadiusTopRight: =22
      RadiusBottomLeft: =22
      RadiusBottomRight: =22
    Children:
      - icnSearch:
          Control: Classic/Icon@2.5.0
          Properties:
            Icon: =Icon.Search
            Color: =RGBA(156, 163, 175, 1)
            Width: =20
            Height: =20
      - txtSearch:
          Control: Classic/TextInput@2.3.2
          Properties:
            Default: =""
            HintText: ="Search..."
            BorderStyle: =BorderStyle.None
            Fill: =RGBA(0, 0, 0, 0)
            Color: =RGBA(17, 24, 39, 1)
            Height: =Parent.Height - 8
            FillPortions: =1', NULL, false, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('form-group', 'forms', 'Form Group', 'Complete form group with label, input, and validation', '- conFormGroup:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =4
      Width: =300
    Children:
      - lblFormLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="Email Address"
            Color: =RGBA(55, 65, 81, 1)
            FontWeight: =FontWeight.Semibold
            Size: =14
      - txtFormInput:
          Control: Classic/TextInput@2.3.2
          Properties:
            Default: =""
            HintText: ="you@example.com"
            BorderColor: =If(locHasError, RGBA(239, 68, 68, 1), RGBA(209, 213, 219, 1))
            BorderStyle: =BorderStyle.Solid
            Fill: =RGBA(255, 255, 255, 1)
            Color: =RGBA(17, 24, 39, 1)
            FocusedBorderColor: =If(locHasError, RGBA(239, 68, 68, 1), RGBA(59, 130, 246, 1))
            Height: =44
            Width: =Parent.Width
            RadiusTopLeft: =8
            RadiusTopRight: =8
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
      - lblFormError:
          Control: Label@2.5.1
          Properties:
            Text: ="Please enter a valid email"
            Color: =RGBA(239, 68, 68, 1)
            Size: =12
            Visible: =locHasError

# Screen.OnVisible: Set(locHasError, false)', NULL, true, false, NULL, NULL),
('toggle-switch', 'forms', 'Toggle Switch', 'Modern toggle switch control', '- Toggle1:
    Control: Toggle@1.1.5
    Properties:
      X: =40
      Y: =40', NULL, false, false, NULL, NULL),
('slider', 'forms', 'Slider', 'Modern slider for selecting numeric values', '- Slider1:
    Control: Slider@1.0.32
    Properties:
      X: =40
      Y: =40
      Value: =50
      Min: =0
      Max: =100', NULL, false, true, NULL, NULL),
('progress-bar', 'feedback', 'Progress Bar', 'Modern progress indicator with color states', '- Progress1:
    Control: Progress@1.1.34
    Properties:
      X: =60
      Y: =60
      Value: =75
      Max: =100', NULL, false, true, NULL, NULL),
('date-picker', 'forms', 'Date Picker', 'Modern date picker with calendar popup', '- DatePicker1:
    Control: DatePicker@0.0.46
    Properties:
      X: =40
      Y: =40
      Placeholder: ="Select a date"', NULL, false, true, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('data-table', 'data', 'Data Table', 'Modern responsive data table with sorting', '- Table1:
    Control: Table@1.0.278
    Properties:
      X: =60
      Y: =60
      ShowColumnHeaders: =true', NULL, false, true, NULL, NULL),
('modern-icon', 'display', 'Modern Icon', 'Fluent 2 icon component', '- Icon1:
    Control: Icon@0.0.7
    Properties:
      X: =40
      Y: =40', NULL, false, true, NULL, NULL),
('app-header', 'layout', 'App Header', 'Modern app header with navigation', '- Header1:
    Control: Header@0.0.44
    Properties:
      Y: =0', NULL, false, true, NULL, NULL),
('app-shell', 'app-shells', 'App Shell', 'Complete app layout with sidebar and content area', '# Complete App Shell Layout
- conAppShell:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      Width: =Parent.Width
      Height: =Parent.Height
      Fill: =RGBA(10, 10, 10, 1)
    Children:
      # Sidebar
      - conSidebar:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            Width: =240
            Height: =Parent.Height
            Fill: =RGBA(17, 17, 17, 1)
            PaddingTop: =16
            PaddingLeft: =16
            PaddingRight: =16
            LayoutGap: =8
          Children:
            - lblAppName:
                Control: Label@2.5.1
                Properties:
                  Text: ="My App"
                  Color: =RGBA(255, 255, 255, 1)
                  Size: =18
                  FontWeight: =FontWeight.Bold
                  Height: =40
      # Main Content
      - conMainContent:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            FillPortions: =1
            Height: =Parent.Height
            Fill: =RGBA(10, 10, 10, 1)
            PaddingTop: =24
            PaddingLeft: =32
            PaddingRight: =32

# Screen.OnVisible: Set(locSelectedNav, 1)', NULL, true, false, NULL, NULL),
('dashboard-layout', 'app-shells', 'Dashboard Layout', 'Dashboard with header, sidebar, and grid content', '# Dashboard Layout with Stats Grid
- conDashboard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      Width: =Parent.Width
      Height: =Parent.Height
      Fill: =RGBA(10, 10, 10, 1)
    Children:
      # Header
      - conDashHeader:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutJustifyContent: =LayoutJustifyContent.SpaceBetween
            Width: =Parent.Width
            Height: =64
            Fill: =RGBA(17, 17, 17, 1)
            PaddingLeft: =24
            PaddingRight: =24
          Children:
            - lblDashTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Dashboard"
                  Color: =RGBA(255, 255, 255, 1)
                  Size: =20
                  FontWeight: =FontWeight.Bold
      # Body with Sidebar
      - conDashBody:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            FillPortions: =1
            Width: =Parent.Width
          Children:
            - conDashSidebar:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  Width: =200
                  Height: =Parent.Height
                  Fill: =RGBA(17, 17, 17, 1)
            - conDashContent:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  FillPortions: =1
                  Height: =Parent.Height
                  PaddingTop: =24
                  PaddingLeft: =24

# Screen.OnVisible: Set(locDashNav, 1)', NULL, true, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('simple-modal', 'modals', 'Simple Modal', 'Basic modal dialog with title, content, and actions', '- conModalOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(0, 0, 0, 0.5)
      Width: =Parent.Width
      Height: =Parent.Height
      Visible: =locShowModal
    Children:
      - conModalContent:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =16
            PaddingTop: =24
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            Fill: =RGBA(255, 255, 255, 1)
            Width: =400
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            RadiusTopLeft: =12
            RadiusTopRight: =12
            RadiusBottomLeft: =12
            RadiusBottomRight: =12
            DropShadow: =DropShadow.Bold
          Children:
            - lblModalTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Modal Title"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - lblModalBody:
                Control: Label@2.5.1
                Properties:
                  Text: ="This is the modal content. You can add any content here."
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14
            - conModalActions:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutJustifyContent: =LayoutJustifyContent.End
                  LayoutGap: =12
                  Height: =44
                Children:
                  - btnModalCancel:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Cancel"
                        Fill: =RGBA(0, 0, 0, 0)
                        HoverFill: =RGBA(243, 244, 246, 1)
                        Color: =RGBA(107, 114, 128, 1)
                        HoverColor: =RGBA(55, 65, 81, 1)
                        BorderStyle: =BorderStyle.None
                        Height: =40
                        Width: =100
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        OnSelect: =Set(locShowModal, false)
                  - btnModalConfirm:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Confirm"
                        Fill: =RGBA(59, 130, 246, 1)
                        HoverFill: =RGBA(37, 99, 235, 1)
                        Color: =RGBA(255, 255, 255, 1)
                        HoverColor: =RGBA(255, 255, 255, 1)
                        BorderStyle: =BorderStyle.None
                        Height: =40
                        Width: =100
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        OnSelect: =Set(locShowModal, false)

# To open modal: Set(locShowModal, true)
# Screen.OnVisible: Set(locShowModal, false)', NULL, false, false, NULL, NULL),
('confirm-dialog', 'modals', 'Confirm Dialog', 'Confirmation dialog with warning icon', '- conConfirmOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(0, 0, 0, 0.5)
      Width: =Parent.Width
      Height: =Parent.Height
      Visible: =locShowConfirm
    Children:
      - conConfirmDialog:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutGap: =16
            PaddingTop: =32
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            Fill: =RGBA(255, 255, 255, 1)
            Width: =360
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            RadiusTopLeft: =12
            RadiusTopRight: =12
            RadiusBottomLeft: =12
            RadiusBottomRight: =12
            DropShadow: =DropShadow.Bold
          Children:
            - icnWarning:
                Control: Classic/Icon@2.5.0
                Properties:
                  Icon: =Icon.Warning
                  Color: =RGBA(245, 158, 11, 1)
                  Width: =48
                  Height: =48
            - lblConfirmTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Are you sure?"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - lblConfirmMsg:
                Control: Label@2.5.1
                Properties:
                  Text: ="This action cannot be undone."
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14
                  Align: =Align.Center
            - conBtns:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =12
                  Height: =44
                Children:
                  - btnNo:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Cancel"
                        Fill: =RGBA(243, 244, 246, 1)
                        HoverFill: =RGBA(229, 231, 235, 1)
                        Color: =RGBA(55, 65, 81, 1)
                        HoverColor: =RGBA(17, 24, 39, 1)
                        BorderStyle: =BorderStyle.None
                        Height: =40
                        Width: =120
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        OnSelect: =Set(locShowConfirm, false)
                  - btnYes:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Delete"
                        Fill: =RGBA(239, 68, 68, 1)
                        HoverFill: =RGBA(220, 38, 38, 1)
                        Color: =RGBA(255, 255, 255, 1)
                        HoverColor: =RGBA(255, 255, 255, 1)
                        BorderStyle: =BorderStyle.None
                        Height: =40
                        Width: =120
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        OnSelect: =Set(locShowConfirm, false)

# To open: Set(locShowConfirm, true)
# Screen.OnVisible: Set(locShowConfirm, false)', NULL, true, false, NULL, NULL),
('bottom-sheet', 'modals', 'Bottom Sheet', 'Mobile-style bottom sheet modal', '- conSheetOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(0, 0, 0, 0.5)
      Width: =Parent.Width
      Height: =Parent.Height
      Visible: =locShowSheet
    Children:
      - conSheet:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =16
            PaddingTop: =16
            PaddingBottom: =32
            PaddingLeft: =24
            PaddingRight: =24
            Fill: =RGBA(255, 255, 255, 1)
            Width: =Parent.Width
            X: =0
            Y: =Parent.Height - Self.Height
            RadiusTopLeft: =20
            RadiusTopRight: =20
          Children:
            - conHandle:
                Control: GroupContainer@1.3.0
                Variant: ManualLayout
                Properties:
                  Fill: =RGBA(209, 213, 219, 1)
                  Width: =40
                  Height: =4
                  RadiusTopLeft: =2
                  RadiusTopRight: =2
                  RadiusBottomLeft: =2
                  RadiusBottomRight: =2
            - lblSheetTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Share"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - conOptions:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Vertical
                  LayoutGap: =8
                Children:
                  - btnOption1:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Copy Link"
                        Fill: =RGBA(243, 244, 246, 1)
                        HoverFill: =RGBA(229, 231, 235, 1)
                        Color: =RGBA(17, 24, 39, 1)
                        HoverColor: =RGBA(17, 24, 39, 1)
                        BorderStyle: =BorderStyle.None
                        Align: =Align.Left
                        PaddingLeft: =16
                        Height: =48
                        Width: =Parent.Width
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                  - btnOption2:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="Share to Twitter"
                        Fill: =RGBA(243, 244, 246, 1)
                        HoverFill: =RGBA(229, 231, 235, 1)
                        Color: =RGBA(17, 24, 39, 1)
                        HoverColor: =RGBA(17, 24, 39, 1)
                        BorderStyle: =BorderStyle.None
                        Align: =Align.Left
                        PaddingLeft: =16
                        Height: =48
                        Width: =Parent.Width
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
      - btnCloseSheet:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Width: =Parent.Width
            Height: =Parent.Height - conSheet.Height
            X: =0
            Y: =0
            OnSelect: =Set(locShowSheet, false)

# To open: Set(locShowSheet, true)
# Screen.OnVisible: Set(locShowSheet, false)', NULL, true, false, NULL, NULL),
('alert-dialog', 'modals', 'Alert Dialog', 'Alert dialog with icon and single action', '- conAlertOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =RGBA(0, 0, 0, 0.5)
      Width: =Parent.Width
      Height: =Parent.Height
      Visible: =locShowAlert
    Children:
      - conAlertBox:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutGap: =16
            PaddingTop: =32
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            Fill: =RGBA(255, 255, 255, 1)
            Width: =320
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            RadiusTopLeft: =12
            RadiusTopRight: =12
            RadiusBottomLeft: =12
            RadiusBottomRight: =12
            DropShadow: =DropShadow.Bold
          Children:
            - icnSuccess:
                Control: Classic/Icon@2.5.0
                Properties:
                  Icon: =Icon.CheckMark
                  Color: =RGBA(34, 197, 94, 1)
                  Width: =48
                  Height: =48
            - lblAlertTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Success!"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - lblAlertMsg:
                Control: Label@2.5.1
                Properties:
                  Text: ="Your changes have been saved."
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14
                  Align: =Align.Center
            - btnAlertOk:
                Control: Classic/Button@2.2.0
                Properties:
                  Text: ="OK"
                  Fill: =RGBA(59, 130, 246, 1)
                  HoverFill: =RGBA(37, 99, 235, 1)
                  Color: =RGBA(255, 255, 255, 1)
                  HoverColor: =RGBA(255, 255, 255, 1)
                  BorderStyle: =BorderStyle.None
                  Height: =40
                  Width: =Parent.Width - 48
                  RadiusTopLeft: =8
                  RadiusTopRight: =8
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8
                  OnSelect: =Set(locShowAlert, false)

# To open: Set(locShowAlert, true)
# Screen.OnVisible: Set(locShowAlert, false)', NULL, true, false, NULL, NULL),
('stats-card', 'cards', 'Stats Card', 'Card displaying a statistic with label', '- conStatsCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =8
      PaddingTop: =20
      PaddingBottom: =20
      PaddingLeft: =20
      PaddingRight: =20
      Fill: =RGBA(255, 255, 255, 1)
      Width: =200
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      DropShadow: =DropShadow.Light
    Children:
      - lblStatLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="Total Sales"
            Color: =RGBA(107, 114, 128, 1)
            Size: =14
      - lblStatValue:
          Control: Label@2.5.1
          Properties:
            Text: ="$12,345"
            Color: =RGBA(17, 24, 39, 1)
            FontWeight: =FontWeight.Bold
            Size: =28
      - conStatChange:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutGap: =4
          Children:
            - icnUp:
                Control: Classic/Icon@2.5.0
                Properties:
                  Icon: =Icon.ChevronUp
                  Color: =RGBA(34, 197, 94, 1)
                  Width: =16
                  Height: =16
            - lblChange:
                Control: Label@2.5.1
                Properties:
                  Text: ="+12%"
                  Color: =RGBA(34, 197, 94, 1)
                  Size: =14', NULL, false, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES
('profile-card', 'cards', 'Profile Card', 'User profile card with avatar and details', '- conProfileCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =16
      PaddingTop: =32
      PaddingBottom: =24
      PaddingLeft: =24
      PaddingRight: =24
      Fill: =RGBA(255, 255, 255, 1)
      Width: =280
      RadiusTopLeft: =16
      RadiusTopRight: =16
      RadiusBottomLeft: =16
      RadiusBottomRight: =16
      DropShadow: =DropShadow.Light
    Children:
      - conAvatar:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(59, 130, 246, 1)
            Width: =80
            Height: =80
            RadiusTopLeft: =40
            RadiusTopRight: =40
            RadiusBottomLeft: =40
            RadiusBottomRight: =40
          Children:
            - lblInitials:
                Control: Label@2.5.1
                Properties:
                  Text: ="JD"
                  Color: =RGBA(255, 255, 255, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =28
                  Align: =Align.Center
                  Width: =Parent.Width
                  Height: =Parent.Height
      - lblName:
          Control: Label@2.5.1
          Properties:
            Text: ="John Doe"
            Color: =RGBA(17, 24, 39, 1)
            FontWeight: =FontWeight.Bold
            Size: =18
      - lblRole:
          Control: Label@2.5.1
          Properties:
            Text: ="Software Engineer"
            Color: =RGBA(107, 114, 128, 1)
            Size: =14
      - btnFollow:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="Follow"
            Fill: =RGBA(59, 130, 246, 1)
            HoverFill: =RGBA(37, 99, 235, 1)
            Color: =RGBA(255, 255, 255, 1)
            HoverColor: =RGBA(255, 255, 255, 1)
            BorderStyle: =BorderStyle.None
            Height: =40
            Width: =200
            RadiusTopLeft: =20
            RadiusTopRight: =20
            RadiusBottomLeft: =20
            RadiusBottomRight: =20', NULL, true, false, NULL, NULL),
('product-card', 'cards', 'Product Card', 'E-commerce product card with image and price', '- conProductCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      Fill: =RGBA(255, 255, 255, 1)
      Width: =240
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      DropShadow: =DropShadow.Light
    Children:
      - conProductImage:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(243, 244, 246, 1)
            Width: =Parent.Width
            Height: =160
            RadiusTopLeft: =12
            RadiusTopRight: =12
      - conProductInfo:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =8
            PaddingTop: =16
            PaddingBottom: =16
            PaddingLeft: =16
            PaddingRight: =16
          Children:
            - lblProductName:
                Control: Label@2.5.1
                Properties:
                  Text: ="Product Name"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Semibold
                  Size: =16
            - lblProductPrice:
                Control: Label@2.5.1
                Properties:
                  Text: ="$99.00"
                  Color: =RGBA(59, 130, 246, 1)
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - btnAddCart:
                Control: Classic/Button@2.2.0
                Properties:
                  Text: ="Add to Cart"
                  Fill: =RGBA(17, 24, 39, 1)
                  HoverFill: =RGBA(31, 41, 55, 1)
                  Color: =RGBA(255, 255, 255, 1)
                  HoverColor: =RGBA(255, 255, 255, 1)
                  BorderStyle: =BorderStyle.None
                  Height: =40
                  Width: =Parent.Width - 32
                  RadiusTopLeft: =8
                  RadiusTopRight: =8
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8', NULL, true, false, NULL, NULL),
('info-card', 'cards', 'Info Card', 'Information card with icon and description', '- conInfoCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutGap: =16
      PaddingTop: =20
      PaddingBottom: =20
      PaddingLeft: =20
      PaddingRight: =20
      Fill: =RGBA(255, 255, 255, 1)
      Width: =350
      RadiusTopLeft: =12
      RadiusTopRight: =12
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      DropShadow: =DropShadow.Light
    Children:
      - conIconBg:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(59, 130, 246, 0.1)
            Width: =48
            Height: =48
            RadiusTopLeft: =12
            RadiusTopRight: =12
            RadiusBottomLeft: =12
            RadiusBottomRight: =12
          Children:
            - icnInfo:
                Control: Classic/Icon@2.5.0
                Properties:
                  Icon: =Icon.Info
                  Color: =RGBA(59, 130, 246, 1)
                  Width: =24
                  Height: =24
                  X: =12
                  Y: =12
      - conText:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =4
            FillPortions: =1
          Children:
            - lblInfoTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="Did you know?"
                  Color: =RGBA(17, 24, 39, 1)
                  FontWeight: =FontWeight.Semibold
                  Size: =16
            - lblInfoDesc:
                Control: Label@2.5.1
                Properties:
                  Text: ="This is an informational card that can display helpful tips or important notices."
                  Color: =RGBA(107, 114, 128, 1)
                  Size: =14', NULL, true, false, NULL, NULL)
ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;

