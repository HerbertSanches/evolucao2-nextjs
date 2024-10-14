import React from 'react';

const DashBoardVendedorLoading = () => {
    console.log("chamou loading avisos");
   
   return( <>

<h1 className='flex text-azulEscuro  bg-red-200items-center justify-center font-bold text-xl mt-3 mb-3'>Dashboard Avisos</h1>
        {/* primeira div que engloba tudo, faz o background principal */}
        <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'> 
                       
                      
                       <div id='containerMeta' className='flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 mt-4 ml-3 mr-3'></div>
   
                       <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[100px] rounded-lg ml-4 mr-4 mt-3">
                   <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                   <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3"> 
                   </div>
                   </div> 
   
                   <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[100px] rounded-lg ml-4 mr-4 mt-3">
                   <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                   <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3"> 
                   </div>
                   </div> 
   
                   <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[100px] rounded-lg ml-4 mr-4 mt-3">
                   <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                   <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3"> 
                   </div>
                   </div> 
                   
                   <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[100px] rounded-lg ml-4 mr-4 mt-3">
                   <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                   <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3"> 
                   </div>
                   </div> 

                   <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[100px] rounded-lg ml-4 mr-4 mt-3">
                   <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                   <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3"> 
                   </div>
                   </div> 
   
               </div>
       </>)
   
}


export default DashBoardVendedorLoading;