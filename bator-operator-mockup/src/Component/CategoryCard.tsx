import type { DowntimeCategory } from '../data/initialCategories';
import {
  Box,
  Heading,
  Badge,
  Flex,
  Wrap,
  WrapItem,
  Text,
  Separator,
} from '@chakra-ui/react';
import { 
  MdError, 
  MdBuild, 
  MdInventory, 
  MdPerson,
  MdKeyboardArrowRight 
} from 'react-icons/md';

interface CategoryCardProps {
  category: DowntimeCategory;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

// Icon mapping based on category tag
const getCategoryIcon = (tag: string) => {
  switch (tag) {
    case 'MACHINE_FAILURE':
      return MdError;
    case 'PLANNED_MAINTENANCE':
      return MdBuild;
    case 'MATERIAL_SHORTAGE':
      return MdInventory;
    case 'OPERATOR_ISSUE':
      return MdPerson;
    case 'QUALITY_CONTROL':
    case 'POWER_OUTAGE':
    case 'TOOLING_ISSUE':
    case 'ENVIRONMENTAL':
      return MdError;
    default:
      return MdError;
  }
};

export function CategoryCard({ category, onEdit, onDelete, onView }: CategoryCardProps) {
  const IconComponent = getCategoryIcon(category.tag);

  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      borderWidth="2px"
      borderColor="gray.700"
      overflow="hidden"
      h={280}
      shadow="lg"
      onClick={onView}
      cursor="pointer"
      userSelect="none"
      position="relative"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        borderColor: category.color,
        shadow: 'xl',
        transform: 'translateY(-4px)',
      }}
      role="group"
    >
      {/* Gradient Overlay Effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={`linear(to-br, ${category.color}05, transparent)`}
        opacity={0}
        transition="opacity 0.3s"
        _groupHover={{ opacity: 1 }}
        pointerEvents="none"
      />

      {/* Header */}
      <Box p={6} position="relative" zIndex={1}>
        <Flex justify="space-between" align="flex-start" gap={4}>
          <Flex align="center" gap={3} flex="1">
            {/* Category Icon */}
            {/* <Box
              bg={`${category.color}20`}
              borderRadius="lg"
              p={3}
              color={category.color}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth="2px"
              borderColor={`${category.color}40`}
              transition="all 0.3s"
            >
              <IconComponent size={28} />
            </Box> */}

            {/* Badge */}
            <Box flex="1">
              <Badge
                color={category.color}
                bg={`${category.color}20`}
                borderColor={category.color}
                borderWidth="2px"
                px={4}
                py={2}
                borderRadius="lg"
                fontWeight="bold"
                fontSize="md"
                textTransform="uppercase"
                letterSpacing="wider"
                display="inline-flex"
                alignItems="center"
                boxShadow={`0 4px 14px ${category.color}40`}
                transition="all 0.3s"
              >
                {category.tag}
              </Badge>
            </Box>
          </Flex>

          {/* Arrow Icon */}
          <Box
            color={category.color}
            opacity={0.6}
            transition="all 0.3s"
            _groupHover={{
              opacity: 1,
              transform: 'translateX(4px)',
            }}
          >
            <MdKeyboardArrowRight size={24} />
          </Box>
        </Flex>
      </Box>

      {/* Body */}
      <Box p={6} pt={0} position="relative" zIndex={1}>
        <Separator
          mb={6}
          borderColor="gray.600"
          opacity={0.5}
          borderWidth="1px"
        />

        {/* Instance Count with Icon */}
       

        {/* Items Grid */}
        <Wrap gap={2} mb={4}>
          {category.items.slice(0, 4).map((item, index) => (
            <WrapItem key={index}>
              <Box
                bg="gray.700"
                px={3}
                py={2}
                color="gray.200"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="medium"
                borderWidth="1px"
                borderColor="gray.600"
                transition="all 0.2s"
              >
                {item}
              </Box>
            </WrapItem>
          ))}
        </Wrap>

        {/* Show More Indicator */}
        {category.items.length > 4 && (
          <Box
            mt={3}
            p={2}
            bg={`${category.color}10`}
            borderRadius="md"
            textAlign="center"
          >
            <Text fontSize="sm" color={category.color} fontWeight="semibold">
              +{category.items.length - 4} more items
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
