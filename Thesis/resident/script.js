// Authentication Check
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    initializeNavigation();
    initializeDashboard();
    initializeUserInterface();
    initializeCertificateSection();
    initializeServicesSection();
    initializeComplaintsSection();
    initializeAnnouncementsSection();
});

function initializeUserInterface() {
    // Set user information in the interface
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
    
    if (username && userType) {
        updateUserInterface(username, userType);
    }

    // Add logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function updateUserInterface(username, userType) {
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        const userNameEl = userInfo.querySelector('.user-name');
        const userRoleEl = userInfo.querySelector('.user-role');
        
        if (userNameEl) userNameEl.textContent = getDisplayName(username);
        if (userRoleEl) userRoleEl.textContent = getRoleTitle(userType);
    }

    // Show/hide modules based on user role
    configureAccessByRole(userType);
}

function getDisplayName(username) {
    const displayNames = {
        'secretary': 'Secretary Noela V. Impreso',
        'captain': 'Barangay Captain',
        'tanod': 'Barangay Tanod',
        'resident': 'Resident User'
    };
    return displayNames[username.toLowerCase()] || username;
}

function getRoleTitle(userType) {
    const roleTitles = {
        'official': 'Barangay Official',
        'resident': 'Resident'
    };
    return roleTitles[userType] || 'User';
}

function configureAccessByRole(userType) {
    const username = localStorage.getItem('username');
    
    // Configure dashboard based on user type
    if (userType === 'head_household') {
        showHeadHouseholdDashboard();
        updateDashboardWelcome('Head of Household');
        
        // Show modules for head of household
        const allowedModules = ['dashboard', 'household-members', 'certificates', 'complaints', 'services', 'announcements'];
        const restrictedModules = ['reports', 'residents', 'blotter'];
        
        allowedModules.forEach(moduleId => {
            const navLink = document.querySelector(`[href="#${moduleId}"]`);
            if (navLink) {
                navLink.style.display = 'flex';
            }
        });
        
        restrictedModules.forEach(moduleId => {
            const navLink = document.querySelector(`[href="#${moduleId}"]`);
            if (navLink) {
                navLink.style.display = 'none';
            }
        });
        
    } else if (userType === 'regular_resident') {
        showRegularResidentDashboard();
        updateDashboardWelcome('Regular Resident');
        
        // Show limited modules for regular residents
        const allowedModules = ['dashboard', 'certificates', 'complaints', 'announcements'];
        const restrictedModules = ['reports', 'residents', 'blotter', 'household-members', 'services'];
        
        allowedModules.forEach(moduleId => {
            const navLink = document.querySelector(`[href="#${moduleId}"]`);
            if (navLink) {
                navLink.style.display = 'flex';
            }
        });
        
        restrictedModules.forEach(moduleId => {
            const navLink = document.querySelector(`[href="#${moduleId}"]`);
            if (navLink) {
                navLink.style.display = 'none';
            }
        });
        
    } else {
        showOfficialDashboard();
        updateDashboardWelcome('Official');
        
        // Show all modules for officials
        const allModules = ['dashboard', 'residents', 'certificates', 'complaints', 'blotter', 'reports', 'services', 'announcements', 'feedback'];
        allModules.forEach(moduleId => {
            const navLink = document.querySelector(`[href="#${moduleId}"]`);
            if (navLink) {
                navLink.style.display = 'flex';
            }
        });
    }
}

function showResidentDashboard() {
    const officialDashboard = document.getElementById('official-dashboard');
    const residentDashboard = document.getElementById('resident-dashboard');
    const headHouseholdDashboard = document.getElementById('head-household-dashboard');
    
    if (officialDashboard && residentDashboard && headHouseholdDashboard) {
        officialDashboard.style.display = 'none';
        residentDashboard.style.display = 'block';
        headHouseholdDashboard.style.display = 'none';
    }
}

function showRegularResidentDashboard() {
    const officialDashboard = document.getElementById('official-dashboard');
    const residentDashboard = document.getElementById('resident-dashboard');
    const headHouseholdDashboard = document.getElementById('head-household-dashboard');
    
    if (officialDashboard && residentDashboard && headHouseholdDashboard) {
        officialDashboard.style.display = 'none';
        residentDashboard.style.display = 'block';
        headHouseholdDashboard.style.display = 'none';
    }
}

function showHeadHouseholdDashboard() {
    const officialDashboard = document.getElementById('official-dashboard');
    const residentDashboard = document.getElementById('resident-dashboard');
    const headHouseholdDashboard = document.getElementById('head-household-dashboard');
    
    if (officialDashboard && residentDashboard && headHouseholdDashboard) {
        officialDashboard.style.display = 'none';
        residentDashboard.style.display = 'none';
        headHouseholdDashboard.style.display = 'block';
    }
}

