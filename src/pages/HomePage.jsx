import React, { useState } from 'react';

// Layout 컴포넌트들
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

// Home 컴포넌트들 - 모두 default export로 통일
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeatureCard from '../components/home/FeatureCard';
import CommunitySection from '../components/home/CommunitySection';
import StatsCard from '../components/home/StatsCard';
import ChatRoomCard from '../components/home/ChatRoomCard';
import AboutSection from '../components/home/AboutSection';
import ChatPreview from '../components/home/ChatPreview';
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