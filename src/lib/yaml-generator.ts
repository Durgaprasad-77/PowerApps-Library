import { SettingsValues } from './settings-types';

/**
 * Converts a hex color to RGBA format for Power Apps
 * @param hex - Hex color string (e.g., "#ffffff")
 * @returns RGBA string (e.g., "RGBA(255, 255, 255, 1)")
 */
function hexToRGBA(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'RGBA(0, 0, 0, 1)';

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `RGBA(${r}, ${g}, ${b}, 1)`;
}

// ============================================
// TAB BAR GENERATOR
// ============================================

export function generateTabBarYAML(settings: SettingsValues): string {
  const tabs = settings.tabs as string[];
  const bgColor = hexToRGBA(settings.backgroundColor as string);
  const activeColor = hexToRGBA(settings.activeTabColor as string);
  const inactiveColor = hexToRGBA(settings.inactiveTabColor as string);
  const indicatorColor = hexToRGBA(settings.indicatorColor as string);
  const height = settings.tabHeight as number;
  const radius = settings.borderRadius as number;
  const showIndicator = settings.showIndicator as boolean;
  const fullWidth = settings.fullWidth as boolean;

  const tabButtons = tabs.map((label, index) => {
    const tabNum = index + 1;
    return `      - btnTab${tabNum}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${label}"
            Width: =${fullWidth ? `Parent.Width / ${tabs.length}` : '120'}
            Height: =Parent.Height${showIndicator ? ' - 3' : ''}
            X: =${fullWidth ? `Parent.Width / ${tabs.length} * ${index}` : `${index * 124}`}
            Y: =0
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locSelectedTab = ${tabNum}, ${activeColor}, ${inactiveColor})
            HoverColor: =If(locSelectedTab = ${tabNum}, ${activeColor}, ${inactiveColor})
            HoverFill: =RGBA(255, 255, 255, 0.05)
            PressedFill: =RGBA(255, 255, 255, 0.1)
            BorderStyle: =BorderStyle.None
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            OnSelect: =Set(locSelectedTab, ${tabNum})`;
  }).join('\n');

  const indicatorYAML = showIndicator ? `
      - recIndicator:
          Control: Rectangle@2.3.0
          Properties:
            Width: =${fullWidth ? `Parent.Width / ${tabs.length}` : '120'}
            Height: =3
            X: =(locSelectedTab - 1) * ${fullWidth ? `Parent.Width / ${tabs.length}` : '120'}
            Y: =Parent.Height - Self.Height
            Fill: =${indicatorColor}` : '';

  return `- conTabBar:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =${height}
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:
${tabButtons}${indicatorYAML}

# Add to Screen.OnVisible:
# Set(locSelectedTab, ${settings.selectedIndex || 1})`;
}

// ============================================
// BUTTON GENERATORS
// ============================================

export function generateClassicButtonYAML(settings: SettingsValues): string {
  const text = settings.text as string;
  const bgColor = hexToRGBA(settings.backgroundColor as string);
  const textColor = hexToRGBA(settings.textColor as string);
  const hoverColor = hexToRGBA(settings.hoverColor as string);
  const radius = settings.borderRadius as number;
  const paddingX = settings.paddingX as number;
  const paddingY = settings.paddingY as number;
  const fontWeight = settings.fontWeight as string;
  const showBorder = settings.showBorder as boolean;
  const borderColor = hexToRGBA(settings.borderColor as string);

  const fontWeightMap: Record<string, string> = {
    '400': 'FontWeight.Normal',
    '500': 'FontWeight.Semibold',
    '600': 'FontWeight.Semibold',
    '700': 'FontWeight.Bold',
  };

  return `- btnPrimary:
    Control: Classic/Button@2.2.0
    Properties:
      Text: ="${text}"
      Width: =${paddingX * 2 + text.length * 8}
      Height: =${paddingY * 2 + 20}
      Fill: =${bgColor}
      Color: =${textColor}
      HoverFill: =${hoverColor}
      HoverColor: =${textColor}
      PressedFill: =ColorFade(Self.Fill, -20%)
      PressedColor: =${textColor}
      BorderStyle: =${showBorder ? 'BorderStyle.Solid' : 'BorderStyle.None'}
      BorderColor: =${borderColor}
      BorderThickness: =1
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      Font: =Font.'Segoe UI'
      FontWeight: =${fontWeightMap[fontWeight] || 'FontWeight.Semibold'}
      PaddingTop: =${paddingY}
      PaddingBottom: =${paddingY}
      PaddingLeft: =${paddingX}
      PaddingRight: =${paddingX}
      OnSelect: =// Add your action here`;
}

export function generateOutlineButtonYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Learn More';
  const borderColor = hexToRGBA((settings.borderColor as string) || '#404040');
  const textColor = hexToRGBA((settings.textColor as string) || '#ffffff');
  const hoverBg = hexToRGBA((settings.hoverBackgroundColor as string) || '#1a1a1a');
  const radius = (settings.borderRadius as number) || 8;
  const borderWidth = (settings.borderWidth as number) || 1;

  return `- btnOutline:
    Control: Classic/Button@2.2.0
    Properties:
      Text: ="${text}"
      Width: =${text.length * 10 + 40}
      Height: =40
      Fill: =RGBA(0, 0, 0, 0)
      Color: =${textColor}
      HoverFill: =${hoverBg}
      HoverColor: =${textColor}
      PressedFill: =ColorFade(${hoverBg}, -20%)
      PressedColor: =${textColor}
      BorderStyle: =BorderStyle.Solid
      BorderColor: =${borderColor}
      BorderThickness: =${borderWidth}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      Font: =Font.'Segoe UI'
      FontWeight: =FontWeight.Semibold
      OnSelect: =// Add your action here`;
}

export function generateLoadingButtonYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Submit';
  const loadingText = (settings.loadingText as string) || 'Loading...';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#ffffff');
  const textColor = hexToRGBA((settings.textColor as string) || '#0a0a0a');
  const radius = (settings.borderRadius as number) || 8;

  return `- conLoadingButton:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =8
      Width: =160
      Height: =44
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:
      - lblSpinner:
          Control: Label@2.5.1
          Properties:
            Text: ="⟳"
            Width: =20
            Height: =20
            Color: =${textColor}
            Visible: =locIsLoading
      - lblText:
          Control: Label@2.5.1
          Properties:
            Text: =If(locIsLoading, "${loadingText}", "${text}")
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
      - btnOverlay:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Width: =Parent.Width
            Height: =Parent.Height
            X: =0
            Y: =0
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =If(locIsLoading, RGBA(0, 0, 0, 0), RGBA(0, 0, 0, 0.1))
            BorderStyle: =BorderStyle.None
            OnSelect: |-
              =If(!locIsLoading,
                Set(locIsLoading, true);
                // Add your async action here
                // Then: Set(locIsLoading, false)
              )

# Add to Screen.OnVisible:
# Set(locIsLoading, false)`;
}

// ============================================
// FEEDBACK GENERATORS
// ============================================

export function generateToastNotificationYAML(settings: SettingsValues): string {
  const message = settings.message as string;
  const type = settings.type as string;
  const bgColor = hexToRGBA(settings.backgroundColor as string);
  const textColor = hexToRGBA(settings.textColor as string);
  const radius = settings.borderRadius as number;
  const duration = settings.duration as number;
  const showIcon = settings.showIcon as boolean;
  const dismissible = settings.dismissible as boolean;

  const typeIcons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  const icon = typeIcons[type] || '✓';

  return `- conToast:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =12
      PaddingTop: =16
      PaddingBottom: =16
      PaddingLeft: =20
      PaddingRight: =20
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      Visible: =locShowToast
      DropShadow: =DropShadow.Bold
    Children:${showIcon ? `
      - lblIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="${icon}"
            Width: =24
            Height: =24
            Color: =${textColor}
            Align: =Align.Center` : ''}
      - lblMessage:
          Control: Label@2.5.1
          Properties:
            Text: ="${message}"
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            Width: =300${dismissible ? `
      - btnClose:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="✕"
            Width: =24
            Height: =24
            Fill: =RGBA(0, 0, 0, 0)
            Color: =${textColor}
            HoverFill: =RGBA(255, 255, 255, 0.1)
            BorderStyle: =BorderStyle.None
            OnSelect: =Set(locShowToast, false)` : ''}

- tmrToast:
    Control: Timer@2.1.0
    Properties:
      Duration: =${duration}
      Start: =locShowToast
      Repeat: =false
      OnTimerEnd: =Set(locShowToast, false)

# Add to Screen.OnVisible:
# Set(locShowToast, false)
# To show toast: Set(locShowToast, true)`;
}

