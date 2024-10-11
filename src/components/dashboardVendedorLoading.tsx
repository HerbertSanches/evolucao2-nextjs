import React from 'react';


const DashBoardVendedorLoading = () => {
    console.log("chamou loading");

    return (

        <>
        <div className="flex space-x-3 overflow-x-auto py-2 px-2 bg-azulEscuro">

            <div className='flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-7 roun]'>

                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-full h-7 min-w-24 items-center justify-center shadow-global'>
                        <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                            <div className='relative z-10 flex flex-col'>
                                <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                <p className="text-branco font-bold smallphone:text-sm"></p>
                            </div>
                        </div>
                    </div>

                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-full h-7 min-w-24 items-center justify-center shadow-global'>
                        <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                            <div className='relative z-10 flex flex-col'>
                                <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                <p className="text-branco font-bold smallphone:text-sm"></p>
                            </div>
                        </div>
                    </div>


                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-full h-7 min-w-24 items-center justify-center shadow-global'>
                        <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                            <div className='relative z-10 flex flex-col'>
                                <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                <p className="text-branco font-bold smallphone:text-sm"></p>
                            </div>
                        </div>
                    </div>


                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-full h-7 min-w-24 items-center justify-center shadow-global'>
                        <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                            <div className='relative z-10 flex flex-col'>
                                <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                <p className="text-branco font-bold smallphone:text-sm"></p>
                            </div>
                        </div>
                    </div>

                    <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-full h-7 min-w-24 items-center justify-center shadow-global'>
                        <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                            <div className='relative z-10 flex flex-col'>
                                <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                <p className="text-branco font-bold smallphone:text-sm"></p>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
            
            
            
        <h1 className='flex text-azulEscuro  bg-red-200items-center justify-center font-bold text-xl mt-3 mb-3'>Dashboard Por Vendedor</h1>

            {/* primeira div que engloba tudo, faz o background principal */}
            <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'> 
                    
                    {/*div que engloba os cards da meta*/}
                    <div id='containerMeta' className=' flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-[90px] mt-4 ml-3 mr-3'>

                        {/*card meta 1*/}
                        <div id='metaMes' className='relative overflow-hidden bg-gray-200 flex rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-2'>
                            
                            {/*div do loading*/}
                            <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                                <div className='relative z-10 flex flex-col'>
                                    <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                    <p className="text-branco font-bold smallphone:text-sm"></p>
                                </div>
                            </div>

                        </div>


                        <div id='metaAno' className='relative overflow-hidden bg-gray-200 flex rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-2'>
                            <div className="absolute inset-0 bg-gray-100 opacity-50 animate-wave  flex items-center space-x-1 justify-center">
                                <div className='relative z-10 flex flex-col'>
                                    <h2 className="text-branco font-bold smallphone:text-sm"></h2>
                                    <p className="text-branco font-bold smallphone:text-sm"></p>
                                </div>
                            </div>
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


        </>



    )
}

export default DashBoardVendedorLoading;