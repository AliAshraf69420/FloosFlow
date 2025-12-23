import React from 'react'
import WelcomeCard from '../components/Help/WelcomeCard'
import HelpInfo from '../components/Help/HelpInfo'
import HelpForm from '../components/Help/HelpForm'
import ContactSupport from '../components/Help/ContactSupport'
const HelpPage = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-light dark:bg-ff-bg-dark pb-32">
            <WelcomeCard></WelcomeCard>
            <HelpInfo></HelpInfo>
            <HelpForm></HelpForm>
            <ContactSupport></ContactSupport>
        </div>
    )
}

export default HelpPage
