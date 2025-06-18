import React, { useState } from 'react';


import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CommunitySection from '../components/home/CommunitySection';
import AboutSection from '../components/home/AboutSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <CommunitySection />
            <AboutSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default HomePage;