import { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Badge,
  Container,
  VStack,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { initialCategories, type DowntimeCategory } from 'src/data/initialCategories';

interface DowntimeItemsDisplayProps {
  categoryIndex: number;
  onBack: () => void;
}

export function Category({ categoryIndex, onBack }: DowntimeItemsDisplayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const category = initialCategories[categoryIndex];

  if (!category) {
    return (
      <Box bg="gray.900" minH="100vh" py={8} px={4}>
        <Container maxW="container.xl">
          <Text color="white" fontSize="xl">
            Category not found
          </Text>
        </Container>
      </Box>
    );
  }

  const filteredItems = category.items.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInstanceClick = (item: string) => {
    setSelectedInstance(item);
    setToastMessage(`Selected: ${item}`);
    setShowUndoToast(true);

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setShowUndoToast(false);
    }, 5000);
  };

  const handleUndo = () => {
    setSelectedInstance(null);
    setShowUndoToast(false);
    setToastMessage('');
  };

  const handleCloseToast = () => {
    setShowUndoToast(false);
  };

  return (
    <Box bg="gray.900" minH="100vh" w="100vw"  py={8} px={4} position="relative">
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch" >
          {/* Back Button and Badge Row */}
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Badge
              px={4}
              py={2}
              borderRadius="lg"
              fontSize="md"
              fontWeight="bold"
              color={category.color}
              bg={`${category.color}20`}
              borderWidth="2px"
              borderColor={category.color}
            >
              {category.tag}
            </Badge>
            <Button
              onClick={onBack}
              bg="gray.800"
              color="white"
              borderWidth="1px"
              borderColor="gray.700"
              _hover={{ bg: 'gray.700' }}
              px={4}
              py={2}
            >
              ← Back to Categories
            </Button>
          </Flex>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <Box
              bg="gray.800"
              borderRadius="xl"
              p={12}
              textAlign="center"
              borderWidth="1px"
              borderColor="gray.700"
            >
              <Text color="gray.400" fontSize="lg">
                {searchQuery
                  ? `No instances found matching "${searchQuery}"`
                  : 'No instances available'}
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
              {filteredItems.map((item, index) => (
                <Box
                  key={index}
                  bg="gray.800"
                  borderRadius="xl"
                  p={5}
                  borderWidth="1px"
                  borderColor="gray.700"
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => handleInstanceClick(item)}
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                    borderColor: category.color,
                    bg: 'gray.750',
                  }}
                  position="relative"
                  overflow="hidden"
                  opacity={selectedInstance === item ? 0.6 : 1}
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="4px"
                    bg={category.color}
                  />

                  <VStack align="stretch" gap={3}>
                    <Text
                      color="white"
                      fontSize="md"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {item}
                    </Text>

                    <Badge
                      alignSelf="flex-start"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="md"
                      color={category.color}
                      bg={`${category.color}15`}
                    >
                      #{index + 1}
                    </Badge>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      {/* Custom Undo Toast */}
      {showUndoToast && (
        <Box
          position="fixed"
          bottom="24px"
          left="50%"
          transform="translateX(-50%)"
          bg="gray.800"
          borderRadius="lg"
          boxShadow="0 10px 40px rgba(0,0,0,0.4)"
          borderWidth="1px"
          borderColor="gray.700"
          zIndex={9999}
          animation="slideUp 0.3s ease-out"
        >
          <Flex align="center" gap={4} px={6} py={4}>
            <Text color="white" fontSize="sm" fontWeight="medium">
              {toastMessage}
            </Text>
            <Flex gap={3}>
              <Button
                size="sm"
                bg="transparent"
                color="cyan.400"
                _hover={{ bg: 'cyan.900' }}
                onClick={handleUndo}
                px={4}
              >
                Undo
              </Button>
              <Button
                size="sm"
                bg="transparent"
                color="gray.400"
                _hover={{ bg: 'gray.700' }}
                onClick={handleCloseToast}
                minW="auto"
                px={2}
              >
                ✕
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}

      {/* Add keyframe animation */}
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateX(-50%) translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
}
