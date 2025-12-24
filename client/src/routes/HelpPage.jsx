import React from 'react'
import WelcomeCard from '../components/Help/WelcomeCard'
import HelpInfo from '../components/Help/HelpInfo'
import HelpForm from '../components/Help/HelpForm'
import ContactSupport from '../components/Help/ContactSupport'
const HelpPage = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32">
        <section role="region" aria-labelledby="welcome-card-header">
            <h2 id="welcome-card-header" className="sr-only">Welcome Section</h2>
            <WelcomeCard />
        </section>

        <section role="region" aria-labelledby="help-info-header">
            <h2 id="help-info-header" className="sr-only">Help Information</h2>
            <HelpInfo />
        </section>

        <section role="region" aria-labelledby="help-form-header">
            <h2 id="help-form-header" className="sr-only">Help Form</h2>
            <HelpForm />
        </section>

        <section role="region" aria-labelledby="contact-support-header">
            <h2 id="contact-support-header" className="sr-only">Contact Support</h2>
            <ContactSupport />
        </section>
        </div>

    )
}

export default HelpPage
