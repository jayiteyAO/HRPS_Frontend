#!/bin/bash

# Check missing imports
echo "Checking for missing employee subdirectory pages..."
for page in AddEmployee Departments Positions OrgChart ExitManagement; do
  [ ! -f "src/pages/employees/${page}.tsx" ] && echo "Missing: src/pages/employees/${page}.tsx"
done

echo "Checking for missing leave subdirectory pages..."
for page in ApplyLeave LeaveCalendar LeavePolicies LeaveBalance Holidays; do
  [ ! -f "src/pages/leave/${page}.tsx" ] && echo "Missing: src/pages/leave/${page}.tsx"
done

echo "Checking for missing payroll subdirectory pages..."
for page in RunPayroll SalaryStructure TaxManagement Payslips Bonuses; do
  [ ! -f "src/pages/payroll/${page}.tsx" ] && echo "Missing: src/pages/payroll/${page}.tsx"
done

echo "Checking for missing attendance subdirectory pages..."
for page in CheckIn Timesheet Shifts Overtime AttendanceReports; do
  [ ! -f "src/pages/attendance/${page}.tsx" ] && echo "Missing: src/pages/attendance/${page}.tsx"
done

echo "Checking for missing performance subdirectory pages..."
for page in Goals Feedback KPIDashboard Development Ratings; do
  [ ! -f "src/pages/performance/${page}.tsx" ] && echo "Missing: src/pages/performance/${page}.tsx"
done

echo "Checking for missing grievances subdirectory pages..."
for page in SubmitGrievance TrackGrievance GrievanceAnalytics ResolutionCenter; do
  [ ! -f "src/pages/grievances/${page}.tsx" ] && echo "Missing: src/pages/grievances/${page}.tsx"
done

echo "Checking for missing learning subdirectory pages..."
for page in CourseCatalog TrainingCalendar Certifications LearningPaths SkillsMatrix; do
  [ ! -f "src/pages/learning/${page}.tsx" ] && echo "Missing: src/pages/learning/${page}.tsx"
done

echo "Checking for missing reports subdirectory pages..."
for page in HeadcountReports PayrollReports AttendanceReports PerformanceReports CustomReports; do
  [ ! -f "src/pages/reports/${page}.tsx" ] && echo "Missing: src/pages/reports/${page}.tsx"
done

echo "Done!"
