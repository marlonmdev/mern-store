import React, { use } from 'react'
import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  // Importing useColorMode from Chakra UI to handle color mode toggling
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="1140px" px={4}>
      <Flex 
        h={16} 
        alignItems="center" 
        justifyContent="space-between" 
        flexDir={{
          base: "column",
          sm: "row"
        }}
        >  
        <Text 
          fontSize={{base: "22", sm: "28"}}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r,rgb(46, 212, 237),rgb(30, 85, 236))"
          bgClip="text"
        >
          <Link to="/" >Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            { colorMode === "light" ? <MoonIcon fontSize={20} /> : <SunIcon fontSize={20} /> }
          </Button>
        </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar