import { useEffect } from 'react'
import { Box, Container, SimpleGrid, VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard'

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => { 
    fetchProducts();
  }, [fetchProducts])

  console.log("Products:", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r,rgb(46, 212, 237),rgb(30, 85, 236))"
          bgClip="text"
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text 
            fontSize="xl" 
            textAlign="center" 
            fontWeight="bold" 
            color="gray.500"
          >
          No Products Yet 😥{" "}
          <Link to="/create">
            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline"}}>
              Create a Product
            </Text>
          </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage