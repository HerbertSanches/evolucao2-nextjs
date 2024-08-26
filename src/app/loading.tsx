import React from 'react';


const LoadingPadrao = () => {
    return(

        <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>

            <div className='ml-3 mr-3 mt-3 bg-cinza  rounded-[8px]'>
                <div id='containerMeta' className=' flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-[90px] mt-4'>

                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-1'>

                    <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                        {/* <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className='smallphone:h-8 smallphone:w-8 ' /> */}
                        <div className='relative z-10 flex flex-col'>
                        <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                        <p className="text-branco font-bold smallphone:text-sm"></p>
                        </div>
                    </div>
                    
                    </div>

                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-1'>
                    <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                        {/* <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className='smallphone:h-8 smallphone:w-8 ' /> */}
                        <div className='relative z-10 flex flex-col'>
                        <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                        <p className="text-branco font-bold smallphone:text-sm"></p>
                        </div>
                    </div>
                    </div>

                </div>
            </div>

            {/* faturamento */}

            <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[85px] rounded-lg ml-4 mr-4 mt-3">
                <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3">
                    
                    
                </div>
            </div> 

            <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[85px] rounded-lg ml-4 mr-4 mt-3">
                <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3">
                    
                    
                </div>
            </div> 

            <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[85px] rounded-lg ml-4 mr-4 mt-3">
                <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3">
                    
                    
                </div>
            </div> 

            <div className="relative overflow-hidden bg-gray-200 p-4 text-white h-[85px] rounded-lg ml-4 mr-4 mt-3">
                <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3">
                    
                    
                </div>
            </div> 

            {/* grafico */}
            <div className="relative overflow-hidden bg-gray-200 p-4 text-white rounded-lg ml-4 mr-4 mt-3 min-w-[250px] h-[250px] max-w-full  max-h-[500px]">
                <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave"></div>
                <div className="relative z-10 rounded-lg p-4 flex items-center justify-between shadow-global ml-4 mr-4 mt-3 ">
                    
                    
                </div>
            </div> 
            
        </div>
    )
} 

export default LoadingPadrao;