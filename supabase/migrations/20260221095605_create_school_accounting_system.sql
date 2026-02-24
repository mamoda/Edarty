/*
  # School Accounting System Database Schema

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `full_name` (text) - اسم الطالب الكامل
      - `grade` (text) - الصف الدراسي
      - `parent_name` (text) - اسم ولي الأمر
      - `parent_phone` (text) - رقم هاتف ولي الأمر
      - `enrollment_date` (date) - تاريخ التسجيل
      - `status` (text) - active/inactive
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `fees`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `student_id` (uuid, foreign key to students)
      - `amount` (numeric) - المبلغ
      - `payment_type` (text) - نوع الدفعة (رسوم دراسية، كتب، أنشطة، إلخ)
      - `payment_date` (date) - تاريخ الدفع
      - `academic_year` (text) - السنة الدراسية
      - `notes` (text) - ملاحظات
      - `created_at` (timestamptz)
    
    - `expenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `category` (text) - فئة المصروف (رواتب، صيانة، إيجار، إلخ)
      - `amount` (numeric) - المبلغ
      - `description` (text) - الوصف
      - `expense_date` (date) - تاريخ المصروف
      - `notes` (text) - ملاحظات
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own school data
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text NOT NULL,
  grade text NOT NULL,
  parent_name text NOT NULL,
  parent_phone text NOT NULL,
  enrollment_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fees table
CREATE TABLE IF NOT EXISTS fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  student_id uuid REFERENCES students ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL CHECK (amount >= 0),
  payment_type text NOT NULL,
  payment_date date DEFAULT CURRENT_DATE,
  academic_year text NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL,
  amount numeric(10,2) NOT NULL CHECK (amount >= 0),
  description text NOT NULL,
  expense_date date DEFAULT CURRENT_DATE,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  specialization text,
  salary numeric(10,2) DEFAULT 0 CHECK (salary >= 0),
  hire_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  address text,
  qualifications text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Students policies
CREATE POLICY "Users can view own students"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own students"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own students"
  ON students FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fees policies
CREATE POLICY "Users can view own fees"
  ON fees FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fees"
  ON fees FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fees"
  ON fees FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own fees"
  ON fees FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Expenses policies
CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Teachers policies
CREATE POLICY "Users can view own teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own teachers"
  ON teachers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own teachers"
  ON teachers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own teachers"
  ON teachers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
-- Students indexes
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);

-- Fees indexes
CREATE INDEX IF NOT EXISTS idx_fees_user_id ON fees(user_id);
CREATE INDEX IF NOT EXISTS idx_fees_student_id ON fees(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_payment_date ON fees(payment_date);
CREATE INDEX IF NOT EXISTS idx_fees_payment_type ON fees(payment_type);

-- Expenses indexes
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date);

-- Teachers indexes
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);
CREATE INDEX IF NOT EXISTS idx_teachers_specialization ON teachers(specialization);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
    BEFORE UPDATE ON teachers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create views for common queries
-- View for student payment summary
CREATE OR REPLACE VIEW student_payment_summary AS
SELECT 
    s.id,
    s.full_name,
    s.grade,
    COUNT(DISTINCT f.id) as payment_count,
    COALESCE(SUM(f.amount), 0) as total_paid,
    COALESCE(AVG(f.amount), 0) as average_payment
FROM students s
LEFT JOIN fees f ON s.id = f.student_id
GROUP BY s.id, s.full_name, s.grade;

-- View for monthly financial summary
CREATE OR REPLACE VIEW monthly_financial_summary AS
SELECT 
    DATE_TRUNC('month', COALESCE(f.payment_date, e.expense_date)) as month,
    COALESCE(SUM(DISTINCT f.amount), 0) as total_revenue,
    COALESCE(SUM(DISTINCT e.amount), 0) as total_expenses,
    COALESCE(SUM(DISTINCT f.amount), 0) - COALESCE(SUM(DISTINCT e.amount), 0) as net_profit
FROM fees f
FULL OUTER JOIN expenses e ON DATE_TRUNC('month', f.payment_date) = DATE_TRUNC('month', e.expense_date)
GROUP BY DATE_TRUNC('month', COALESCE(f.payment_date, e.expense_date))
ORDER BY month DESC;

-- Insert sample data (optional - for testing)
/*
-- Sample students
INSERT INTO students (user_id, full_name, grade, parent_name, parent_phone, status)
VALUES 
  ('YOUR_USER_ID', 'أحمد محمد', 'الصف الأول', 'محمد أحمد', '01234567890', 'active'),
  ('YOUR_USER_ID', 'سارة خالد', 'الصف الثاني', 'خالد علي', '01234567891', 'active');

-- Sample teachers
INSERT INTO teachers (user_id, name, phone, email, specialization, salary, status)
VALUES 
  ('YOUR_USER_ID', 'د. محمد عبدالله', '01234567892', 'mohamed@example.com', 'الرياضيات', 5000, 'active'),
  ('YOUR_USER_ID', 'أ. فاطمة أحمد', '01234567893', 'fatma@example.com', 'اللغة العربية', 4500, 'active');

-- Sample fees
INSERT INTO fees (user_id, student_id, amount, payment_type, academic_year)
VALUES 
  ('YOUR_USER_ID', (SELECT id FROM students WHERE full_name = 'أحمد محمد'), 2000, 'رسوم دراسية', '2024-2025'),
  ('YOUR_USER_ID', (SELECT id FROM students WHERE full_name = 'سارة خالد'), 2000, 'رسوم دراسية', '2024-2025');

-- Sample expenses
INSERT INTO expenses (user_id, category, amount, description)
VALUES 
  ('YOUR_USER_ID', 'رواتب', 5000, 'رواتب الأساتذة لشهر يناير'),
  ('YOUR_USER_ID', 'صيانة', 1000, 'صيانة المبنى المدرسي');
*/