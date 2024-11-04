"use client"


import React, { useEffect } from 'react'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Card,CardContent } from '../ui/card';

import 'swiper/css';



const carousel_images = [
  "/images/s-imguiverse.jpg",
  "/images/s-steriodimage.jpg",
  "/images/s-carousel-img-1.jpg",
  "/images/s-Leonardo_Lightning_XL_A_vast_intricately_designed_digital_univ_0 (1).jpg",
  "/images/s-ster.jpg"


]


const TRENDING_COLLECTIONS = [
  "/images/s-car.jpg",
  "/images/trending-collection-car.jpg",
  "/images/trending-collection-f1.jpg",
  "/images/trending-collection-f2.jpg",
  "/images/trending-collection-f3.jpg",
  "/images/trending-collection-f4.jpg",

]


const SwiperButtonNext = ({value}:{value:number}) => {
  const swiper = useSwiper();

  useEffect(()=>{
    setTimeout(()=>{
     handleClick      
    },100)
    
  },[])
  
  const handleClick = ()=>{
    console.log("here",swiper.activeIndex)      
    if (swiper.activeIndex == value - 1){
      swiper.slideTo(0)
    }else{
      swiper.slideNext()
      
    }
    
  }
  return <button className='bg-gray-800 text-5xl absolute bottom-[50%] z-10 right-0 translate-y-[50%]' onClick={handleClick} ><MdNavigateNext /></button>;
};
const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  return <button className='bg-gray-800 text-5xl absolute top-[50%] z-10 left-0 translate-y-[-50%]' onClick={() => swiper.slidePrev()} ><GrFormPrevious /></button>;
};


const Body = () => {
  return (
    <div className='w-full  my-5 lg:px-4  '>
      <div className="relative w-full  h-[400px]">

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper.activeIndex)}
          className='w-full'
          
          
        >
          {
            carousel_images.map((img,index)=>(
              <SwiperSlide key={index}>
                <Image src={img} key={index}  alt='' width={768} height={512} className='w-full h-[400px]  object-cover' />
              </SwiperSlide>
              
            ))
          }
         
          <SwiperButtonNext value={carousel_images.length} />
          <SwiperButtonPrev />
        </Swiper>


        {/* //Text  */}

        <div className="bg-black/30 flex justify-between w-full absolute bottom-0 mb-4 z-10">
          <h1 className=' text-xl md:text-3xl font-bold max-w-[65%]'>Discover, Collect, Sell and Create your own NFTs</h1>
          <button className='px-5 h-[40px] bg-purple-800/70 rounded-full'>Discover new</button>
        </div>
      </div>

      <p className='text-2xl font-semibold mt-9 mb-2'>Trending Collections</p>

      <div className="grid grid-cols-2  md:grid-cols-3 gap-3">

        {
          TRENDING_COLLECTIONS.map((img,index)=>(
            <Card className='w-full' key={index}> 
              <Image src={img}   alt='' width={500} height={700} className='w-full' />
            </Card>

          ))
        }
    

      </div>





    </div>
  )
}

export default Body