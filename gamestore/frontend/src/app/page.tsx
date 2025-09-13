import Guarantee from "../components/guarantee/guarantee";
import Scroller from "../components/scroller/scroller";
import Products from '../components/products/products';
import dynamic from 'next/dynamic'

const Slider = dynamic((

) => import("../components/slider/slider"))
const Banner = dynamic((

) => import("../components/banner/banner"))

export default function Home() {
  return (
      <>
          <Banner/>
          <Products/>
          <Slider/>
          <Guarantee/>
          <Scroller/>
      </>
  );
}