export function generateLoadingSpinnerYAML(settings: SettingsValues): string {
  const size = (settings.size as number) || 48;
  const color = hexToRGBA((settings.color as string) || '#ffffff');
  const thickness = (settings.thickness as number) || 4;

  return `- imgSpinner:
    Control: Image@2.2.3
    Properties:
      Width: =${size}
      Height: =${size}
      Image: |-
        ="data:image/svg+xml;utf8," & EncodeUrl("
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
          <circle cx='25' cy='25' r='20' fill='none' stroke='${color.replace('RGBA', 'rgba').replace(')', ', 0.2)')}' stroke-width='${thickness}'/>
          <circle cx='25' cy='25' r='20' fill='none' stroke='${color.replace('RGBA', 'rgba').replace(', 1)', ', 1)')}' stroke-width='${thickness}' stroke-dasharray='31.4 94.2'>
            <animateTransform attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='1s' repeatCount='indefinite'/>
          </circle>
        </svg>
        ")`;
}

export function generateSimpleBadgeYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Default';
  const textColor = (settings.textColor as string) || '#245096';
  const borderRadius = (settings.borderRadius as number) || 6;
  const rgbaColor = hexToRGBA(textColor);

  return `- conBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =ColorFade(${rgbaColor}, 80%)
      RadiusBottomLeft: =${borderRadius}
      RadiusBottomRight: =${borderRadius}
      RadiusTopLeft: =${borderRadius}
      RadiusTopRight: =${borderRadius}
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
            Text: ="${text}"
            Color: =${rgbaColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =12
            Align: =Align.Center`;
}

export function generateOutlineBadgeYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Pending';
  const borderColor = (settings.borderColor as string) || '#6b7280';
  const rgbaColor = hexToRGBA(borderColor);

  return `- conOutlineBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =RGBA(0, 0, 0, 0)
      BorderColor: =${rgbaColor}
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
            Text: ="${text}"
            Color: =${rgbaColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =12
            Align: =Align.Center`;
}

export function generateIconBadgeYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Success';
  const type = (settings.type as string) || 'success';

  const iconColors: Record<string, { icon: string; color: string }> = {
    success: { icon: '✓', color: 'RGBA(34, 197, 94, 1)' },
    error: { icon: '✕', color: 'RGBA(239, 68, 68, 1)' },
    warning: { icon: '⚠', color: 'RGBA(245, 158, 11, 1)' },
    info: { icon: 'ℹ', color: 'RGBA(59, 130, 246, 1)' },
  };

  const { icon, color } = iconColors[type] || iconColors.success;

  return `- conIconBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =4
      Fill: =ColorFade(${color}, 80%)
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
            Text: ="${icon}"
            Color: =${color}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =12
      - lblIconBadgeText:
          Control: Label@2.5.1
          Properties:
            Text: ="${text}"
            Color: =${color}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =12`;
}

export function generateCounterBadgeYAML(settings: SettingsValues): string {
  const count = (settings.count as number) || 5;
  const maxValue = (settings.maxValue as number) || 99;
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#ef4444');

  const displayText = count > maxValue ? `${maxValue}+` : String(count);
  const width = displayText.length > 2 ? 32 : 24;

  return `- conCounterBadge:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      Fill: =${bgColor}
      RadiusBottomLeft: =12
      RadiusBottomRight: =12
      RadiusTopLeft: =12
      RadiusTopRight: =12
      Height: =24
      Width: =${width}
    Children:
      - lblCount:
          Control: Label@2.5.1
          Properties:
            Text: ="${displayText}"
            Color: =RGBA(255, 255, 255, 1)
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =11
            Align: =Align.Center`;
}

export function generateStatusDotYAML(settings: SettingsValues): string {
  const status = (settings.status as string) || 'online';
  const showLabel = (settings.showLabel as boolean) ?? true;

  const statusColors: Record<string, string> = {
    online: 'RGBA(34, 197, 94, 1)',
    away: 'RGBA(245, 158, 11, 1)',
    busy: 'RGBA(239, 68, 68, 1)',
    offline: 'RGBA(107, 114, 128, 1)',
  };

  const dotColor = statusColors[status] || statusColors.online;
  const labelText = status.charAt(0).toUpperCase() + status.slice(1);

  let yaml = `- conStatusDot:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =8
      Height: =24
      Width: =${showLabel ? 80 : 12}
    Children:
      - conDot:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =${dotColor}
            RadiusBottomLeft: =6
            RadiusBottomRight: =6
            RadiusTopLeft: =6
            RadiusTopRight: =6
            Height: =12
            Width: =12`;

  if (showLabel) {
    yaml += `
      - lblStatusText:
          Control: Label@2.5.1
          Properties:
            Text: ="${labelText}"
            Color: =RGBA(107, 114, 128, 1)
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Normal
            Size: =12`;
  }

  return yaml;
}

export function generatePulsingBadgeYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'New';
  const badgeColor = (settings.badgeColor as string) || '#ef4444';

  return `- conPulsingBadge:
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
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'>
                <rect x='10' y='6' width='80' height='28' rx='14' fill='${badgeColor}' opacity='0.4'>
                  <animate attributeName='opacity' values='0.4;0.1;0.4' dur='1.5s' repeatCount='indefinite'/>
                  <animate attributeName='width' values='80;90;80' dur='1.5s' repeatCount='indefinite'/>
                  <animate attributeName='x' values='10;5;10' dur='1.5s' repeatCount='indefinite'/>
                </rect>
                <rect x='10' y='6' width='80' height='28' rx='14' fill='${badgeColor}'/>
                <text x='50' y='24' text-anchor='middle' fill='white' font-size='12' font-weight='600' font-family='Segoe UI'>${text}</text>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =Parent.Width
            Height: =Parent.Height`;
}

export function generateDismissibleChipYAML(settings: SettingsValues): string {
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#e5e7eb');
  const textColor = hexToRGBA((settings.textColor as string) || '#374151');

  return `- conDismissibleChip:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutGap: =6
      Fill: =${bgColor}
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
      Visible: =locChipVisible
    Children:
      - lblChipText:
          Control: Label@2.5.1
          Properties:
            Text: ="Marketing"
            Color: =${textColor}
            Font: =Font.'Segoe UI'
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
# Set(locChipVisible, true)`;
}

export function generateAvatarStatusYAML(settings: SettingsValues): string {
  const status = (settings.status as string) || 'online';
  const size = (settings.size as string) || 'medium';

  const statusColors: Record<string, string> = {
    online: 'RGBA(34, 197, 94, 1)',
    away: 'RGBA(245, 158, 11, 1)',
    busy: 'RGBA(239, 68, 68, 1)',
    offline: 'RGBA(107, 114, 128, 1)',
  };

  const sizeConfig: Record<string, { avatar: number; dot: number; dotX: number; dotY: number }> = {
    small: { avatar: 32, dot: 10, dotX: 22, dotY: 22 },
    medium: { avatar: 48, dot: 14, dotX: 34, dotY: 34 },
    large: { avatar: 64, dot: 18, dotX: 46, dotY: 46 },
  };

  const config = sizeConfig[size] || sizeConfig.medium;
  const dotColor = statusColors[status] || statusColors.online;

  return `- conAvatarStatus:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Height: =${config.avatar}
      Width: =${config.avatar}
    Children:
      - imgAvatar:
          Control: Image@2.2.3
          Properties:
            Image: |-
              ="data:image/svg+xml;utf8," & EncodeUrl("
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
                <circle cx='24' cy='24' r='24' fill='#e5e7eb'/>
                <circle cx='24' cy='18' r='8' fill='#9ca3af'/>
                <path d='M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16' fill='#9ca3af'/>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =${config.avatar}
            Height: =${config.avatar}
      - conStatusDot:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Fill: =${dotColor}
            BorderColor: =RGBA(255, 255, 255, 1)
            BorderThickness: =2
            RadiusBottomLeft: =${config.dot / 2}
            RadiusBottomRight: =${config.dot / 2}
            RadiusTopLeft: =${config.dot / 2}
            RadiusTopRight: =${config.dot / 2}
            X: =${config.dotX}
            Y: =${config.dotY}
            Height: =${config.dot}
            Width: =${config.dot}`;
}