function showOfficialDashboard() {
    const officialDashboard = document.getElementById('official-dashboard');
    const residentDashboard = document.getElementById('resident-dashboard');
    const headHouseholdDashboard = document.getElementById('head-household-dashboard');
    
    if (officialDashboard && residentDashboard && headHouseholdDashboard) {
        officialDashboard.style.display = 'block';
        residentDashboard.style.display = 'none';
        headHouseholdDashboard.style.display = 'none';
    }
}

function updateDashboardWelcome(userType) {
    const welcomeElement = document.getElementById('dashboard-welcome');
    if (welcomeElement) {
        if (userType === 'Head of Household') {
            welcomeElement.textContent = 'Welcome to your household management portal - Manage your family and household services';
        } else if (userType === 'Regular Resident') {
            welcomeElement.textContent = 'Welcome to your personalized Barangay Central portal';
        } else {
            welcomeElement.textContent = 'Welcome to Barangay Central E-Government System';
        }
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        window.location.href = 'login.html';
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.classList.add('fade-in');
            }
        });
    });
}

function showModule(moduleId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Remove active class from all nav links
    navLinks.forEach(nav => nav.classList.remove('active'));
    
    // Add active class to corresponding nav link
    const targetNavLink = document.querySelector(`[href="#${moduleId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Hide all content sections
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(moduleId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
        
        // Ensure correct dashboard is shown when returning to dashboard
        if (moduleId === 'dashboard') {
            const userType = localStorage.getItem('userType');
            if (userType === 'head_household') {
                showHeadHouseholdDashboard();
            } else if (userType === 'regular_resident') {
                showRegularResidentDashboard();
            } else {
                showOfficialDashboard();
            }
        }
    }
}

function initializeDashboard() {
    // Add click handlers for quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent.toLowerCase();
            
            switch(action) {
                case 'issue certificate':
                    showModule('certificates');
                    break;
                case 'add resident':
                    showModule('residents');
                    break;
                case 'create blotter':
                    showModule('blotter');
                    break;
                case 'generate report':
                    showModule('reports');
                    break;
            }
        });
    });
    
    // Simulate real-time data updates
    updateStatistics();
    setInterval(updateStatistics, 30000); // Update every 30 seconds
}

function updateStatistics() {
    // Simulate data updates
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.5s ease-in';
        }, 100);
    });
}

// Certificate Management Functions
function issueCertificate(type) {
    // Create modal for certificate issuance
    const modal = createModal(`
        <div class="certificate-form">
            <h3>Issue ${type}</h3>
            <form id="certificateForm">
                <div class="form-group">
                    <label>Resident Name</label>
                    <input type="text" id="residentName" required>
                </div>
                <div class="form-group">
                    <label>Resident ID</label>
                    <input type="text" id="residentId" required>
                </div>
                <div class="form-group">
                    <label>Purpose</label>
                    <textarea id="purpose" rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Issue Certificate</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('certificateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processCertificate(type);
        closeModal();
    });
}

function processCertificate(type) {
    // Simulate certificate processing
    showNotification('Certificate issued successfully!', 'success');
    
    // Update recent certificates table
    updateRecentCertificates(type);
}

function updateRecentCertificates(type) {
    const tableBody = document.querySelector('#certificates .data-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>BC-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</td>
        <td>${type}</td>
        <td>${document.getElementById('residentName').value}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>Secretary Impreso</td>
        <td><span class="status-badge completed">Issued</span></td>
        <td>
            <button class="btn-icon" title="View">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" title="Print">
                <i class="fas fa-print"></i>
            </button>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Resident Management Functions
function addNewResident() {
    const modal = createModal(`
        <div class="resident-form">
            <h3>Add New Resident</h3>
            <form id="residentForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="firstName" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="lastName" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" id="address" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Purok</label>
                        <select id="purok" required>
                            <option value="">Select Purok</option>
                            <option value="Purok 1">Purok 1</option>
                            <option value="Purok 2">Purok 2</option>
                            <option value="Purok 3">Purok 3</option>
                            <option value="Purok 4">Purok 4</option>
                            <option value="Purok 5">Purok 5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Contact Number</label>
                        <input type="tel" id="contact" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Resident</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('residentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processNewResident();
        closeModal();
    });
}

function processNewResident() {
    showNotification('Resident added successfully!', 'success');
    updateResidentsTable();
}

function updateResidentsTable() {
    const tableBody = document.querySelector('#residents .data-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>R-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</td>
        <td>${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</td>
        <td>${document.getElementById('address').value}</td>
        <td>${document.getElementById('purok').value}</td>
        <td>${document.getElementById('contact').value}</td>
        <td><span class="status-badge active">Active</span></td>
        <td>
            <button class="btn-icon" title="View">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Blotter Management Functions
function createBlotter() {
    const modal = createModal(`
        <div class="blotter-form">
            <h3>Create New Blotter</h3>
            <form id="blotterForm">
                <div class="form-group">
                    <label>Case Type</label>
                    <select id="caseType" required>
                        <option value="">Select Case Type</option>
                        <option value="Dispute">Dispute</option>
                        <option value="Theft">Theft</option>
                        <option value="Noise Complaint">Noise Complaint</option>
                        <option value="Property Damage">Property Damage</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Complainant</label>
                    <input type="text" id="complainant" required>
                </div>
                <div class="form-group">
                    <label>Respondent</label>
                    <input type="text" id="respondent" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="location" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Blotter</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('blotterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processBlotter();
        closeModal();
    });
}

function processBlotter() {
    showNotification('Blotter case created successfully!', 'success');
}

// Report Generation Functions
function generateReport(type) {
    showNotification(`Generating ${type} report...`, 'info');
    
    // Simulate report generation
    setTimeout(() => {
        showNotification(`${type} report generated successfully!`, 'success');
    }, 2000);
}

// Modal Management
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function closeNotification(button) {
    button.parentNode.remove();
}

// Search and Filter Functions
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.content-section').querySelector('.data-table');
            
            if (table) {
                filterTable(table, searchTerm);
            }
        });
    });
}

