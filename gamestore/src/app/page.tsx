'use client'

import React from 'react';
import Products from "../components/products/products";
import Slider from "../components/slider/slider";
import Footer from "../components/footer/footer";
import Guarantee from "../components/guarantee/guarantee";
import Scroller from "../components/scroller/scroller";
import Banner from '../components/banner/banner';
import { store } from '../store/index';
import { Provider } from 'react-redux';

export default function Home() {
  return (
      <>
          <Provider store={store}>
          <Banner/>
          <Products/>
          <Slider/>
          <Guarantee/>
          <Scroller/>
          <Footer/>
          </Provider>
      </>
  );
}
