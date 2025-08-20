'use client'

import React from 'react';
import Slider from "../components/slider/slider";
import Guarantee from "../components/guarantee/guarantee";
import Scroller from "../components/scroller/scroller";
import Banner from '../components/banner/banner';


export default function Home() {
  return (
      <>
          <Banner/>
          <Slider/>
          <Guarantee/>
          <Scroller/>
      </>
  );
}