function filterTable(table, searchTerm) {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

// Add event listeners for certificate type cards
document.addEventListener('DOMContentLoaded', function() {
    const certTypeCards = document.querySelectorAll('.cert-type-card .btn');
    
    certTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const certificateType = this.closest('.cert-type-card').querySelector('h3').textContent;
            issueCertificate(certificateType);
        });
    });
    
    // Add event listeners for action buttons
    const addResidentBtn = document.querySelector('#residents .header-actions .btn');
    if (addResidentBtn) {
        addResidentBtn.addEventListener('click', addNewResident);
    }
    
    const issueCertBtn = document.querySelector('#certificates .header-actions .btn');
    if (issueCertBtn) {
        issueCertBtn.addEventListener('click', function() {
            // Show certificate type selection
            showCertificateTypeSelection();
        });
    }
});

function showCertificateTypeSelection() {
    const modal = createModal(`
        <div class="certificate-selection">
            <h3>Select Certificate Type</h3>
            <div class="cert-selection-grid">
                <button class="cert-selection-btn" onclick="issueCertificate('Barangay Clearance')">
                    <i class="fas fa-certificate"></i>
                    <span>Barangay Clearance</span>
                </button>
                <button class="cert-selection-btn" onclick="issueCertificate('Certificate of Residency')">
                    <i class="fas fa-home"></i>
                    <span>Certificate of Residency</span>
                </button>
                <button class="cert-selection-btn" onclick="issueCertificate('Certificate of Indigency')">
                    <i class="fas fa-heart"></i>
                    <span>Certificate of Indigency</span>
                </button>
                <button class="cert-selection-btn" onclick="issueCertificate('Certificate of Good Moral Character')">
                    <i class="fas fa-star"></i>
                    <span>Certificate of Good Moral Character</span>
                </button>
            </div>
            <div class="form-actions">
                <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// Add CSS for modals and notifications
const additionalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    border-radius: 10px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
    padding: 1rem;
    border-bottom: 1px solid var(--gray-200);
    display: flex;
    justify-content: flex-end;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--gray-500);
}

.modal-body {
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--gray-700);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--gray-200);
    border-radius: 5px;
    font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-green);
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    z-index: 3000;
    animation: slideIn 0.3s ease-out;
}

.notification-success {
    border-left: 4px solid var(--success);
}

.notification-error {
    border-left: 4px solid var(--danger);
}

.notification-warning {
    border-left: 4px solid var(--warning);
}

.notification-info {
    border-left: 4px solid var(--info);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--gray-500);
}

.cert-selection-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.cert-selection-btn {
    background: var(--white);
    border: 2px solid var(--gray-200);
    padding: 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.cert-selection-btn:hover {
    border-color: var(--primary-green);
    background: var(--light-green);
}

.cert-selection-btn i {
    font-size: 2rem;
    color: var(--primary-green);
}

.cert-selection-btn span {
    font-weight: 500;
    color: var(--gray-700);
    text-align: center;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

function addHouseholdMember() {
    const modal = createModal(`
        <div class="household-member-form">
            <h3>Add Household Member</h3>
            <form id="householdMemberForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="memberFirstName" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="memberLastName" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Relationship to Head</label>
                    <select id="memberRelationship" required>
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" id="memberAge" required>
                    </div>
                    <div class="form-group">
                        <label>Occupation</label>
                        <input type="text" id="memberOccupation" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Contact Number</label>
                    <input type="tel" id="memberContact" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Member</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('householdMemberForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processNewHouseholdMember();
        closeModal();
    });
}

function processNewHouseholdMember() {
    showNotification('Household member added successfully!', 'success');
    updateHouseholdMembersTable();
}

