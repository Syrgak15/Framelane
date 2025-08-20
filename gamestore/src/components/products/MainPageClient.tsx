// "use client"
//
// import * as React from 'react';
// import "../products/products.css";
// import MediaCard from "../../lib-components/MediaCard";
// import { useAppSelector} from "../../store/hooks";
// import {RootState} from "../../store";
//
// type Props = {
//     title: string;
//     slug: string;
//     image: string;
//     price: string;
// }
//
// const MainPageClient: React.FC = ({initialValue} : {initialValue : Props}) => {
//     const glassesData = useAppSelector((state:RootState) => state.mainReducer.result);
//     const Redirection = () => {
//         window.location.assign('/collections');
//     }
//     console.log(glassesData)
//
//     return <>
//         <div className="products-wrapper">
//             <div className="products-heading">
//                 <span className="products-heading__title">Products</span>
//                 <button onClick={Redirection} className="products-heading__btn">SHOP ALL</button>
//             </div>
//             {Array.isArray(glassesData) && (
//                 <ul className="products-list">
//                     {glassesData.map((glass, index) => (
//                         <MediaCard key={index} image={glass.image} title={glass.name} price={glass.price}/>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     </>
// }
//
// export default MainPageClient;
//
//