export function generateGradientBadgeYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'PRO';
  const gradientPreset = (settings.gradientPreset as string) || 'custom';
  const customStartColor = (settings.gradientStartColor as string) || '#667eea';
  const customEndColor = (settings.gradientEndColor as string) || '#764ba2';
  const gradientDirection = (settings.gradientDirection as string) || 'horizontal';

  const gradients: Record<string, { from: string; to: string }> = {
    custom: { from: customStartColor, to: customEndColor },
    purple: { from: '#667eea', to: '#764ba2' },
    blue: { from: '#00c6fb', to: '#005bea' },
    green: { from: '#11998e', to: '#38ef7d' },
    orange: { from: '#f12711', to: '#f5af19' },
    pink: { from: '#ec008c', to: '#fc6767' },
    sunset: { from: '#ff512f', to: '#f09819' },
    ocean: { from: '#2193b0', to: '#6dd5ed' },
    midnight: { from: '#232526', to: '#414345' },
    fire: { from: '#f5af19', to: '#f12711' },
    aurora: { from: '#00c9ff', to: '#92fe9d' },
  };

  const directionMap: Record<string, { x1: string; y1: string; x2: string; y2: string }> = {
    horizontal: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    vertical: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
    diagonal: { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
    'diagonal-reverse': { x1: '0%', y1: '100%', x2: '100%', y2: '0%' },
  };

  const grad = gradients[gradientPreset] || gradients.custom;
  const dir = directionMap[gradientDirection] || directionMap.horizontal;

  return `- conGradientBadge:
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
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 28'>
                <defs>
                  <linearGradient id='grad' x1='${dir.x1}' y1='${dir.y1}' x2='${dir.x2}' y2='${dir.y2}'>
                    <stop offset='0%' style='stop-color:${grad.from}'/>
                    <stop offset='100%' style='stop-color:${grad.to}'/>
                  </linearGradient>
                </defs>
                <rect width='80' height='28' rx='14' fill='url(#grad)'/>
                <text x='40' y='18' text-anchor='middle' fill='white' font-size='12' font-weight='600' font-family='Segoe UI'>${text}</text>
              </svg>
              ")
            X: =0
            Y: =0
            Width: =Parent.Width
            Height: =Parent.Height`;
}

// ============================================
// NAVIGATION GENERATORS
// ============================================

export function generateSidebarNavYAML(settings: SettingsValues): string {
  const items = (settings.navItems as string[]) || ['Home', 'Dashboard', 'Settings', 'Profile'];
  const logoText = (settings.logoText as string) || 'MyApp';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const textColor = hexToRGBA((settings.textColor as string) || '#a1a1a1');
  const activeColor = hexToRGBA((settings.activeColor as string) || '#ffffff');
  const activeBgColor = hexToRGBA((settings.activeBackgroundColor as string) || '#1a1a1a');
  const width = (settings.width as number) || 240;

  const navItems = items.map((item, index) => {
    const itemNum = index + 1;
    return `      - btnNav${itemNum}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${item}"
            Width: =Parent.Width - 24
            Height: =44
            X: =12
            Fill: =If(locActiveNav = ${itemNum}, ${activeBgColor}, RGBA(0, 0, 0, 0))
            Color: =If(locActiveNav = ${itemNum}, ${activeColor}, ${textColor})
            HoverFill: =If(locActiveNav = ${itemNum}, ${activeBgColor}, RGBA(255, 255, 255, 0.05))
            HoverColor: =${activeColor}
            BorderStyle: =BorderStyle.None
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            RadiusTopLeft: =8
            RadiusTopRight: =8
            Align: =Align.Left
            PaddingLeft: =16
            Font: =Font.'Segoe UI'
            FontWeight: =If(locActiveNav = ${itemNum}, FontWeight.Semibold, FontWeight.Normal)
            OnSelect: =Set(locActiveNav, ${itemNum})`;
  }).join('\n');

  return `- conSidebar:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =4
      Width: =${width}
      Height: =Parent.Height
      Fill: =${bgColor}
      PaddingTop: =16
    Children:
      - lblLogo:
          Control: Label@2.5.1
          Properties:
            Text: ="${logoText}"
            Width: =Parent.Width
            Height: =48
            Color: =${activeColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =18
            PaddingLeft: =20
${navItems}

# Add to Screen.OnVisible:
# Set(locActiveNav, 1)`;
}