function updateHouseholdMembersTable() {
    const tableBody = document.querySelector('#household-members .data-table tbody');
    if (!tableBody) return;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-6 py-4">M-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</td>
        <td class="px-6 py-4">${document.getElementById('memberFirstName').value} ${document.getElementById('memberLastName').value}</td>
        <td class="px-6 py-4">${document.getElementById('memberRelationship').value}</td>
        <td class="px-6 py-4">${document.getElementById('memberAge').value}</td>
        <td class="px-6 py-4">${document.getElementById('memberOccupation').value}</td>
        <td class="px-6 py-4">${document.getElementById('memberContact').value}</td>
        <td class="px-6 py-4">
            <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Certificate Request Management Functions
function showCertificateRequestForm() {
    const userType = localStorage.getItem('userType');
    let modalContent = '';
    
    if (userType === 'official') {
        // Officials can issue certificates directly
        modalContent = `
            <div class="certificate-issue-form">
                <h3>Issue Certificate</h3>
                <form id="certificateIssueForm">
                    <div class="form-group">
                        <label>Resident Name</label>
                        <input type="text" id="residentName" required placeholder="Enter resident name">
                    </div>
                    <div class="form-group">
                        <label>Certificate Type</label>
                        <select id="certificateType" required>
                            <option value="">Select Certificate Type</option>
                            <option value="Barangay Clearance">Barangay Clearance</option>
                            <option value="Certificate of Residency">Certificate of Residency</option>
                            <option value="Certificate of Indigency">Certificate of Indigency</option>
                            <option value="Certificate of Good Moral Character">Certificate of Good Moral Character</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Purpose</label>
                        <textarea id="purpose" rows="3" placeholder="Enter purpose of certificate"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Issue Certificate</button>
                    </div>
                </form>
            </div>
        `;
    } else {
        // Residents can request certificates
        modalContent = `
            <div class="certificate-request-form">
                <h3>Request Certificate</h3>
                <form id="certificateRequestForm">
                    <div class="form-group">
                        <label>Request For</label>
                        ${userType === 'head_household' ? 
                            `<select id="requestFor" required>
                                <option value="">Select Person</option>
                                <option value="Self">Self</option>
                                <option value="Maria Dela Cruz">Maria Dela Cruz (Spouse)</option>
                                <option value="Pedro Dela Cruz">Pedro Dela Cruz (Son)</option>
                            </select>` : 
                            `<input type="text" id="requestFor" value="Self" readonly class="bg-gray-50">`
                        }
                    </div>
                    <div class="form-group">
                        <label>Certificate Type</label>
                        <select id="certificateType" required>
                            <option value="">Select Certificate Type</option>
                            <option value="Barangay Clearance">Barangay Clearance</option>
                            <option value="Certificate of Residency">Certificate of Residency</option>
                            <option value="Certificate of Indigency">Certificate of Indigency</option>
                            <option value="Certificate of Good Moral Character">Certificate of Good Moral Character</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Purpose</label>
                        <textarea id="purpose" rows="3" required placeholder="Enter purpose of certificate request"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Supporting Documents</label>
                        <input type="file" id="supportingDocs" multiple accept=".pdf,.jpg,.jpeg,.png">
                        <small class="text-gray-500">Upload valid ID or other supporting documents</small>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Request</button>
                    </div>
                </form>
            </div>
        `;
    }
    
    const modal = createModal(modalContent);
    document.body.appendChild(modal);
    
    // Handle form submission
    const formId = userType === 'official' ? 'certificateIssueForm' : 'certificateRequestForm';
    document.getElementById(formId).addEventListener('submit', function(e) {
        e.preventDefault();
        if (userType === 'official') {
            processCertificateIssue();
        } else {
            processCertificateRequest();
        }
        closeModal();
    });
}

function processCertificateIssue() {
    showNotification('Certificate issued successfully!', 'success');
    updateIssuedCertificatesTable();
}

function processCertificateRequest() {
    showNotification('Certificate request submitted successfully!', 'success');
    updateCertificateRequestsTable();
}

function updateCertificateRequestsTable() {
    const tableBody = document.getElementById('certificate-requests-table');
    if (!tableBody) return;
    
    const newRow = document.createElement('tr');
    const requestId = 'CR-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const certificateType = document.getElementById('certificateType').value;
    const requestFor = document.getElementById('requestFor').value;
    const purpose = document.getElementById('purpose').value;
    
    newRow.innerHTML = `
        <td class="px-6 py-4">${requestId}</td>
        <td class="px-6 py-4">${certificateType}</td>
        <td class="px-6 py-4">${requestFor}</td>
        <td class="px-6 py-4">${purpose}</td>
        <td class="px-6 py-4">${new Date().toLocaleDateString()}</td>
        <td class="px-6 py-4">
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Pending</span>
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

function updateIssuedCertificatesTable() {
    const tableBody = document.getElementById('issued-certificates-table');
    if (!tableBody) return;
    
    const newRow = document.createElement('tr');
    const certNumber = 'BC-2024-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    const certificateType = document.getElementById('certificateType').value;
    const residentName = document.getElementById('residentName').value;
    
    newRow.innerHTML = `
        <td class="px-6 py-4">${certNumber}</td>
        <td class="px-6 py-4">${certificateType}</td>
        <td class="px-6 py-4">${residentName}</td>
        <td class="px-6 py-4">${new Date().toLocaleDateString()}</td>
        <td class="px-6 py-4">Secretary Noela V. Impreso</td>
        <td class="px-6 py-4">
            <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Issued</span>
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300" title="Print">
                    <i class="fas fa-print"></i>
                </button>
            </div>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Initialize certificate section based on user type
function initializeCertificateSection() {
    const userType = localStorage.getItem('userType');
    const subtitle = document.getElementById('certificates-subtitle');
    const buttonText = document.getElementById('certificates-button-text');
    const issuedSection = document.getElementById('issued-certificates-section');
    
    if (userType === 'official') {
        if (subtitle) subtitle.textContent = 'Issue and manage certificates and clearances';
        if (buttonText) buttonText.textContent = 'Issue New Certificate';
        if (issuedSection) issuedSection.style.display = 'block';
    } else if (userType === 'head_household') {
        if (subtitle) subtitle.textContent = 'Request certificates for yourself and household members';
        if (buttonText) buttonText.textContent = 'Request Certificate';
        if (issuedSection) issuedSection.style.display = 'block';
    } else if (userType === 'regular_resident') {
        if (subtitle) subtitle.textContent = 'Request personal certificates and track your requests';
        if (buttonText) buttonText.textContent = 'Request Certificate';
        if (issuedSection) issuedSection.style.display = 'none';
    }
}

// Service Request Management Functions
function showServiceRequestForm() {
    const userType = localStorage.getItem('userType');
    
    const modalContent = `
        <div class="service-request-form">
            <h3>Submit Service Request</h3>
            <form id="serviceRequestForm">
                <div class="form-group">
                    <label>Service Type</label>
                    <select id="serviceType" required>
                        <option value="">Select Service Type</option>
                        <option value="Streetlight Repair">Streetlight Repair</option>
                        <option value="Waste Collection">Waste Collection</option>
                        <option value="Road Maintenance">Road Maintenance</option>
                        <option value="Water Supply">Water Supply</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Request Level</label>
                    ${userType === 'head_household' ? 
                        `<select id="requestLevel" required>
                            <option value="">Select Request Level</option>
                            <option value="Household">Household Level</option>
                            <option value="Personal">Personal Level</option>
                        </select>` : 
                        `<input type="text" id="requestLevel" value="Personal" readonly class="bg-gray-50">`
                    }
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="serviceLocation" required placeholder="Enter specific location or address">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="serviceDescription" rows="4" required placeholder="Describe the service needed or issue to be addressed"></textarea>
                </div>
                <div class="form-group">
                    <label>Priority Level</label>
                    <select id="priorityLevel" required>
                        <option value="Low">Low - Can wait</option>
                        <option value="Medium" selected>Medium - Normal priority</option>
                        <option value="High">High - Urgent</option>
                        <option value="Emergency">Emergency - Immediate attention</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Contact Information</label>
                    <input type="tel" id="contactInfo" required placeholder="Your contact number">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
    `;
    
    const modal = createModal(modalContent);
    document.body.appendChild(modal);
    
    document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processServiceRequest();
        closeModal();
    });
}

