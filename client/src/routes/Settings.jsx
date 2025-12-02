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

export default function SettingsPage() {
  const {
    settings,
    loading,
    error,
    save,
    disconnectProvider,
    refresh,
  } = useSettings();

  useEffect(() => {
    // Could be used for analytics, focus management, etc.
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu />

      <main id="main-content" className="flex-grow pt-24 px-4 lg:px-8">

        <div className="lg:flex lg:items-start relative">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:mr-10 lg:sticky lg:top-28 h-fit">
            <Sidebar />
          </aside>

          {/* MAIN SETTINGS CONTENT */}
          <div className="flex-1 p-4 sm:p-6 lg:p-10 space-y-12 max-w-[1100px] mx-auto">

            {/* LOADING STATE */}
            {loading && (
              <div className="text-gray-300 text-lg py-10 text-center">
                Loading settings…
              </div>
            )}

            {/* ERROR STATE */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500 text-red-300 text-center">
                Failed to load settings.
                <button
                  onClick={refresh}
                  className="underline ml-2 text-red-200 hover:text-red-100"
                >
                  Retry
                </button>
              </div>
            )}

            {/* CONTENT */}
            {!loading && !error && (
              <>
                <section id="profile">
                  <ProfileSection />
                </section>

                <section id="theme">
                  <ThemeSection />
                </section>

                <section id="personal">
                  <PersonalInfoSection />
                </section>

                <section id="account">
                  <AccountSection />
                </section>

                <section id="support">
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