export function generateBottomNavYAML(settings: SettingsValues): string {
  const items = (settings.items as string[]) || ['Home', 'Search', 'Notifications', 'Profile'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#0a0a0a');
  const activeColor = hexToRGBA((settings.activeColor as string) || '#ffffff');
  const inactiveColor = hexToRGBA((settings.inactiveColor as string) || '#6b6b6b');
  const height = (settings.height as number) || 64;
  const showLabels = (settings.showLabels as boolean) !== false;

  const icons: Record<string, string> = {
    'Home': '🏠',
    'Search': '🔍',
    'Notifications': '🔔',
    'Profile': '👤',
    'Settings': '⚙️',
    'Messages': '💬',
  };

  const navItems = items.map((item, index) => {
    const itemNum = index + 1;
    const icon = icons[item] || '●';
    return `      - conNavItem${itemNum}:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutJustifyContent: =LayoutJustifyContent.Center
            Width: =Parent.Width / ${items.length}
            Height: =Parent.Height
            Fill: =RGBA(0, 0, 0, 0)
          Children:
            - lblIcon${itemNum}:
                Control: Label@2.5.1
                Properties:
                  Text: ="${icon}"
                  Width: =24
                  Height: =24
                  Color: =If(locActiveBottomNav = ${itemNum}, ${activeColor}, ${inactiveColor})
                  Align: =Align.Center${showLabels ? `
            - lblLabel${itemNum}:
                Control: Label@2.5.1
                Properties:
                  Text: ="${item}"
                  Width: =80
                  Height: =16
                  Color: =If(locActiveBottomNav = ${itemNum}, ${activeColor}, ${inactiveColor})
                  Align: =Align.Center
                  Size: =10` : ''}
            - btnNavOverlay${itemNum}:
                Control: Classic/Button@2.2.0
                Properties:
                  Text: =""
                  Width: =Parent.Width
                  Height: =Parent.Height
                  X: =0
                  Y: =0
                  Fill: =RGBA(0, 0, 0, 0)
                  HoverFill: =RGBA(255, 255, 255, 0.05)
                  BorderStyle: =BorderStyle.None
                  OnSelect: =Set(locActiveBottomNav, ${itemNum})`;
  }).join('\n');

  return `- conBottomNav:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =${height}
      Y: =Parent.Height - Self.Height
      Fill: =${bgColor}
      DropShadow: =DropShadow.Bold
    Children:
${navItems}

# Add to Screen.OnVisible:
# Set(locActiveBottomNav, 1)`;
}

// ============================================
// FORMS GENERATORS
// ============================================

export function generateTextInputYAML(settings: SettingsValues): string {
  const placeholder = (settings.placeholder as string) || 'Enter text...';
  const label = (settings.label as string) || 'Label';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#1a1a1a');
  const textColor = hexToRGBA((settings.textColor as string) || '#ffffff');
  const borderColor = hexToRGBA((settings.borderColor as string) || '#333333');
  const radius = (settings.borderRadius as number) || 8;

  return `- conTextInput:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =8
      Width: =300
    Children:
      - lblLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="${label}"
            Width: =Parent.Width
            Height: =20
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =12
      - txtInput:
          Control: Classic/TextInput@2.3.2
          Properties:
            Default: =""
            HintText: ="${placeholder}"
            Width: =Parent.Width
            Height: =44
            Fill: =${bgColor}
            Color: =${textColor}
            BorderColor: =${borderColor}
            BorderThickness: =1
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            PaddingLeft: =16
            PaddingRight: =16
            Font: =Font.'Segoe UI'`;
}

export function generateSearchInputYAML(settings: SettingsValues): string {
  const placeholder = (settings.placeholder as string) || 'Search...';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#1a1a1a');
  const textColor = hexToRGBA((settings.textColor as string) || '#ffffff');
  const iconColor = hexToRGBA((settings.iconColor as string) || '#6b6b6b');
  const radius = (settings.borderRadius as number) || 24;

  return `- conSearchInput:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =300
      Height: =44
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:
      - lblSearchIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="🔍"
            Width: =24
            Height: =24
            X: =12
            Y: =(Parent.Height - Self.Height) / 2
            Color: =${iconColor}
      - txtSearch:
          Control: Classic/TextInput@2.3.2
          Properties:
            Default: =""
            HintText: ="${placeholder}"
            Width: =Parent.Width - 48
            Height: =Parent.Height - 8
            X: =40
            Y: =4
            Fill: =RGBA(0, 0, 0, 0)
            Color: =${textColor}
            BorderStyle: =BorderStyle.None
            Font: =Font.'Segoe UI'`;
}

export function generateDropdownYAML(settings: SettingsValues): string {
  const label = (settings.label as string) || 'Select option';
  const options = (settings.options as string[]) || ['Option 1', 'Option 2', 'Option 3'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#1a1a1a');
  const textColor = hexToRGBA((settings.textColor as string) || '#ffffff');
  const borderColor = hexToRGBA((settings.borderColor as string) || '#333333');
  const radius = (settings.borderRadius as number) || 8;

  const optionsTable = options.map(opt => `{ Value: "${opt}" }`).join(', ');

  return `- conDropdown:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =8
      Width: =300
    Children:
      - lblDropdownLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="${label}"
            Width: =Parent.Width
            Height: =20
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =12
      - drpOptions:
          Control: Classic/DropDown@2.3.1
          Properties:
            Items: =Table(${optionsTable})
            Width: =Parent.Width
            Height: =44
            Fill: =${bgColor}
            Color: =${textColor}
            BorderColor: =${borderColor}
            BorderThickness: =1
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            Font: =Font.'Segoe UI'`;
}

// ============================================
// MODAL GENERATORS
// ============================================

export function generateModalDialogYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Confirm Action';
  const message = (settings.message as string) || 'Are you sure you want to proceed?';
  const confirmText = (settings.confirmText as string) || 'Confirm';
  const cancelText = (settings.cancelText as string) || 'Cancel';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const overlayOpacity = (settings.overlayOpacity as number) || 50;
  const radius = (settings.borderRadius as number) || 16;

  return `- conModalOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =Parent.Height
      X: =0
      Y: =0
      Fill: =RGBA(0, 0, 0, ${overlayOpacity / 100})
      Visible: =locShowModal
    Children:
      - conModal:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =16
            Width: =340
            Height: =Auto
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            Fill: =${bgColor}
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            PaddingTop: =24
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            DropShadow: =DropShadow.Bold
          Children:
            - lblModalTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${title}"
                  Width: =Parent.Width - 48
                  Color: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - lblModalMessage:
                Control: Label@2.5.1
                Properties:
                  Text: ="${message}"
                  Width: =Parent.Width - 48
                  Color: =RGBA(160, 160, 160, 1)
                  Font: =Font.'Segoe UI'
            - conModalButtons:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =12
                  LayoutJustifyContent: =LayoutJustifyContent.End
                  Width: =Parent.Width - 48
                  Height: =44
                Children:
                  - btnModalCancel:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="${cancelText}"
                        Width: =100
                        Height: =40
                        Fill: =RGBA(0, 0, 0, 0)
                        Color: =RGBA(160, 160, 160, 1)
                        HoverFill: =RGBA(255, 255, 255, 0.05)
                        BorderStyle: =BorderStyle.Solid
                        BorderColor: =RGBA(64, 64, 64, 1)
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        OnSelect: =Set(locShowModal, false)
                  - btnModalConfirm:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="${confirmText}"
                        Width: =100
                        Height: =40
                        Fill: =RGBA(255, 255, 255, 1)
                        Color: =RGBA(0, 0, 0, 1)
                        HoverFill: =RGBA(230, 230, 230, 1)
                        BorderStyle: =BorderStyle.None
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        OnSelect: |-
                          =Set(locShowModal, false);
                          // Add your confirm action here

# Add to Screen.OnVisible:
# Set(locShowModal, false)
# To show modal: Set(locShowModal, true)`;
}

export function generateBottomSheetYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Options';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const handleColor = hexToRGBA((settings.handleColor as string) || '#404040');
  const radius = (settings.borderRadius as number) || 20;
  const height = (settings.height as number) || 300;

  return `- conBottomSheetOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =Parent.Height
      Fill: =RGBA(0, 0, 0, 0.5)
      Visible: =locShowBottomSheet
    Children:
      - conBottomSheet:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutGap: =16
            Width: =Parent.Width
            Height: =${height}
            Y: =Parent.Height - Self.Height
            Fill: =${bgColor}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            PaddingTop: =12
            PaddingBottom: =24
            PaddingLeft: =20
            PaddingRight: =20
          Children:
            - recHandle:
                Control: Rectangle@2.3.0
                Properties:
                  Width: =40
                  Height: =4
                  Fill: =${handleColor}
            - lblSheetTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${title}"
                  Width: =Parent.Width - 40
                  Color: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Bold
                  Size: =18
                  Align: =Align.Center
      - btnDismiss:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Width: =Parent.Width
            Height: =Parent.Height - ${height}
            X: =0
            Y: =0
            Fill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            OnSelect: =Set(locShowBottomSheet, false)

# Add to Screen.OnVisible:
# Set(locShowBottomSheet, false)
# To show: Set(locShowBottomSheet, true)`;
}

// ============================================
// CARD GENERATORS
// ============================================

export function generateContentCardYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Card Title';
  const description = (settings.description as string) || 'Card description goes here';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const titleColor = hexToRGBA((settings.titleColor as string) || '#ffffff');
  const textColor = hexToRGBA((settings.textColor as string) || '#a1a1a1');
  const radius = (settings.borderRadius as number) || 12;

  return `- conContentCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =12
      Width: =320
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      PaddingTop: =20
      PaddingBottom: =20
      PaddingLeft: =20
      PaddingRight: =20
      DropShadow: =DropShadow.Light
    Children:
      - lblCardTitle:
          Control: Label@2.5.1
          Properties:
            Text: ="${title}"
            Width: =Parent.Width - 40
            Color: =${titleColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =16
      - lblCardDesc:
          Control: Label@2.5.1
          Properties:
            Text: ="${description}"
            Width: =Parent.Width - 40
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            Size: =14`;
}

