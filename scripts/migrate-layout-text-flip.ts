
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('Starting migration for Layout Text Flip...');

    // 1. Check/Upsert Category
    const categorySlug = 'display';
    const { data: existingCat, error: fetchCatError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (fetchCatError && fetchCatError.code !== 'PGRST116') { // PGRST116 is code for no rows found
        console.error('Error fetching category:', fetchCatError);
    }

    if (!existingCat) {
        console.log('Category "Display" not found, inserting...');
        const { error: insertCatError } = await supabase
            .from('categories')
            .insert({
                name: 'Display',
                slug: categorySlug,
                description: 'Display and visual components',
                icon: '✨',
                order_index: 9
            });

        if (insertCatError) {
            console.error('Error inserting category:', insertCatError);
        } else {
            console.log('Category "Display" inserted successfully.');
        }
    } else {
        console.log('Category "Display" already exists.');
    }

    // 2. Check/Upsert Component
    const componentSlug = 'layout-text-flip';
    const { data: existingComp, error: fetchCompError } = await supabase
        .from('components')
        .select('id')
        .eq('slug', componentSlug)
        .single();

    if (fetchCompError && fetchCompError.code !== 'PGRST116') {
        console.error('Error fetching component:', fetchCompError);
    }

    const componentData = {
        name: 'Layout Text Flip',
        slug: componentSlug,
        category_slug: categorySlug,
        description: 'A text flip effect that changes the layout of surrounding text',
        is_pro: true,
        is_new: true,
        updated_at: new Date().toISOString(),
        yaml_code: `- conLayoutTextFlip_1:
    Control: GroupContainer@1.3.0
    Variant: AutoLayout
    Properties:
      DropShadow: =DropShadow.None
      Fill: =RGBA(0, 0, 0, 1)
      Height: =97
      LayoutAlignItems: =LayoutAlignItems.Center
      LayoutDirection: =LayoutDirection.Horizontal
      LayoutGap: =8
      RadiusBottomLeft: =8
      RadiusBottomRight: =8
      RadiusTopLeft: =8
      RadiusTopRight: =8
      Width: =513
      X: =(Parent.Width - Self.Width) / 2
      Y: =(Parent.Height - Self.Height) / 2
    Children:
      - lblStaticText_1:
          Control: Label@2.5.1
          Properties:
            Align: =Align.Center
            Color: =RGBA(255, 255, 255, 1)
            FillPortions: =1
            Font: =Font.'Open Sans'
            FontWeight: =FontWeight.Bold
            Height: =Parent.Height
            Size: =28
            Text: ="Welcome to"
            Width: =170
      - conFlipPill_1:
          Control: GroupContainer@1.3.0
          Variant: ManualLayout
          Properties:
            AlignInContainer: =AlignInContainer.SetByContainer
            BorderColor: =RGBA(161, 159, 157, 1)
            BorderThickness: =0.5
            DropShadow: =DropShadow.None
            Fill: =RGBA(41, 40, 40, 1)
            Height: =48
            PaddingRight: =5
            RadiusBottomLeft: =8
            RadiusBottomRight: =8
            RadiusTopLeft: =8
            RadiusTopRight: =8
            Width: =180
          Children:
            - imgFlipText:
                Control: Image@2.2.3
                Properties:
                  Height: =Parent.Height
                  Image: |-
                    ="data:image/svg+xml;utf8," & EncodeUrl("
                    <svg xmlns='http://www.w3.org/2000/svg' width='180' height='48' viewBox='0 0 180 48'>
                      <defs>
                        <style>
                          @keyframes flipIn {
                            0% { transform: translateY(100%) rotateX(-90deg); opacity: 0; }
                            100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
                          }
                          .flip-text {
                            animation: flipIn 0.5s ease-out forwards;
                          }
                        </style>
                      </defs>
                      <text x='90' y='30' 
                        text-anchor='middle' 
                        font-family='Open Sans, sans-serif' 
                        font-size='23' 
                        font-weight='700' 
                        fill='white'
                        class='flip-text'>" & 
                        Switch(Mod(locWordIndex, 4) + 1,
                          1, "PowerUI Pro",
                          2, "Power Apps",
                          3, "The Future",
                          4, "Innovation"
                        ) & "</text>
                    </svg>
                    ")
                  ImagePosition: =ImagePosition.Center
                  Width: =Parent.Width
      - timerWordFlip_1:
          Control: Timer@2.1.0
          Properties:
            AutoStart: =true
            Duration: =3000
            OnTimerEnd: =Set(locWordIndex, locWordIndex + 1)
            Repeat: =true
            Visible: =false
# Screen.OnVisible: Set(locWordIndex, 0)`
    };

    if (!existingComp) {
        console.log('Component "Layout Text Flip" not found, inserting...');
        const { error: insertCompError } = await supabase
            .from('components')
            .insert({
                ...componentData,
                created_at: new Date().toISOString()
            });

        if (insertCompError) {
            console.error('Error inserting component:', insertCompError);
        } else {
            console.log('Component "Layout Text Flip" inserted successfully.');
        }
    } else {
        console.log('Component "Layout Text Flip" already exists, updating...');
        const { error: updateCompError } = await supabase
            .from('components')
            .update(componentData)
            .eq('id', existingComp.id);

        if (updateCompError) {
            console.error('Error updating component:', updateCompError);
        } else {
            console.log('Component "Layout Text Flip" updated successfully.');
        }
    }
}


migrate();
