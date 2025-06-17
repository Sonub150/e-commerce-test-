import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import HomeSlider from '../components/HomeSlider';
import HomeCatSlider from '../components/HomeCatSlider';
import NewArrivalsSlider from '../components/NewArrivalsSlider';
import SpecialOffersSlider from '../components/SpecialOffersSlider';
import Content from './Content';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <HomeSlider />
      <HomeCatSlider />
      <NewArrivalsSlider />
      <SpecialOffersSlider />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;