export function generateStatsCardYAML(settings: SettingsValues): string {
  const label = (settings.label as string) || 'Total Users';
  const value = (settings.value as string) || '1,234';
  const change = (settings.change as string) || '+12%';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const valueColor = hexToRGBA((settings.valueColor as string) || '#ffffff');
  const labelColor = hexToRGBA((settings.labelColor as string) || '#6b6b6b');
  const changeColor = hexToRGBA((settings.changeColor as string) || '#22c55e');
  const radius = (settings.borderRadius as number) || 12;

  return `- conStatsCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =8
      Width: =200
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      PaddingTop: =20
      PaddingBottom: =20
      PaddingLeft: =20
      PaddingRight: =20
      DropShadow: =DropShadow.Light
    Children:
      - lblStatsLabel:
          Control: Label@2.5.1
          Properties:
            Text: ="${label}"
            Width: =Parent.Width - 40
            Color: =${labelColor}
            Font: =Font.'Segoe UI'
            Size: =12
      - lblStatsValue:
          Control: Label@2.5.1
          Properties:
            Text: ="${value}"
            Width: =Parent.Width - 40
            Color: =${valueColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =28
      - lblStatsChange:
          Control: Label@2.5.1
          Properties:
            Text: ="${change}"
            Width: =Parent.Width - 40
            Color: =${changeColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            Size: =14`;
}

export function generateImageCardYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Image Title';
  const subtitle = (settings.subtitle as string) || 'Subtitle text';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const titleColor = hexToRGBA((settings.titleColor as string) || '#ffffff');
  const subtitleColor = hexToRGBA((settings.subtitleColor as string) || '#a1a1a1');
  const radius = (settings.borderRadius as number) || 12;
  const imageHeight = (settings.imageHeight as number) || 180;

  return `- conImageCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      Width: =320
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      DropShadow: =DropShadow.Light
    Children:
      - imgCardImage:
          Control: Image@2.2.3
          Properties:
            Width: =Parent.Width
            Height: =${imageHeight}
            // Add your image source here
      - conCardContent:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =4
            Width: =Parent.Width
            PaddingTop: =16
            PaddingBottom: =20
            PaddingLeft: =16
            PaddingRight: =16
          Children:
            - lblImgCardTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${title}"
                  Width: =Parent.Width - 32
                  Color: =${titleColor}
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Bold
                  Size: =16
            - lblImgCardSubtitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${subtitle}"
                  Width: =Parent.Width - 32
                  Color: =${subtitleColor}
                  Font: =Font.'Segoe UI'
                  Size: =14`;
}

export function generateProfileCardYAML(settings: SettingsValues): string {
  const name = (settings.name as string) || 'John Doe';
  const role = (settings.role as string) || 'Software Engineer';
  const bio = (settings.bio as string) || 'Building amazing products with passion.';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const accentColor = hexToRGBA((settings.accentColor as string) || '#6366f1');
  const radius = (settings.borderRadius as number) || 16;

  return `- conProfileCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutAlignItems: =LayoutAlignItems.Center
      Width: =280
      Fill: =${bgColor}
      PaddingTop: =24
      PaddingBottom: =24
      PaddingLeft: =20
      PaddingRight: =20
      LayoutGap: =12
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      DropShadow: =DropShadow.Light
    Children:
      - conAvatar:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            Width: =80
            Height: =80
            Fill: =${accentColor}
            RadiusBottomLeft: =40
            RadiusBottomRight: =40
            RadiusTopLeft: =40
            RadiusTopRight: =40
          Children:
            - lblInitial:
                Control: Label@2.5.1
                Properties:
                  Text: ="${name.charAt(0).toUpperCase()}"
                  X: =0
                  Y: =24
                  Width: =80
                  Align: =Align.Center
                  Color: =RGBA(255, 255, 255, 1)
                  Size: =28
                  FontWeight: =FontWeight.Bold
      - lblName:
          Control: Label@2.5.1
          Properties:
            Text: ="${name}"
            Color: =RGBA(255, 255, 255, 1)
            Size: =18
            FontWeight: =FontWeight.Bold
            Align: =Align.Center
      - lblRole:
          Control: Label@2.5.1
          Properties:
            Text: ="${role}"
            Color: =${accentColor}
            Size: =14
            Align: =Align.Center
      - lblBio:
          Control: Label@2.5.1
          Properties:
            Text: ="${bio}"
            Color: =RGBA(156, 163, 175, 1)
            Size: =13
            Align: =Align.Center`;
}

export function generateProductCardYAML(settings: SettingsValues): string {
  const productName = (settings.productName as string) || 'Premium Headphones';
  const price = (settings.price as string) || '$299.00';
  const originalPrice = (settings.originalPrice as string) || '$399.00';
  const rating = (settings.rating as number) || 4;
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const priceColor = hexToRGBA((settings.priceColor as string) || '#22c55e');
  const radius = (settings.borderRadius as number) || 12;

  return `- conProductCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      Width: =260
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      DropShadow: =DropShadow.Light
    Children:
      - imgProduct:
          Control: Image@2.2.3
          Properties:
            Width: =Parent.Width
            Height: =180
            // Add your product image source
      - conProductInfo:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =8
            Width: =Parent.Width
            PaddingTop: =16
            PaddingBottom: =20
            PaddingLeft: =16
            PaddingRight: =16
          Children:
            - lblProductName:
                Control: Label@2.5.1
                Properties:
                  Text: ="${productName}"
                  Color: =RGBA(255, 255, 255, 1)
                  Size: =16
                  FontWeight: =FontWeight.Semibold
            - lblRating:
                Control: Label@2.5.1
                Properties:
                  Text: ="${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}"
                  Color: =RGBA(251, 191, 36, 1)
                  Size: =14
            - conPrices:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =8
                  LayoutAlignItems: =LayoutAlignItems.Center
                Children:
                  - lblPrice:
                      Control: Label@2.5.1
                      Properties:
                        Text: ="${price}"
                        Color: =${priceColor}
                        Size: =18
                        FontWeight: =FontWeight.Bold
                  - lblOriginalPrice:
                      Control: Label@2.5.1
                      Properties:
                        Text: ="${originalPrice}"
                        Color: =RGBA(107, 114, 128, 1)
                        Size: =14
                        // Strikethrough effect via custom styling`;
}

export function generateInfoCardYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Information';
  const content = (settings.content as string) || 'This is some helpful information for the user.';
  const variant = (settings.variant as string) || 'info';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const radius = (settings.borderRadius as number) || 12;
  const showIcon = settings.showIcon !== false;

  const variantColors: Record<string, { border: string; accent: string; icon: string }> = {
    info: { border: 'RGBA(59, 130, 246, 0.5)', accent: 'RGBA(59, 130, 246, 1)', icon: 'ℹ️' },
    success: { border: 'RGBA(34, 197, 94, 0.5)', accent: 'RGBA(34, 197, 94, 1)', icon: '✓' },
    warning: { border: 'RGBA(245, 158, 11, 0.5)', accent: 'RGBA(245, 158, 11, 1)', icon: '⚠' },
    error: { border: 'RGBA(239, 68, 68, 0.5)', accent: 'RGBA(239, 68, 68, 1)', icon: '✕' },
  };

  const colors = variantColors[variant] || variantColors.info;

  const iconSection = showIcon ? `
      - lblIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="${colors.icon}"
            Size: =20` : '';

  return `- conInfoCard:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Start
      LayoutGap: =12
      Width: =320
      Fill: =${bgColor}
      PaddingTop: =16
      PaddingBottom: =16
      PaddingLeft: =16
      PaddingRight: =16
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      BorderColor: =${colors.border}
      BorderThickness: =1
    Children:${iconSection}
      - conInfoContent:
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
                  Text: ="${title}"
                  Color: =${colors.accent}
                  Size: =14
                  FontWeight: =FontWeight.Semibold
            - lblInfoContent:
                Control: Label@2.5.1
                Properties:
                  Text: ="${content}"
                  Color: =RGBA(156, 163, 175, 1)
                  Size: =13`;
}

// ============================================
// ANIMATED TABS GENERATORS
// ============================================