function requestService(serviceType) {
    // Pre-fill the service type in the form
    const modal = createModal(`
        <div class="service-request-form">
            <h3>Submit Service Request</h3>
            <form id="serviceRequestForm">
                <div class="form-group">
                    <label>Service Type</label>
                    <input type="text" id="serviceType" value="${serviceType}" readonly class="bg-gray-50">
                </div>
                <div class="form-group">
                    <label>Request Level</label>
                    ${localStorage.getItem('userType') === 'head_household' ? 
                        `<select id="requestLevel" required>
                            <option value="">Select Request Level</option>
                            <option value="Household">Household Level</option>
                            <option value="Personal">Personal Level</option>
                        </select>` : 
                        `<input type="text" id="requestLevel" value="Personal" readonly class="bg-gray-50">`
                    }
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="serviceLocation" required placeholder="Enter specific location or address">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="serviceDescription" rows="4" required placeholder="Describe the service needed or issue to be addressed"></textarea>
                </div>
                <div class="form-group">
                    <label>Priority Level</label>
                    <select id="priorityLevel" required>
                        <option value="Low">Low - Can wait</option>
                        <option value="Medium" selected>Medium - Normal priority</option>
                        <option value="High">High - Urgent</option>
                        <option value="Emergency">Emergency - Immediate attention</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Contact Information</label>
                    <input type="tel" id="contactInfo" required placeholder="Your contact number">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processServiceRequest();
        closeModal();
    });
}

function processServiceRequest() {
    showNotification('Service request submitted successfully!', 'success');
    updateServiceRequestsTable();
}

function updateServiceRequestsTable() {
    const tableBody = document.getElementById('service-requests-table');
    if (!tableBody) return;
    
    const newRow = document.createElement('tr');
    const requestId = 'SR-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const serviceType = document.getElementById('serviceType').value;
    const requestLevel = document.getElementById('requestLevel').value;
    const location = document.getElementById('serviceLocation').value;
    const description = document.getElementById('serviceDescription').value;
    const priority = document.getElementById('priorityLevel').value;
    
    let priorityBadge = '';
    switch(priority) {
        case 'Low': priorityBadge = '<span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">Low</span>'; break;
        case 'Medium': priorityBadge = '<span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Medium</span>'; break;
        case 'High': priorityBadge = '<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">High</span>'; break;
        case 'Emergency': priorityBadge = '<span class="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Emergency</span>'; break;
    }
    
    newRow.innerHTML = `
        <td class="px-6 py-4">${requestId}</td>
        <td class="px-6 py-4">${serviceType}</td>
        <td class="px-6 py-4">${description.substring(0, 50)}${description.length > 50 ? '...' : ''}</td>
        <td class="px-6 py-4">${location}</td>
        <td class="px-6 py-4">${new Date().toLocaleDateString()}</td>
        <td class="px-6 py-4">
            ${priorityBadge}
            <br>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mt-1">Pending</span>
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Initialize services section based on user type
function initializeServicesSection() {
    const userType = localStorage.getItem('userType');
    const subtitle = document.getElementById('services-subtitle');
    const buttonText = document.getElementById('services-button-text');
    const allRequestsSection = document.getElementById('all-service-requests-section');
    
    if (userType === 'official') {
        if (subtitle) subtitle.textContent = 'Manage all barangay service requests and assign tasks';
        if (buttonText) buttonText.textContent = 'Submit Service Request';
        if (allRequestsSection) allRequestsSection.style.display = 'block';
    } else if (userType === 'head_household') {
        if (subtitle) subtitle.textContent = 'Submit household-level and personal service requests';
        if (buttonText) buttonText.textContent = 'Submit Service Request';
        if (allRequestsSection) allRequestsSection.style.display = 'none';
    } else if (userType === 'regular_resident') {
        if (subtitle) subtitle.textContent = 'Submit personal service requests and track progress';
        if (buttonText) buttonText.textContent = 'Submit Service Request';
        if (allRequestsSection) allRequestsSection.style.display = 'none';
    }
}

// Complaint and Feedback Management Functions
function showComplaintForm() {
    const userType = localStorage.getItem('userType');
    
    const modalContent = `
        <div class="complaint-form">
            <h3>Submit Complaint</h3>
            <form id="complaintForm">
                <div class="form-group">
                    <label>Complaint Type</label>
                    <select id="complaintType" required>
                        <option value="">Select Complaint Type</option>
                        <option value="Noise Complaint">Noise Complaint</option>
                        <option value="Community Dispute">Community Dispute</option>
                        <option value="Property Damage">Property Damage</option>
                        <option value="Safety Concern">Safety Concern</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Complaint Level</label>
                    ${userType === 'head_household' ? 
                        `<select id="complaintLevel" required>
                            <option value="">Select Complaint Level</option>
                            <option value="Household">Household Level</option>
                            <option value="Personal">Personal Level</option>
                        </select>` : 
                        `<input type="text" id="complaintLevel" value="Personal" readonly class="bg-gray-50">`
                    }
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" id="complaintSubject" required placeholder="Brief description of the complaint">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="complaintLocation" required placeholder="Where did this incident occur?">
                </div>
                <div class="form-group">
                    <label>Detailed Description</label>
                    <textarea id="complaintDescription" rows="5" required placeholder="Please provide detailed information about the complaint"></textarea>
                </div>
                <div class="form-group">
                    <label>Priority Level</label>
                    <select id="complaintPriority" required>
                        <option value="Low">Low - Minor issue</option>
                        <option value="Medium" selected>Medium - Moderate concern</option>
                        <option value="High">High - Serious concern</option>
                        <option value="Urgent">Urgent - Immediate attention needed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Contact Information</label>
                    <input type="tel" id="complaintContact" required placeholder="Your contact number for follow-up">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Complaint</button>
                </div>
            </form>
        </div>
    `;
    
    const modal = createModal(modalContent);
    document.body.appendChild(modal);
    
    document.getElementById('complaintForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processComplaint();
        closeModal();
    });
}

function submitComplaint(complaintType) {
    // Pre-fill the complaint type in the form
    const modal = createModal(`
        <div class="complaint-form">
            <h3>Submit ${complaintType}</h3>
            <form id="complaintForm">
                <div class="form-group">
                    <label>Complaint Type</label>
                    <input type="text" id="complaintType" value="${complaintType}" readonly class="bg-gray-50">
                </div>
                <div class="form-group">
                    <label>Complaint Level</label>
                    ${localStorage.getItem('userType') === 'head_household' ? 
                        `<select id="complaintLevel" required>
                            <option value="">Select Complaint Level</option>
                            <option value="Household">Household Level</option>
                            <option value="Personal">Personal Level</option>
                        </select>` : 
                        `<input type="text" id="complaintLevel" value="Personal" readonly class="bg-gray-50">`
                    }
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" id="complaintSubject" required placeholder="Brief description of the complaint">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="complaintLocation" required placeholder="Where did this incident occur?">
                </div>
                <div class="form-group">
                    <label>Detailed Description</label>
                    <textarea id="complaintDescription" rows="5" required placeholder="Please provide detailed information about the complaint"></textarea>
                </div>
                <div class="form-group">
                    <label>Priority Level</label>
                    <select id="complaintPriority" required>
                        <option value="Low">Low - Minor issue</option>
                        <option value="Medium" selected>Medium - Moderate concern</option>
                        <option value="High">High - Serious concern</option>
                        <option value="Urgent">Urgent - Immediate attention needed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Contact Information</label>
                    <input type="tel" id="complaintContact" required placeholder="Your contact number for follow-up">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Complaint</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('complaintForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processComplaint();
        closeModal();
    });
}

function submitFeedback() {
    const modal = createModal(`
        <div class="feedback-form">
            <h3>Submit Feedback</h3>
            <form id="feedbackForm">
                <div class="form-group">
                    <label>Feedback Type</label>
                    <select id="feedbackType" required>
                        <option value="">Select Feedback Type</option>
                        <option value="Service Improvement">Service Improvement</option>
                        <option value="Community Suggestion">Community Suggestion</option>
                        <option value="General Feedback">General Feedback</option>
                        <option value="Compliment">Compliment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" id="feedbackSubject" required placeholder="Brief subject of your feedback">
                </div>
                <div class="form-group">
                    <label>Your Feedback</label>
                    <textarea id="feedbackDescription" rows="5" required placeholder="Please share your thoughts, suggestions, or concerns"></textarea>
                </div>
                <div class="form-group">
                    <label>Contact Information (Optional)</label>
                    <input type="tel" id="feedbackContact" placeholder="Your contact number if you'd like a response">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Feedback</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processFeedback();
        closeModal();
    });
}

