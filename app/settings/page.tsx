import React from 'react'
import LeftBar from '@/components/LeftBar'
import SettingsForm from '@/components/settings/SettingsForm'


const page = () => {
  return (
    <div className='flex lg:mx-6 h-full'>
      <div className="hidden lg:flex w-1/5 sticky top-0 h-screen">
        <LeftBar/>
      </div>
      <div className="w-full lg:w-4/5 flex justify-center items-center h-screen">
          <SettingsForm/>

      </div>
     
    </div>

  )
}

export default page