export function generateAnimatedUnderlineTabsYAML(settings: SettingsValues): string {
  const tabs = (settings.tabs as string[]) || ['Overview', 'Features', 'Pricing'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#0a0a0a');
  const activeColor = hexToRGBA((settings.activeColor as string) || '#ffffff');
  const inactiveColor = hexToRGBA((settings.inactiveColor as string) || '#6b6b6b');
  const underlineHeight = (settings.underlineHeight as number) || 2;

  const tabButtons = tabs.map((label, index) => {
    const tabNum = index + 1;
    return `      - btnTab${tabNum}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${label}"
            Width: =Parent.Width / ${tabs.length}
            Height: =Parent.Height - ${underlineHeight}
            X: =Parent.Width / ${tabs.length} * ${index}
            Y: =0
            Fill: =RGBA(0, 0, 0, 0)
            Color: =If(locSelectedTab = ${tabNum}, ${activeColor}, ${inactiveColor})
            HoverColor: =${activeColor}
            HoverFill: =RGBA(0, 0, 0, 0)
            BorderStyle: =BorderStyle.None
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            OnSelect: =Set(locSelectedTab, ${tabNum})`;
  }).join('\n');

  return `- conUnderlineTabs:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =48
      Fill: =${bgColor}
    Children:
${tabButtons}
      - recUnderline:
          Control: Rectangle@2.3.0
          Properties:
            Width: =Parent.Width / ${tabs.length}
            Height: =${underlineHeight}
            X: =(locSelectedTab - 1) * Parent.Width / ${tabs.length}
            Y: =Parent.Height - Self.Height
            Fill: =${activeColor}

# Add to Screen.OnVisible:
# Set(locSelectedTab, 1)`;
}

export function generateAnimatedPillTabsYAML(settings: SettingsValues): string {
  const tabs = (settings.tabs as string[]) || ['All', 'Active', 'Completed'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#1a1a1a');
  const pillColor = hexToRGBA((settings.pillColor as string) || '#ffffff');
  const activeTextColor = hexToRGBA((settings.activeTextColor as string) || '#000000');
  const inactiveTextColor = hexToRGBA((settings.inactiveTextColor as string) || '#6b6b6b');
  const radius = (settings.borderRadius as number) || 20;

  const tabButtons = tabs.map((label, index) => {
    const tabNum = index + 1;
    return `      - btnPill${tabNum}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${label}"
            Width: =Parent.Width / ${tabs.length} - 8
            Height: =32
            X: =4 + (Parent.Width / ${tabs.length}) * ${index}
            Y: =4
            Fill: =If(locSelectedPill = ${tabNum}, ${pillColor}, RGBA(0, 0, 0, 0))
            Color: =If(locSelectedPill = ${tabNum}, ${activeTextColor}, ${inactiveTextColor})
            HoverFill: =If(locSelectedPill = ${tabNum}, ${pillColor}, RGBA(255, 255, 255, 0.1))
            BorderStyle: =BorderStyle.None
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            OnSelect: =Set(locSelectedPill, ${tabNum})`;
  }).join('\n');

  return `- conPillTabs:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =300
      Height: =40
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:
${tabButtons}

# Add to Screen.OnVisible:
# Set(locSelectedPill, 1)`;
}

export function generateSegmentedTabsYAML(settings: SettingsValues): string {
  const tabs = (settings.tabs as string[]) || ['Day', 'Week', 'Month'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#1a1a1a');
  const activeColor = hexToRGBA((settings.activeColor as string) || '#333333');
  const activeTextColor = hexToRGBA((settings.activeTextColor as string) || '#ffffff');
  const inactiveTextColor = hexToRGBA((settings.inactiveTextColor as string) || '#6b6b6b');
  const radius = (settings.borderRadius as number) || 8;

  const tabButtons = tabs.map((label, index) => {
    const tabNum = index + 1;
    return `      - btnSeg${tabNum}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${label}"
            Width: =Parent.Width / ${tabs.length} - 4
            Height: =Parent.Height - 8
            X: =4 + (Parent.Width / ${tabs.length}) * ${index}
            Y: =4
            Fill: =If(locSelectedSeg = ${tabNum}, ${activeColor}, RGBA(0, 0, 0, 0))
            Color: =If(locSelectedSeg = ${tabNum}, ${activeTextColor}, ${inactiveTextColor})
            HoverFill: =If(locSelectedSeg = ${tabNum}, ${activeColor}, RGBA(255, 255, 255, 0.05))
            BorderStyle: =BorderStyle.None
            RadiusBottomLeft: =${radius - 2}
            RadiusBottomRight: =${radius - 2}
            RadiusTopLeft: =${radius - 2}
            RadiusTopRight: =${radius - 2}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            OnSelect: =Set(locSelectedSeg, ${tabNum})`;
  }).join('\n');

  return `- conSegmentedTabs:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =300
      Height: =44
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:
${tabButtons}

# Add to Screen.OnVisible:
# Set(locSelectedSeg, 1)`;
}

// ============================================
// ICON BUTTON GENERATOR
// ============================================

export function generateIconButtonYAML(settings: SettingsValues): string {
  const text = (settings.text as string) || 'Download';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#ffffff');
  const textColor = hexToRGBA((settings.textColor as string) || '#0a0a0a');
  const radius = (settings.borderRadius as number) || 8;
  const iconPosition = (settings.iconPosition as string) || 'left';
  const icon = (settings.icon as string) || 'download';

  const icons: Record<string, string> = {
    download: '⬇',
    upload: '⬆',
    send: '➤',
    edit: '✏',
    delete: '🗑',
    star: '⭐',
  };
  const iconChar = icons[icon] || '⬇';

  return `- conIconButton:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.Center
      LayoutGap: =8
      Width: =140
      Height: =44
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
    Children:${iconPosition === 'left' ? `
      - lblIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="${iconChar}"
            Width: =20
            Height: =20
            Color: =${textColor}` : ''}
      - lblText:
          Control: Label@2.5.1
          Properties:
            Text: ="${text}"
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold${iconPosition === 'right' ? `
      - lblIcon:
          Control: Label@2.5.1
          Properties:
            Text: ="${iconChar}"
            Width: =20
            Height: =20
            Color: =${textColor}` : ''}
      - btnOverlay:
          Control: Classic/Button@2.2.0
          Properties:
            Text: =""
            Width: =Parent.Width
            Height: =Parent.Height
            X: =0
            Y: =0
            Fill: =RGBA(0, 0, 0, 0)
            HoverFill: =RGBA(0, 0, 0, 0.1)
            BorderStyle: =BorderStyle.None
            OnSelect: =// Add your action here`;
}

// ============================================
// ADDITIONAL NAVIGATION GENERATORS
// ============================================

export function generateBreadcrumbYAML(settings: SettingsValues): string {
  const items = (settings.items as string[]) || ['Home', 'Products', 'Electronics'];
  const separator = (settings.separator as string) || '/';
  const textColor = hexToRGBA((settings.textColor as string) || '#6b6b6b');
  const activeColor = hexToRGBA((settings.activeColor as string) || '#ffffff');

  const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    return `      - lblBreadcrumb${index + 1}:
          Control: Label@2.5.1
          Properties:
            Text: ="${item}"
            Color: =${isLast ? activeColor : textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =${isLast ? 'FontWeight.Semibold' : 'FontWeight.Normal'}${index < items.length - 1 ? `
      - lblSep${index + 1}:
          Control: Label@2.5.1
          Properties:
            Text: =" ${separator} "
            Color: =${textColor}` : ''}`;
  }).join('\n');

  return `- conBreadcrumb:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      Width: =Parent.Width
      Height: =32
    Children:
${breadcrumbItems}`;
}

export function generateTopNavbarYAML(settings: SettingsValues): string {
  const logoText = (settings.logoText as string) || 'MyApp';
  const navItems = (settings.navItems as string[]) || ['Home', 'About', 'Contact'];
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#0a0a0a');
  const textColor = hexToRGBA((settings.textColor as string) || '#ffffff');
  const height = (settings.height as number) || 64;

  const navButtons = navItems.map((item, index) => {
    return `      - btnNav${index + 1}:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${item}"
            Height: =40
            Fill: =RGBA(0, 0, 0, 0)
            Color: =${textColor}
            HoverFill: =RGBA(255, 255, 255, 0.1)
            BorderStyle: =BorderStyle.None
            Font: =Font.'Segoe UI'
            OnSelect: =// Navigate to ${item}`;
  }).join('\n');

  return `- conTopNavbar:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutJustifyContent: =LayoutJustifyContent.SpaceBetween
      Width: =Parent.Width
      Height: =${height}
      Fill: =${bgColor}
      PaddingLeft: =24
      PaddingRight: =24
    Children:
      - lblLogo:
          Control: Label@2.5.1
          Properties:
            Text: ="${logoText}"
            Color: =${textColor}
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =20
      - conNavItems:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Horizontal
            LayoutGap: =8
            Height: =Parent.Height
          Children:
${navButtons}`;
}

// ============================================
// FORM GROUP AND TOGGLE GENERATORS
// ============================================

export function generateFormGroupYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Contact Us';
  const fields = (settings.fields as string[]) || ['Name', 'Email', 'Message'];
  const submitText = (settings.submitText as string) || 'Submit';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const radius = (settings.borderRadius as number) || 12;

  const formFields = fields.map((field, index) => {
    return `      - conField${index + 1}:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =4
            Width: =Parent.Width - 48
          Children:
            - lblField${index + 1}:
                Control: Label@2.5.1
                Properties:
                  Text: ="${field}"
                  Color: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Semibold
                  Size: =12
            - txtField${index + 1}:
                Control: Classic/TextInput@2.3.2
                Properties:
                  Default: =""
                  HintText: ="Enter ${field.toLowerCase()}..."
                  Width: =Parent.Width
                  Height: =44
                  Fill: =RGBA(26, 26, 26, 1)
                  Color: =RGBA(255, 255, 255, 1)
                  BorderColor: =RGBA(51, 51, 51, 1)
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8
                  RadiusTopLeft: =8
                  RadiusTopRight: =8`;
  }).join('\n');

  return `- conFormGroup:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      LayoutDirection: =LayoutDirection.Vertical
      LayoutGap: =16
      Width: =400
      Fill: =${bgColor}
      RadiusBottomLeft: =${radius}
      RadiusBottomRight: =${radius}
      RadiusTopLeft: =${radius}
      RadiusTopRight: =${radius}
      PaddingTop: =24
      PaddingBottom: =24
      PaddingLeft: =24
      PaddingRight: =24
    Children:
      - lblFormTitle:
          Control: Label@2.5.1
          Properties:
            Text: ="${title}"
            Color: =RGBA(255, 255, 255, 1)
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Bold
            Size: =20
${formFields}
      - btnSubmit:
          Control: Classic/Button@2.2.0
          Properties:
            Text: ="${submitText}"
            Width: =Parent.Width - 48
            Height: =44
            Fill: =RGBA(255, 255, 255, 1)
            Color: =RGBA(0, 0, 0, 1)
            HoverFill: =RGBA(230, 230, 230, 1)
            BorderStyle: =BorderStyle.None
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            RadiusTopLeft: =8
            RadiusTopRight: =8
            Font: =Font.'Segoe UI'
            FontWeight: =FontWeight.Semibold
            OnSelect: =// Submit form`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateToggleSwitchYAML(_settings: SettingsValues): string {
  return `- Toggle1:
    Control: Toggle@1.1.5
    Properties:
      X: =40
      Y: =40`;
}

export function generateSliderYAML(settings: SettingsValues): string {
  const value = (settings.value as number) || 50;
  const minValue = (settings.minValue as number) || 0;
  const maxValue = (settings.maxValue as number) || 100;
  const layout = (settings.layout as string) || 'horizontal';
  const layoutEnum = layout === 'vertical' ? 'SliderLayout.Vertical' : 'SliderLayout.Horizontal';

  return `- Slider1:
    Control: Slider@1.0.32
    Properties:
      X: =40
      Y: =40
      Value: =${value}
      Min: =${minValue}
      Max: =${maxValue}
      Layout: =${layoutEnum}`;
}

export function generateDatePickerYAML(settings: SettingsValues): string {
  const placeholder = (settings.placeholder as string) || 'Select a date';
  const format = (settings.format as string) || 'short';
  const appearance = (settings.appearance as string) || 'filledDarker';

  const formatEnum = format === 'long' ? 'DatePickerFormat.LongAbbreviated'
    : format === 'yearMonth' ? 'DatePickerFormat.YearMonth'
      : 'DatePickerFormat.Short';

  const appearanceEnum = appearance === 'filledLighter' ? 'DatePickerAppearance.FilledLighter'
    : appearance === 'outline' ? 'DatePickerAppearance.Outline'
      : 'DatePickerAppearance.FilledDarker';

  return `- DatePicker1:
    Control: DatePicker@0.0.46
    Properties:
      X: =40
      Y: =40
      Placeholder: ="${placeholder}"
      Format: =${formatEnum}
      Appearance: =${appearanceEnum}`;
}

export function generateProgressBarYAML(settings: SettingsValues): string {
  const value = (settings.value as number) || 75;
  const maxValue = (settings.maxValue as number) || 100;
  const progressColor = (settings.progressColor as string) || 'brand';
  const thickness = (settings.thickness as string) || 'medium';
  const shape = (settings.shape as string) || 'rounded';
  const indeterminate = (settings.indeterminate as boolean) || false;

  const colorEnum = progressColor === 'success' ? 'ProgressColor.Success'
    : progressColor === 'warning' ? 'ProgressColor.Warning'
      : progressColor === 'error' ? 'ProgressColor.Error'
        : 'ProgressColor.Brand';

  const thicknessEnum = thickness === 'large' ? 'ProgressThickness.Large' : 'ProgressThickness.Medium';
  const shapeEnum = shape === 'square' ? 'ProgressShape.Square' : 'ProgressShape.Rounded';

  return `- Progress1:
    Control: Progress@1.1.34
    Properties:
      X: =60
      Y: =60
      Value: =${value}
      Max: =${maxValue}
      ProgressColor: =${colorEnum}
      Thickness: =${thicknessEnum}
      Shape: =${shapeEnum}
      Indeterminate: =${indeterminate}`;
}

// ============================================
// CONFIRM AND ALERT DIALOG GENERATORS
// ============================================

export function generateConfirmDialogYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Delete Item?';
  const message = (settings.message as string) || 'This action cannot be undone.';
  const confirmText = (settings.confirmText as string) || 'Delete';
  const cancelText = (settings.cancelText as string) || 'Cancel';
  const variant = (settings.variant as string) || 'danger';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const radius = (settings.borderRadius as number) || 16;

  const variantColors: Record<string, string> = {
    danger: 'RGBA(239, 68, 68, 1)',
    warning: 'RGBA(234, 179, 8, 1)',
    info: 'RGBA(59, 130, 246, 1)',
  };
  const confirmColor = variantColors[variant] || variantColors.danger;

  return `- conConfirmOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =Parent.Height
      Fill: =RGBA(0, 0, 0, 0.5)
      Visible: =locShowConfirm
    Children:
      - conConfirmDialog:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutGap: =16
            Width: =360
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            Fill: =${bgColor}
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            PaddingTop: =24
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            DropShadow: =DropShadow.Bold
          Children:
            - lblConfirmTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${title}"
                  Color: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Bold
                  Size: =18
            - lblConfirmMessage:
                Control: Label@2.5.1
                Properties:
                  Text: ="${message}"
                  Color: =RGBA(160, 160, 160, 1)
                  Font: =Font.'Segoe UI'
            - conConfirmButtons:
                Control: GroupContainer@1.3.0
                Variant: AutoLayout
                Properties:
                  LayoutDirection: =LayoutDirection.Horizontal
                  LayoutGap: =12
                  LayoutJustifyContent: =LayoutJustifyContent.End
                  Width: =Parent.Width - 48
                Children:
                  - btnConfirmCancel:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="${cancelText}"
                        Width: =100
                        Height: =40
                        Fill: =RGBA(0, 0, 0, 0)
                        Color: =RGBA(160, 160, 160, 1)
                        HoverFill: =RGBA(255, 255, 255, 0.05)
                        BorderStyle: =BorderStyle.Solid
                        BorderColor: =RGBA(64, 64, 64, 1)
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        OnSelect: =Set(locShowConfirm, false)
                  - btnConfirmAction:
                      Control: Classic/Button@2.2.0
                      Properties:
                        Text: ="${confirmText}"
                        Width: =100
                        Height: =40
                        Fill: =${confirmColor}
                        Color: =RGBA(255, 255, 255, 1)
                        HoverFill: =ColorFade(${confirmColor}, -10%)
                        BorderStyle: =BorderStyle.None
                        RadiusBottomLeft: =8
                        RadiusBottomRight: =8
                        RadiusTopLeft: =8
                        RadiusTopRight: =8
                        OnSelect: |-
                          =Set(locShowConfirm, false);
                          // Add your action here

# Add to Screen.OnVisible:
# Set(locShowConfirm, false)`;
}

