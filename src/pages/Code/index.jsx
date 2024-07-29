import * as React from 'react'
import axios from "axios";
import "./style.css";
import { ChakraProvider } from '@chakra-ui/react'
import {ChakraBaseProvider,extendBaseTheme,theme as chakraTheme,} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';


function Code() {

  return (
  //  <Box minH="100vh" bg='0f0a19' color='gray.500' px={6} py={8}>
    <CodeEditor/>
  //  {/* </Box> */}
       

  )
}


export default Code;