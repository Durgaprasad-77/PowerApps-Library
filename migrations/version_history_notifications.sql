-- Migration: Create component_versions table for version history
-- Run this in your Supabase SQL editor

-- Create the component_versions table
CREATE TABLE IF NOT EXISTS component_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_id UUID NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    yaml_code TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_pro BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    settings_schema JSONB,
    default_settings JSONB,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    change_summary TEXT,
    UNIQUE(component_id, version_number)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_component_versions_component_id ON component_versions(component_id);
CREATE INDEX IF NOT EXISTS idx_component_versions_created_at ON component_versions(created_at DESC);

-- Enable RLS
ALTER TABLE component_versions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read versions
CREATE POLICY "Anyone can view component versions"
    ON component_versions FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can insert versions (handled via service role)
CREATE POLICY "Service role can insert versions"
    ON component_versions FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Create notifications table
CREATE TABLE IF NOT EXISTS admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'component_created', 'user_registered', 'component_updated', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT,
    href TEXT, -- Link to navigate to
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_notifications_user_id ON admin_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON admin_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_is_read ON admin_notifications(is_read);

-- Enable RLS
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications"
    ON admin_notifications FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can update own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
    ON admin_notifications FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

-- Service role can insert notifications
CREATE POLICY "Service role can insert notifications"
    ON admin_notifications FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Grant permissions
GRANT ALL ON component_versions TO authenticated;
GRANT ALL ON component_versions TO service_role;
GRANT ALL ON admin_notifications TO authenticated;
GRANT ALL ON admin_notifications TO service_role;

COMMENT ON TABLE component_versions IS 'Stores version history for components';
COMMENT ON TABLE admin_notifications IS 'Stores admin notifications';