function processComplaint() {
    showNotification('Complaint submitted successfully! We will review it and get back to you.', 'success');
    updateMyComplaintsTable();
}

function processFeedback() {
    showNotification('Thank you for your feedback! We appreciate your input.', 'success');
    updateMyComplaintsTable();
}

function updateMyComplaintsTable() {
    const tableBody = document.getElementById('my-complaints-table');
    if (!tableBody) return;
    
    const newRow = document.createElement('tr');
    const complaintId = 'CMP-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    
    // Check if it's a complaint or feedback
    const formId = document.getElementById('complaintForm') ? 'complaintForm' : 'feedbackForm';
    const isComplaint = formId === 'complaintForm';
    
    let type, subject, description, priority;
    
    if (isComplaint) {
        type = document.getElementById('complaintType').value;
        subject = document.getElementById('complaintSubject').value;
        description = document.getElementById('complaintDescription').value;
        priority = document.getElementById('complaintPriority').value;
    } else {
        type = 'Feedback - ' + document.getElementById('feedbackType').value;
        subject = document.getElementById('feedbackSubject').value;
        description = document.getElementById('feedbackDescription').value;
        priority = 'Normal';
    }
    
    let priorityBadge = '';
    if (isComplaint) {
        switch(priority) {
            case 'Low': priorityBadge = '<span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">Low</span>'; break;
            case 'Medium': priorityBadge = '<span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Medium</span>'; break;
            case 'High': priorityBadge = '<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">High</span>'; break;
            case 'Urgent': priorityBadge = '<span class="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Urgent</span>'; break;
        }
    } else {
        priorityBadge = '<span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Normal</span>';
    }
    
    newRow.innerHTML = `
        <td class="px-6 py-4">${complaintId}</td>
        <td class="px-6 py-4">${type}</td>
        <td class="px-6 py-4">${subject}</td>
        <td class="px-6 py-4">${new Date().toLocaleDateString()}</td>
        <td class="px-6 py-4">
            ${priorityBadge}
            <br>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mt-1">Under Review</span>
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button class="p-2 text-gray-600 hover:text-barangay-green hover:bg-barangay-green-bg rounded-lg transition-colors duration-300" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
}

// Initialize complaints section based on user type
function initializeComplaintsSection() {
    const userType = localStorage.getItem('userType');
    const subtitle = document.getElementById('complaints-subtitle');
    const buttonText = document.getElementById('complaints-button-text');
    const allComplaintsSection = document.getElementById('all-complaints-section');
    
    if (userType === 'official') {
        if (subtitle) subtitle.textContent = 'Manage all complaints and feedback from residents';
        if (buttonText) buttonText.textContent = 'Submit Complaint';
        if (allComplaintsSection) allComplaintsSection.style.display = 'block';
    } else if (userType === 'head_household') {
        if (subtitle) subtitle.textContent = 'Submit household-level and personal complaints and feedback';
        if (buttonText) buttonText.textContent = 'Submit Complaint';
        if (allComplaintsSection) allComplaintsSection.style.display = 'none';
    } else if (userType === 'regular_resident') {
        if (subtitle) subtitle.textContent = 'Submit personal complaints and feedback';
        if (buttonText) buttonText.textContent = 'Submit Complaint';
        if (allComplaintsSection) allComplaintsSection.style.display = 'none';
    }
}

// Announcements Management Functions
function showCreateAnnouncementForm() {
    const modal = createModal(`
        <div class="announcement-form">
            <h3>Create New Announcement</h3>
            <form id="announcementForm">
                <div class="form-group">
                    <label>Announcement Type</label>
                    <select id="announcementType" required>
                        <option value="">Select Type</option>
                        <option value="Emergency">Emergency</option>
                        <option value="General">General</option>
                        <option value="Event">Event</option>
                        <option value="Information">Information</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="announcementTitle" required placeholder="Enter announcement title">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea id="announcementContent" rows="6" required placeholder="Enter announcement content"></textarea>
                </div>
                <div class="form-group">
                    <label>Priority</label>
                    <select id="announcementPriority" required>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Target Audience</label>
                    <select id="targetAudience" required>
                        <option value="All">All Residents</option>
                        <option value="Head of Household">Head of Household Only</option>
                        <option value="Regular Residents">Regular Residents Only</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Announcement</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('announcementForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processAnnouncement();
        closeModal();
    });
}

