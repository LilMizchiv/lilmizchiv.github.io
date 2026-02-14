document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.page-content');
    const logoContainer = document.querySelector('.logo-container'); 
    const defaultSectionId = '#home'; 
    const allMemberProfiles = document.querySelectorAll('.member-profile'); 

    // --- Core Page Switching Logic (Omitted for brevity, remains unchanged) ---
    const showSection = (targetId, updateHistory = true) => {
        // ... (function logic remains the same) ...
        if (targetId === '#home') { 
            logoContainer.classList.remove('logo-hidden'); 
        } else {
            logoContainer.classList.add('logo-hidden'); 
        }

        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        logoContainer.classList.remove('active'); 

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.classList.add('active');
            
            if (updateHistory) {
                history.pushState(null, '', targetId);
            }
        }
    };

    // Handle initial load, history, and nav link clicks (Omitted for brevity, remains unchanged)

    // Handle initial load based on URL hash 
    const initialHash = window.location.hash || defaultSectionId;
    showSection(initialHash, false); 

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const newHash = window.location.hash || defaultSectionId;
        showSection(newHash, false); 
    });

    // Handle Nav Link Clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('href'); 
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); 
                showSection(targetId); 
                window.scrollTo(0, 0); 
            }
        });
    });
    
    // --- Member Profile Hover/Leave Logic (REPLACED CLICK TOGGLE) ---

    const collapseProfile = (profile) => {
        profile.classList.remove('expanded');
        profile.style.zIndex = 'auto';
    };

    const expandProfile = (profile) => {
        // 1. Collapse all profiles first (Auto-Collapse)
        allMemberProfiles.forEach(p => {
            collapseProfile(p);
        });

        // 2. Expand the hovered profile
        profile.classList.add('expanded');
        
        // 3. Set a high z-index for layering
        profile.style.zIndex = '11'; 
    };

    allMemberProfiles.forEach(profile => {
        // Expand on mouse enter (hover)
        profile.addEventListener('mouseenter', () => {
            expandProfile(profile);
        });
        
        // Collapse on mouse leave (mouseout)
        profile.addEventListener('mouseleave', () => {
            collapseProfile(profile);
        });
    });
    
    // --- REMOVED: Previous .toggle-details click logic ---
});