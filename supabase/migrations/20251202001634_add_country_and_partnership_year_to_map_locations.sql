/*
  # Add country and partnership year fields to map locations

  1. Changes
    - Add `country` column to store the country name
    - Add `partnership_year` column to store when the partnership started
    - Update existing RLS policies (already in place)

  2. Notes
    - These fields will help display more detailed information about each location
    - `partnership_year` can be null for locations that aren't partnerships
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'map_locations' AND column_name = 'country'
  ) THEN
    ALTER TABLE map_locations ADD COLUMN country text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'map_locations' AND column_name = 'partnership_year'
  ) THEN
    ALTER TABLE map_locations ADD COLUMN partnership_year int;
  END IF;
END $$;
