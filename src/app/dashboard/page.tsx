'use client'
import React, { useRef, useEffect, Suspense } from 'react';

import type { Metadata } from "next";
import "../globals.css";
import Teste from '../../components/dashboard';





const Login: React.FC = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Teste />
        </Suspense>
    );
};

export default Login;