// Component data store with initial FREE components

import { Component, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Tabs', slug: 'tabs', description: 'Tab navigation components', icon: '📑', orderIndex: 1, componentsCount: 4, freeCount: 2 },
  { id: '2', name: 'Buttons', slug: 'buttons', description: 'Interactive buttons', icon: '🔘', orderIndex: 2, componentsCount: 4, freeCount: 2 },
  { id: '3', name: 'Navigation', slug: 'navigation', description: 'Navigation components', icon: '🧭', orderIndex: 3, componentsCount: 4, freeCount: 2 },
  { id: '4', name: 'Feedback', slug: 'feedback', description: 'User feedback components', icon: '💬', orderIndex: 4, componentsCount: 4, freeCount: 2 },
  { id: '5', name: 'Forms', slug: 'forms', description: 'Form input components', icon: '📝', orderIndex: 5, componentsCount: 4, freeCount: 2 },
  { id: '6', name: 'App Shells', slug: 'app-shells', description: 'Complete app layouts', icon: '🏠', orderIndex: 6, componentsCount: 4, freeCount: 0 },
  { id: '7', name: 'Modals', slug: 'modals', description: 'Dialog and popup components', icon: '🪟', orderIndex: 7, componentsCount: 4, freeCount: 1 },
  { id: '8', name: 'Cards', slug: 'cards', description: 'Content card components', icon: '🃏', orderIndex: 8, componentsCount: 4, freeCount: 1 },
];

