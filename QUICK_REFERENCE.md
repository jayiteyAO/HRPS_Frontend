# Quick Reference Guide - HRPMS Application

## 🎯 What Was Fixed

### UI Consistency Issues ✅
1. **Removed excessive animations** - No more fade-in, slide-up, or scale effects
2. **Minimized rounded corners** - Sharp, professional edges like Microsoft Dynamics
3. **Reduced shadows** - Clean borders instead of heavy drop shadows
4. **Fixed glassmorphism** - Removed backdrop-blur effects
5. **Role switcher visibility** - Now clearly visible in top bar for HR Admin
6. **Navigation cleanup** - Removed CRUD actions from nav menus
7. **Chart components** - Added visualizations to reports
8. **Theme consistency** - Fixed light/dark mode across all pages

### Microsoft Dynamics Style ✅
- ✅ Minimal rounded corners
- ✅ Clean borders
- ✅ Subtle hover effects
- ✅ Professional spacing
- ✅ Microsoft brand colors
- ✅ Flat design approach

## 🎨 Design System

### Colors
```css
Primary Blue:   #00A4EF
Hover Blue:     #0078D4
Success Green:  #7FBA00
Warning Yellow: #FFB900
Danger Red:     #F25022
Neutral Gray:   #737373
```

### Borders
- Use `border border-gray-200 dark:border-gray-700`
- No rounded corners or minimal `rounded-sm`
- Avoid `rounded-lg`, `rounded-xl`, etc.

### Shadows
- Minimal: `shadow-sm` only
- Avoid `shadow-lg`, `shadow-xl`, `shadow-2xl`

### Hover States
- Use `hover:border-gray-300` or `hover:bg-gray-100`
- Avoid `hover:shadow-*` or `hover:scale-*`
- Keep transitions subtle: `transition-colors duration-150`

### Animations
- Avoid: `animate-*` classes
- Avoid: `transform hover:scale-*`
- Use only: minimal color transitions

## 🔐 Login Info

```
Email:    hradmin@example.com
Password: password
Role:     HR Admin (only option available)
```

## 🗂️ Navigation Structure

```
Dashboard
├── Employees
│   ├── All Employees
│   ├── Departments
│   ├── Positions
│   ├── Org Chart
│   └── Exit Management
├── Leave
│   ├── Leave Requests
│   ├── Leave Calendar
│   ├── Leave Policies
│   ├── Leave Balance
│   └── Holidays
├── Payroll
│   ├── Payroll Overview
│   ├── Run Payroll
│   ├── Salary Structure
│   ├── Tax Management
│   ├── Payslips
│   └── Bonuses
├── Attendance
│   ├── Attendance Log
│   ├── Check In/Out
│   ├── Timesheet
│   ├── Shifts
│   ├── Overtime
│   └── Attendance Reports
├── Performance
│   ├── Performance Reviews
│   ├── Goal Setting
│   ├── 360° Feedback
│   ├── KPI Dashboard
│   ├── Development Plans
│   └── Ratings
├── Grievances
│   ├── All Grievances
│   ├── Track Status
│   ├── Grievance Analytics
│   └── Resolution Center
├── Learning
│   ├── My Courses
│   ├── Course Catalog
│   ├── Training Calendar
│   ├── Certifications
│   ├── Learning Paths
│   └── Skills Matrix
├── Reports
│   ├── HR Dashboard
│   ├── Analytics
│   ├── Headcount Reports (with charts!)
│   ├── Payroll Reports
│   ├── Attendance Reports
│   ├── Performance Reports
│   └── Custom Reports
└── Recruitment
    ├── Job Postings
    ├── Applicants
    ├── Interviews
    ├── Offers
    ├── Onboarding
    └── Talent Pool
```

## 🛠️ Key Components

### Charts (`src/components/Charts.tsx`)
```tsx
<BarChart data={[...]} height={250} />
<LineChart data={[...]} color="#00A4EF" />
<ProgressBar value={75} max={100} color="bg-[#00A4EF]" />
<PieChart data={[...]} size={220} />
```

### Card (`src/components/Card.tsx`)
```tsx
<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  {/* content */}
</Card>
```

### Button (`src/components/Button.tsx`)
```tsx
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

## 🔄 Role Switcher

Located in top bar (top-right area), visible only to HR Admin:
- Click to see dropdown with all available roles
- Select a role to switch view
- Current role is highlighted
- Persists on page navigation

## 🎨 Theme Toggle

Light/Dark theme toggle in top bar:
- Click moon icon for dark mode
- Click sun icon for light mode
- Preference saved in localStorage
- Works across all pages

## 📊 Reports with Charts

**Headcount Reports** now includes:
- Bar chart: Employees by Department
- Pie chart: Gender Distribution
- Progress bars: Age Group Distribution
- Trend tracking: Monthly Headcount Growth

Other report pages ready for similar enhancements.

## ✨ Best Practices

### When adding new pages:
1. Use Card component for containers
2. Use minimal `rounded-sm` or no rounding
3. Use `shadow-sm` only when necessary
4. Use Microsoft brand colors
5. Keep animations subtle (150ms-200ms)
6. Support both light and dark themes
7. Use `theme === 'dark'` for conditional styling

### Example Page Structure:
```tsx
import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { useTheme } from '@/contexts/ThemeContext';

const MyPage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Page Title
        </h1>
        <Button variant="primary">Action</Button>
      </div>
      
      <Card>
        <CardHeader title="Section Title" />
        {/* content */}
      </Card>
    </div>
  );
};
```

## 📁 Key Files

```
src/
├── components/
│   ├── Card.tsx          - Container component
│   ├── Button.tsx        - Button component
│   ├── Charts.tsx        - Chart components (NEW!)
│   ├── HorizontalNav.tsx - Top navigation bar
│   ├── TopBar.tsx        - App header
│   └── RoleSwitcher.tsx  - Role switcher (enhanced)
├── contexts/
│   ├── AuthContext.tsx   - Authentication
│   └── ThemeContext.tsx  - Theme management
├── config/
│   └── navigationConfig.tsx - Nav structure
└── pages/
    └── [all page components]
```

## 🚀 Running the App

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Notes

- Application runs on port 5173 by default
- All CRUD actions now via modals (not nav items)
- HR Admin can switch to any role view
- Charts ready to be added to more pages
- TypeScript warnings (unused vars) don't affect functionality

---

**Status**: ✅ All UI fixes complete  
**Server**: Running at http://localhost:5173  
**Design**: Microsoft Dynamics style  
**Theme**: Light & Dark mode supported
