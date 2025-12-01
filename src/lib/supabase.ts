import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  order_index: number;
  created_at: string;
}

export interface MapLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  category: string;
  created_at: string;
}

export interface CooperationField {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  order_index: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  order_index: number;
  created_at: string;
}
