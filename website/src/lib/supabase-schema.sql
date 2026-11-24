-- Supabase / PostgreSQL Schema for National Symposium on Quantum Computing 2026
-- Execute this script in your Supabase SQL Editor if using Supabase backend

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(50) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN (
        'Students',
        'Research Scholars',
        'Faculty Members',
        'Industry Professionals',
        'Other Participants'
    )),
    city_state VARCHAR(255) NOT NULL,
    areas_of_interest TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Pending', 'Waitlisted', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for speedy lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_category ON registrations(category);
CREATE INDEX IF NOT EXISTS idx_registrations_reg_id ON registrations(registration_id);

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous insert for registration
CREATE POLICY "Public can register" ON registrations
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view/modify
CREATE POLICY "Admins full access registrations" ON registrations
    FOR ALL USING (auth.role() = 'authenticated');

-- Public can view active announcements
CREATE POLICY "Public view active announcements" ON announcements
    FOR SELECT USING (is_active = true);

-- Admins manage announcements
CREATE POLICY "Admins full access announcements" ON announcements
    FOR ALL USING (auth.role() = 'authenticated');