export function generateAlertDialogYAML(settings: SettingsValues): string {
  const title = (settings.title as string) || 'Success!';
  const message = (settings.message as string) || 'Your changes have been saved.';
  const buttonText = (settings.buttonText as string) || 'OK';
  const variant = (settings.variant as string) || 'success';
  const bgColor = hexToRGBA((settings.backgroundColor as string) || '#111111');
  const radius = (settings.borderRadius as number) || 16;

  const variantIcons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  const variantColors: Record<string, string> = {
    success: 'RGBA(34, 197, 94, 1)',
    error: 'RGBA(239, 68, 68, 1)',
    warning: 'RGBA(234, 179, 8, 1)',
    info: 'RGBA(59, 130, 246, 1)',
  };
  const icon = variantIcons[variant] || variantIcons.success;
  const iconColor = variantColors[variant] || variantColors.success;

  return `- conAlertOverlay:
    Control: GroupContainer@1.3.0
    Variant: ManualLayout
    Properties:
      Width: =Parent.Width
      Height: =Parent.Height
      Fill: =RGBA(0, 0, 0, 0.5)
      Visible: =locShowAlert
    Children:
      - conAlertDialog:
          Control: GroupContainer@1.3.0
          Variant: AutoLayout
          Properties:
            LayoutDirection: =LayoutDirection.Vertical
            LayoutAlignItems: =LayoutAlignItems.Center
            LayoutGap: =16
            Width: =320
            X: =(Parent.Width - Self.Width) / 2
            Y: =(Parent.Height - Self.Height) / 2
            Fill: =${bgColor}
            RadiusBottomLeft: =${radius}
            RadiusBottomRight: =${radius}
            RadiusTopLeft: =${radius}
            RadiusTopRight: =${radius}
            PaddingTop: =32
            PaddingBottom: =24
            PaddingLeft: =24
            PaddingRight: =24
            DropShadow: =DropShadow.Bold
          Children:
            - lblAlertIcon:
                Control: Label@2.5.1
                Properties:
                  Text: ="${icon}"
                  Width: =48
                  Height: =48
                  Color: =${iconColor}
                  Size: =32
                  Align: =Align.Center
            - lblAlertTitle:
                Control: Label@2.5.1
                Properties:
                  Text: ="${title}"
                  Color: =RGBA(255, 255, 255, 1)
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Bold
                  Size: =18
                  Align: =Align.Center
            - lblAlertMessage:
                Control: Label@2.5.1
                Properties:
                  Text: ="${message}"
                  Width: =Parent.Width - 48
                  Color: =RGBA(160, 160, 160, 1)
                  Font: =Font.'Segoe UI'
                  Align: =Align.Center
            - btnAlertOk:
                Control: Classic/Button@2.2.0
                Properties:
                  Text: ="${buttonText}"
                  Width: =Parent.Width - 48
                  Height: =44
                  Fill: =RGBA(255, 255, 255, 1)
                  Color: =RGBA(0, 0, 0, 1)
                  HoverFill: =RGBA(230, 230, 230, 1)
                  BorderStyle: =BorderStyle.None
                  RadiusBottomLeft: =8
                  RadiusBottomRight: =8
                  RadiusTopLeft: =8
                  RadiusTopRight: =8
                  Font: =Font.'Segoe UI'
                  FontWeight: =FontWeight.Semibold
                  OnSelect: =Set(locShowAlert, false)

# Add to Screen.OnVisible:
# Set(locShowAlert, false)`;
}