function processAnnouncement() {
    showNotification('Announcement created successfully!', 'success');
    updateAnnouncementsList();
}

function updateAnnouncementsList() {
    const announcementsList = document.getElementById('announcements-list');
    if (!announcementsList) return;
    
    const type = document.getElementById('announcementType').value;
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const priority = document.getElementById('announcementPriority').value;
    
    let borderColor, bgColor, textColor, badgeColor, badgeText;
    
    switch(type) {
        case 'Emergency':
            borderColor = 'border-red-500';
            bgColor = 'bg-red-50';
            textColor = 'text-red-800';
            badgeColor = 'bg-red-100 text-red-800';
            badgeText = 'Emergency';
            break;
        case 'General':
            borderColor = 'border-blue-500';
            bgColor = 'bg-blue-50';
            textColor = 'text-blue-800';
            badgeColor = 'bg-blue-100 text-blue-800';
            badgeText = 'General';
            break;
        case 'Event':
            borderColor = 'border-green-500';
            bgColor = 'bg-green-50';
            textColor = 'text-green-800';
            badgeColor = 'bg-green-100 text-green-800';
            badgeText = 'Event';
            break;
        case 'Information':
            borderColor = 'border-yellow-500';
            bgColor = 'bg-yellow-50';
            textColor = 'text-yellow-800';
            badgeColor = 'bg-yellow-100 text-yellow-800';
            badgeText = 'Information';
            break;
    }
    
    const newAnnouncement = document.createElement('div');
    newAnnouncement.className = `border-l-4 ${borderColor} ${bgColor} p-4 rounded-r-lg`;
    newAnnouncement.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold ${textColor}">${title}</h3>
            <span class="px-3 py-1 ${badgeColor} text-xs font-semibold rounded-full">${badgeText}</span>
        </div>
        <p class="${textColor.replace('800', '700')} mb-2">${content}</p>
        <div class="flex justify-between items-center text-xs ${textColor.replace('800', '600')}">
            <span>Posted by: Secretary Noela V. Impreso</span>
            <span>${new Date().toLocaleDateString()}</span>
        </div>
    `;
    
    announcementsList.insertBefore(newAnnouncement, announcementsList.firstChild);
}

// Initialize announcements section based on user type
function initializeAnnouncementsSection() {
    const userType = localStorage.getItem('userType');
    const subtitle = document.getElementById('announcements-subtitle');
    const createBtn = document.getElementById('create-announcement-btn');
    
    if (userType === 'official') {
        if (subtitle) subtitle.textContent = 'Create and manage community announcements and notifications';
        if (createBtn) createBtn.style.display = 'flex';
    } else {
        if (subtitle) subtitle.textContent = 'View community announcements and important updates';
        if (createBtn) createBtn.style.display = 'none';
    }
}
