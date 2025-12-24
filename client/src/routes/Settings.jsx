/*  why this file structure ?     
    good question.
    Top-level page
    SettingsPage.jsx - container component. Orchestrates layout, loads settings (via useEffect/useSettings), passes data/handlers down. Handles page-level error/success UI.
    Layout & global UI
    MobileMenu.jsx - mobile-specific menu portion; toggled by NavBar.
    Sidebar.jsx - left navigation (Profile / Theme / Personal / Account). Desktop-only; mobile view can be a top nav or hidden.
    Reusable UI primitives
    Card.jsx - small wrapper that applies .ff-card styles and consistent padding; used by all sections.
    ff-btn variant helpers - either CSS classes in index.css or small Button.jsx wrapper to keep consistent button behavior.
    Sections (each a component)
    ProfileSection.jsx
    Sub-parts: Communication prefs, Change Profile Image, OAuth connected accounts list + connect form.
    Can extract ConnectedProviderList.jsx, ConnectedProviderItem.jsx, and ProviderConnectForm.jsx.
    ThemeSection.jsx - brightness slider, theme buttons.
    PersonalInfoSection.jsx - readonly inputs (country, birthdate, email, phone) and 2FA options. FormRow pattern (label + control).
    AccountSection.jsx - change username/email/password, danger actions (logout all devices, delete account).
    SupportSection.jsx - simple links/buttons.
    Small, focused components:
    FileUpload.jsx - file input + preview + upload button.
    Range.jsx - wrapper for <input type="range"> with accessible label and tooltip.
    Select.jsx - styled select with optional icon.
    ToggleGroup.jsx - for theme selection (Dark/Light/System).
    DangerActions.jsx - two-button block for delete/log out (handles confirmation modals).
    ConfirmModal.jsx - reusable confirmation modal.
*/

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
import Sidebar from "../components/Settings/Sidebar";
import MobileMenu from "../components/Settings/MobileMenu";

import ProfileSection from "../components/Settings/SettingSections/ProfileSection";
import ThemeSection from "../components/Settings/SettingSections/ThemeSection";
import PersonalInfoSection from "../components/Settings/SettingSections/PersonalInfoSection";
import AccountSection from "../components/Settings/SettingSections/AccountSection";
import SupportSection from "../components/Settings/SettingSections/SupportSection";

import useSettings from "../hooks/useSettings";
import LoadingSpinner from "../components/Notifications/LoadingSpinner";
import { useUser } from "../context/UserContext";

export default function SettingsPage() {
  const {
    settings,
    loading,
    error,
    updatePreferences,
    disconnectProvider,
    updatePersonalInfo,
    updateEmail,
    updatePassword,
    deleteAccount,
    refresh,
  } = useSettings();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
      navigate("/Error", { state: { error } });
    }
  }, [error, navigate]);

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu />

      <main 
        id="main-content" 
        className="flex-grow pt-24 px-4 lg:px-8" 
        role="main" 
        aria-labelledby="settings-heading" // Identifies the purpose of the main content
      >
        <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-10 relative">
          
          {/* Sidebar - Complementary Content */}
          <aside 
            className="hidden lg:block lg:sticky lg:top-28 h-fit" 
            role="complementary" 
            aria-label="Settings Navigation"
          >
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-10 space-y-12 max-w-[1100px] mx-auto lg:max-w-none lg:w-full lg:justify-self-end">
            
            {/* Loading Spinner with aria-live region */}
            {loading && !settings && (
              <div 
                className="flex items-center justify-center h-[60vh]" 
                role="status" 
                aria-live="polite" // Let screen readers know to announce dynamic loading content
              >
                <LoadingSpinner />
              </div>
            )}

            {/* Main Content Sections */}
            {(settings || !loading) && (
              <>
                <section id="profile" aria-labelledby="profile-section-heading">
                  <h2 id="profile-section-heading" className="sr-only">Profile Section</h2> {/* Visually hidden but accessible for screen readers */}
                  <ProfileSection
                    onSave={{ updatePreferences }}
                    onDisconnect={disconnectProvider}
                  />
                </section>

                <section id="theme" aria-labelledby="theme-section-heading">
                  <h2 id="theme-section-heading" className="sr-only">Theme Settings</h2>
                  <ThemeSection />
                </section>

                <section id="personal" aria-labelledby="personal-section-heading">
                  <h2 id="personal-section-heading" className="sr-only">Personal Information</h2>
                  <PersonalInfoSection
                    data={settings}
                    onUpdate={updatePersonalInfo}
                  />
                </section>

                <section id="account" aria-labelledby="account-section-heading">
                  <h2 id="account-section-heading" className="sr-only">Account Settings</h2>
                  <AccountSection
                    data={settings}
                    onUpdateUser={updateEmail}
                    onDeleteAccount={deleteAccount}
                  />
                </section>

                <section id="support" aria-labelledby="support-section-heading">
                  <h2 id="support-section-heading" className="sr-only">Support Section</h2>
                  <SupportSection />
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>

  );
}