// ============================================
// MAIN GENERATOR FUNCTION
// ============================================

export function generateComponentYAML(
  componentSlug: string,
  baseYAML: string,
  settings: SettingsValues
): string {
  // Use custom generators for supported components
  switch (componentSlug) {
    // Tabs
    case 'tab-bar':
      return generateTabBarYAML(settings);
    case 'animated-underline-tabs':
      return generateAnimatedUnderlineTabsYAML(settings);
    case 'animated-pill-tabs':
      return generateAnimatedPillTabsYAML(settings);
    case 'segmented-tabs':
      return generateSegmentedTabsYAML(settings);

    // Buttons
    case 'classic-button':
      return generateClassicButtonYAML(settings);
    case 'outline-button':
      return generateOutlineButtonYAML(settings);
    case 'loading-button':
      return generateLoadingButtonYAML(settings);
    case 'icon-button':
      return generateIconButtonYAML(settings);

    // Feedback
    case 'toast-notification':
      return generateToastNotificationYAML(settings);
    case 'loading-spinner':
      return generateLoadingSpinnerYAML(settings);
    case 'simple-badge':
      return generateSimpleBadgeYAML(settings);
    case 'outline-badge':
      return generateOutlineBadgeYAML(settings);
    case 'icon-badge':
      return generateIconBadgeYAML(settings);
    case 'counter-badge':
      return generateCounterBadgeYAML(settings);
    case 'status-dot':
      return generateStatusDotYAML(settings);
    case 'pulsing-badge':
      return generatePulsingBadgeYAML(settings);
    case 'dismissible-chip':
      return generateDismissibleChipYAML(settings);
    case 'avatar-status':
      return generateAvatarStatusYAML(settings);
    case 'gradient-badge':
      return generateGradientBadgeYAML(settings);

    // Navigation
    case 'sidebar-nav':
      return generateSidebarNavYAML(settings);
    case 'bottom-nav':
      return generateBottomNavYAML(settings);
    case 'breadcrumb':
      return generateBreadcrumbYAML(settings);
    case 'top-navbar':
      return generateTopNavbarYAML(settings);

    // Forms
    case 'text-input':
      return generateTextInputYAML(settings);
    case 'search-input':
      return generateSearchInputYAML(settings);
    case 'dropdown':
      return generateDropdownYAML(settings);
    case 'form-group':
      return generateFormGroupYAML(settings);
    case 'toggle-switch':
      return generateToggleSwitchYAML(settings);
    case 'slider':
      return generateSliderYAML(settings);
    case 'date-picker':
      return generateDatePickerYAML(settings);
    case 'progress-bar':
      return generateProgressBarYAML(settings);

    // Modals
    case 'modal-dialog':
    case 'simple-modal':
      return generateModalDialogYAML(settings);
    case 'bottom-sheet':
      return generateBottomSheetYAML(settings);
    case 'confirm-dialog':
      return generateConfirmDialogYAML(settings);
    case 'alert-dialog':
      return generateAlertDialogYAML(settings);

    // Cards
    case 'content-card':
      return generateContentCardYAML(settings);
    case 'stats-card':
      return generateStatsCardYAML(settings);
    case 'image-card':
      return generateImageCardYAML(settings);
    case 'profile-card':
      return generateProfileCardYAML(settings);
    case 'product-card':
      return generateProductCardYAML(settings);
    case 'info-card':
      return generateInfoCardYAML(settings);

    // App Shells (complex layouts - return base YAML as they're comprehensive)
    case 'app-shell':
    case 'dashboard-layout':
      // App shells are complex - settings modify specific sections
      return baseYAML;

    default:
      // For components without custom generators, return base YAML
      return baseYAML;
  }
}
