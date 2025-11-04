#!/bin/bash

# Script to fix UI inconsistencies - remove excessive animations and rounded borders

cd "$(dirname "$0")"

echo "Fixing UI consistency issues..."

# Remove animate-fade-in, animate-slide-up, animate-pulse, etc.
find src/pages -name "*.tsx" -type f -exec sed -i 's/animate-fade-in//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/animate-slide-up//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/animate-pulse//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/animate-bounce//g' {} +

# Replace rounded corners with minimal/no rounding
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-3xl//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-2xl//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-xl//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-lg//g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-md/rounded-sm/g' {} +

# Replace shadow effects with minimal versions
find src/pages -name "*.tsx" -type f -exec sed -i 's/shadow-2xl/shadow-sm/g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/shadow-xl/shadow-sm/g' {} +
find src/pages -name "*.tsx" -type f -exec sed -i 's/shadow-lg/shadow-sm/g' {} +

# Fix specific patterns
find src/pages -name "*.tsx" -type f -exec sed -i 's/rounded-full/rounded/g' {} +

# Clean up double spaces that may have been created
find src/pages -name "*.tsx" -type f -exec sed -i 's/  */ /g' {} +

echo "UI fixes applied to all pages"
