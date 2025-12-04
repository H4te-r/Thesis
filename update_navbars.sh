#!/bin/bash

# Navigation Bar Consistency Update Script
# This script updates all remaining HTML files with consistent navigation bars

echo "Starting navigation bar consistency updates..."

# List of files to update (excluding already updated ones)
files=(
    "resident-complaints.html"
    "resident-feedback.html"
    "resident-announcements.html"
    "resident-reports.html"
    "resident-settings.html"
    "captain-resident-records.html"
    "captain-certificate-management.html"
    "captain-complaint-management.html"
    "captain-service-management.html"
    "captain-announcements.html"
    "captain-reports.html"
    "captain-settings.html"
    "secretary-dashboard.html"
    "secretary-user-management.html"
    "secretary-certificate-requests.html"
    "secretary-complaint-records.html"
    "secretary-service-requests.html"
    "secretary-announcements.html"
    "secretary-reports.html"
    "secretary-feedback-review.html"
    "secretary-settings.html"
    "treasurer-dashboard.html"
    "treasurer-certificate-payments.html"
    "treasurer-financial-records.html"
    "treasurer-reports.html"
    "treasurer-announcements.html"
    "treasurer-settings.html"
    "kagawad-dashboard.html"
    "kagawad-complaint-handling.html"
    "kagawad-service-oversight.html"
    "kagawad-reports.html"
    "kagawad-announcements.html"
    "kagawad-settings.html"
    "lupon-dashboard.html"
    "lupon-complaint-cases.html"
    "lupon-reports.html"
    "lupon-announcements.html"
    "lupon-settings.html"
    "health-worker-dashboard.html"
    "health-worker-settings.html"
    "staff-dashboard.html"
    "staff-settings.html"
    "sk-chairman-dashboard.html"
    "sk-chairman-service-requests.html"
    "sk-chairman-announcements.html"
    "sk-chairman-reports.html"
    "sk-chairman-settings.html"
    "sk-kagawad-dashboard.html"
    "sk-kagawad-service-requests.html"
    "sk-kagawad-reports.html"
    "sk-kagawad-settings.html"
    "complaint-non-resident.html"
    "track-complaint.html"
)

# Function to update a single file
update_file() {
    local file="$1"
    echo "Updating $file..."
    
    # Update logo spacing
    sed -i '' 's/space-x-4/space-x-3/g' "$file"
    
    # Update fallback icon
    sed -i '' 's/<i class="fas fa-building text-2xl text-barangay-green" style="display: none;"><\/i>/<img src="path\/to\/your\/fallback-icon.png" alt="Building Icon" class="w-8 h-8 object-contain" style="display: none;">/g' "$file"
    
    # Update navigation structure
    sed -i '' 's/<div class="hidden md:flex space-x-6">/<nav class="hidden md:flex items-center space-x-6">/g' "$file"
    
    # Update FontAwesome icons to image placeholders
    sed -i '' 's/<i class="fas fa-home"><\/i>/<img src="path\/to\/your\/home-icon.png" alt="Home" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-certificate"><\/i>/<img src="path\/to\/your\/certificates-icon.png" alt="Certificates" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-tools"><\/i>/<img src="path\/to\/your\/services-icon.png" alt="Services" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-comment-dots"><\/i>/<img src="path\/to\/your\/complaints-icon.png" alt="Complaints" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-users"><\/i>/<img src="path\/to\/your\/household-icon.png" alt="Household" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-star"><\/i>/<img src="path\/to\/your\/feedback-icon.png" alt="Feedback" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-bullhorn"><\/i>/<img src="path\/to\/your\/announcements-icon.png" alt="Announcements" class="w-5 h-5">/g' "$file"
    sed -i '' 's/<i class="fas fa-sign-out-alt text-xl"><\/i>/<img src="path\/to\/your\/logout-icon.png" alt="Logout" class="w-6 h-6">/g' "$file"
    
    echo "Updated $file"
}

# Update all files
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        update_file "$file"
    else
        echo "File $file not found, skipping..."
    fi
done

echo "Navigation bar updates completed!"
echo "Note: You may need to manually add mobile menus and JavaScript to some files."
