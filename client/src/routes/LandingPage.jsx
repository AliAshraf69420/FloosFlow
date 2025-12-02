import React from 'react'
import WelcomeCard from '../components/LandingPage/WelcomeCard'
import Introduction from '../components/LandingPage/Introduction'
import StartCard from '../components/LandingPage/StartCard'

const LandingPage = () => {
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-dark pb-32">
            <WelcomeCard />
            <Introduction></Introduction>
            <StartCard></StartCard>
        </div>
    )
}

export default LandingPage