export const components: Component[] = [
  // TABS - FREE
  {
    id: 'tab-bar',
    name: 'Tab Bar',
    slug: 'tab-bar',
    category: 'tabs',
    description: 'Basic horizontal tab navigation with selection state',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conTabBar:
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

# Screen.OnVisible: Set(locSelectedTab, 1)`
  },
  {
    id: 'animated-underline-tabs',
    name: 'Animated Underline Tabs',
    slug: 'animated-underline-tabs',
    category: 'tabs',
    description: 'Tab bar with smooth sliding underline indicator',
    isPro: false,
    isNew: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `# Timer for smooth animation
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
# Set(locStartTabAnim, false)`
  },
  // TABS - PRO
  {
    id: 'animated-pill-tabs',
    name: 'Animated Pill Tabs',
    slug: 'animated-pill-tabs',
    category: 'tabs',
    description: 'Modern iOS-style tabs with sliding pill background',
    isPro: true,
    isNew: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conPillTabs:
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

# Screen.OnVisible: Set(locSelectedTab, 1)`
  },
  {
    id: 'segmented-tabs',
    name: 'Segmented Tabs',
    slug: 'segmented-tabs',
    category: 'tabs',
    description: 'iOS-style segmented control for compact view switching',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conSegmented:
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

# Screen.OnVisible: Set(locSelected, 1)`
  },
  // BUTTONS - FREE
  {
    id: 'classic-button',
    name: 'Classic Button',
    slug: 'classic-button',
    category: 'buttons',
    description: 'Standard button with hover and pressed states',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- btnPrimary:
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
      Font: =Font.'Open Sans'
      FontWeight: =FontWeight.Semibold
      Size: =14
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Height: =44
      Width: =160
      OnSelect: =Notify("Button clicked!")`
  },
  {
    id: 'outline-button',
    name: 'Outline Button',
    slug: 'outline-button',
    category: 'buttons',
    description: 'Transparent button with border, perfect for secondary actions',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- btnOutline:
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
      Font: =Font.'Open Sans'
      FontWeight: =FontWeight.Semibold
      Size: =14
      RadiusTopLeft: =8
      RadiusTopRight: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      Height: =44
      Width: =160
      OnSelect: =Notify("Outline button clicked!")`
  },
  // BUTTONS - PRO
  {
    id: 'loading-button',
    name: 'Loading Button',
    slug: 'loading-button',
    category: 'buttons',
    description: 'Button with loading spinner to prevent double-clicks',
    isPro: true,
    isNew: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conLoadingBtn:
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
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
                <circle cx='12' cy='12' r='10' stroke='white' stroke-width='3' stroke-opacity='0.3'/>
                <path d='M12 2a10 10 0 0 1 10 10' stroke='white' stroke-width='3' stroke-linecap='round'>
                  <animateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='1s' repeatCount='indefinite'/>
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

# Screen.OnVisible: Set(locIsLoading, false)`
  },
  {
    id: 'icon-button',
    name: 'Icon Button',
    slug: 'icon-button',
    category: 'buttons',
    description: 'Button with icon and text for enhanced visual appeal',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conIconBtn:
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
            OnSelect: =Notify("Add Item clicked!")`
  },
  // FEEDBACK - FREE
  {
    id: 'toast-notification',
    name: 'Toast Notification',
    slug: 'toast-notification',
    category: 'feedback',
    description: 'Auto-dismissing notification for user feedback',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `# Timer for auto-dismiss
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
# Screen.OnVisible: Set(locShowToast, false)`
  },
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    slug: 'loading-spinner',
    category: 'feedback',
    description: 'Animated SVG spinner for loading states',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- imgSpinner:
    Control: Image@2.2.3
    Properties:
      Width: =48
      Height: =48
      Image: |-
        ="data:image/svg+xml;utf8," & EncodeUrl("
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
          <circle cx='25' cy='25' r='20' fill='none' stroke='#e5e7eb' stroke-width='4'/>
          <circle cx='25' cy='25' r='20' fill='none' stroke='#3b82f6' stroke-width='4' stroke-dasharray='90 60'>
            <animateTransform attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='1s' repeatCount='indefinite'/>
          </circle>
        </svg>
        ")`
  },
  // NAVIGATION - FREE
  {
    id: 'bottom-nav',
    name: 'Bottom Navigation',
    slug: 'bottom-navigation',
    category: 'navigation',
    description: 'Mobile-style bottom navigation bar with 4 tabs',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conBottomNav:
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

# Screen.OnVisible: Set(locBottomNav, 1)`
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'navigation',
    description: 'Breadcrumb navigation for hierarchical navigation',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conBreadcrumb:
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
            Size: =14`
  },
  // NAVIGATION - PRO
  {
    id: 'sidebar-nav',
    name: 'Sidebar Navigation',
    slug: 'sidebar-navigation',
    category: 'navigation',
    description: 'Collapsible sidebar navigation with icons',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conSidebar:
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

# Screen.OnVisible: Set(locNavItem, 1)`
  },
  {
    id: 'top-navbar',
    name: 'Top Navbar',
    slug: 'top-navbar',
    category: 'navigation',
    description: 'Responsive top navigation bar with logo and menu',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conTopNav:
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
                  Size: =14`
  },
  // FORMS - FREE
  {
    id: 'text-input',
    name: 'Text Input',
    slug: 'text-input',
    category: 'forms',
    description: 'Styled text input field with label',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conTextInput:
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
            RadiusBottomRight: =8`
  },
  {
    id: 'search-input',
    name: 'Search Input',
    slug: 'search-input',
    category: 'forms',
    description: 'Search input field with search icon',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conSearch:
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
            FillPortions: =1`
  },
  // FORMS - PRO
  {
    id: 'form-group',
    name: 'Form Group',
    slug: 'form-group',
    category: 'forms',
    description: 'Complete form group with label, input, and validation',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conFormGroup:
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

# Screen.OnVisible: Set(locHasError, false)`
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    slug: 'toggle-switch',
    category: 'forms',
    description: 'iOS-style toggle switch',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conToggle:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Fill: =If(locToggleOn, RGBA(59, 130, 246, 1), RGBA(209, 213, 219, 1))
      Height: =28
      Width: =52
      RadiusTopLeft: =14
      RadiusTopRight: =14
      RadiusBottomLeft: =14
      RadiusBottomRight: =14
    Children:
      - conToggleKnob:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =RGBA(255, 255, 255, 1)
            Height: =24
            Width: =24
            X: =If(locToggleOn, 26, 2)
            Y: =2
            RadiusTopLeft: =12
            RadiusTopRight: =12
            RadiusBottomLeft: =12
            RadiusBottomRight: =12
            DropShadow: =DropShadow.Light
      - btnToggleOverlay:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Width: =Parent.Width
            Height: =Parent.Height
            X: =0
            Y: =0
            OnSelect: =Set(locToggleOn, !locToggleOn)

# Screen.OnVisible: Set(locToggleOn, false)`
  },
  // MODALS - FREE
  {
    id: 'simple-modal',
    name: 'Simple Modal',
    slug: 'simple-modal',
    category: 'modals',
    description: 'Basic modal dialog with title, content, and actions',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conModalOverlay:
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
# Screen.OnVisible: Set(locShowModal, false)`
  },
  // MODALS - PRO
  {
    id: 'confirm-dialog',
    name: 'Confirm Dialog',
    slug: 'confirm-dialog',
    category: 'modals',
    description: 'Confirmation dialog with warning icon',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conConfirmOverlay:
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
# Screen.OnVisible: Set(locShowConfirm, false)`
  },
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    slug: 'bottom-sheet',
    category: 'modals',
    description: 'Mobile-style bottom sheet modal',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conSheetOverlay:
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
# Screen.OnVisible: Set(locShowSheet, false)`
  },
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    slug: 'alert-dialog',
    category: 'modals',
    description: 'Alert dialog with icon and single action',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conAlertOverlay:
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
# Screen.OnVisible: Set(locShowAlert, false)`
  },
  // CARDS - FREE
  {
    id: 'stats-card',
    name: 'Stats Card',
    slug: 'stats-card',
    category: 'cards',
    description: 'Card displaying a statistic with label',
    isPro: false,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conStatsCard:
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
                  Size: =14`
  },
  // CARDS - PRO
  {
    id: 'profile-card',
    name: 'Profile Card',
    slug: 'profile-card',
    category: 'cards',
    description: 'User profile card with avatar and details',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conProfileCard:
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
            RadiusBottomRight: =20`
  },
  {
    id: 'product-card',
    name: 'Product Card',
    slug: 'product-card',
    category: 'cards',
    description: 'E-commerce product card with image and price',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conProductCard:
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
                  RadiusBottomRight: =8`
  },
  {
    id: 'info-card',
    name: 'Info Card',
    slug: 'info-card',
    category: 'cards',
    description: 'Information card with icon and description',
    isPro: true,
    createdAt: '2024-12-26',
    updatedAt: '2024-12-26',
    yamlCode: `- conInfoCard:
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
                  Size: =14`
  }
];

// Helper functions
export function getComponentsByCategory(categorySlug: string): Component[] {
  return components.filter(c => c.category === categorySlug);
}

export function getComponentBySlug(slug: string): Component | undefined {
  return components.find(c => c.slug === slug);
}

export function getFreeComponents(): Component[] {
  return components.filter(c => !c.isPro);
}

export function getProComponents(): Component[] {
  return components.filter(c => c.isPro);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
