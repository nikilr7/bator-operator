import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { CategoryCard } from './CategoryCard';
import { Category } from './Category';
import { initialCategories } from '../data/initialCategories';

function App() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

  // If a category is selected, show the items display
  if (selectedCategoryIndex !== null) {
    return (
      <Category 
        categoryIndex={selectedCategoryIndex}
        onBack={() => setSelectedCategoryIndex(null)}
      />
    );
  }

  const handleViewCategory = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  return (
    <Box bg="gray.900" minH="100vh" p={8}>
      <Box maxW="none" w="100%">
        <Flex justify="center" align="center" mb={8}>
          <Heading size="2xl" color="white">Downtime Categories</Heading>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {initialCategories.map((category, index) => (
            <CategoryCard
              key={`${category.tag}-${index}`}
              category={category}
              onView={() => handleViewCategory(index)}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default App;
