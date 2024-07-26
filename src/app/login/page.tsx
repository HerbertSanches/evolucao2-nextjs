'use client'
import React, { useRef, useEffect } from 'react';

import type { Metadata } from "next";
import "../globals.css";
import Logar from '../../components/loginTela';
import { AuthProvider } from '@/context/AuthContext';




const Login: React.FC = () => {
  
    return (
        <Logar />
    );
};

export default Login;