import { useState, useEffect } from 'react';
import type { DowntimeCategory } from '../data/initialCategories';
import { toaster } from 'src/utils/toast';
import {
  Button,
  Input,
  VStack,
  HStack,
  Box,
  Wrap,
  WrapItem,
  Text,
  Dialog,
  Field,
} from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: DowntimeCategory | null;
  onSave: (category: DowntimeCategory) => void;
}

export function CategoryModal({ isOpen, onClose, category, onSave }: CategoryModalProps) {
  const [formData, setFormData] = useState<DowntimeCategory>({
    tag: '',
    text: '',
    color: '#ff6b6b',
    items: []
  });
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({ ...category });
    } else {
      setFormData({
        tag: '',
        text: '',
        color: '#ff6b6b',
        items: []
      });
    }
  }, [category, isOpen]);

  const handleAddItem = () => {
    if (currentItem.trim() && !formData.items.includes(currentItem.trim())) {
      setFormData({
        ...formData,
        items: [...formData.items, currentItem.trim()]
      });
      setCurrentItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    if (!formData.tag || !formData.text) {
      toaster.create({
        title: 'Validation Error',
        description: 'Tag and Text are required fields',
        type: 'error',
      });
      return;
    }

    onSave(formData);
    onClose();
    toaster.create({
      title: 'Success',
      description: `Category ${category ? 'updated' : 'created'} successfully`,
      type: 'success',
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="gray.800" borderColor="gray.600">
          <Dialog.Header>
            <Dialog.Title color={"white"} fontSize={20}>{category ? 'Edit Category' : 'Add Category'}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger bg={"red"}/>

          <Dialog.Body>
            <VStack gap={4} align="stretch">
              <Field.Root required>
                <Field.Label color={"white"} fontSize={20}>Tag</Field.Label>
                <Input
                  placeholder="e.g., MACHINE_FAILURE"
                  color={"white"}
                  bg="gray.700"
                  borderColor="gray.600"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label color={"white"} fontSize={20}>Display Text</Field.Label>
                <Input
                  placeholder="e.g., Machine Failure"
                  color={"white"}
                  bg="gray.700"
                  borderColor="gray.600"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color={"white"} fontSize={20} >Color</Field.Label>
                <HStack>
                  <Input
                    type="color"
                    color={"black"}
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    w="80px"
                  />
                  <Box
                    w="40px"
                    h="40px"
                    bg={formData.color}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.300"
                  />
                  <Input
                    placeholder="#ff6b6b"
                    color={"white"}
                    bg="gray.700"
                    borderColor="gray.600"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </HStack>
              </Field.Root>

              <Field.Root>
                <Field.Label color={"white"} fontSize={20}>Instances</Field.Label>
                <HStack>
                  <Input
                    placeholder="Add Instance name"
                    color={"white"}
                    bg="gray.700"
                    borderColor="gray.600"
                    value={currentItem}
                    flex="1"
                    onChange={(e) => setCurrentItem(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem();
                      }
                    }}
                  />
                  <Button size="sm" bg={"blue.500"} color={"white"} onClick={handleAddItem}>
                    Add
                  </Button>
                </HStack>
                <Box mt={3}>
                  {formData.items.length === 0 ? (
                    <Text fontSize="sm" color="gray.400">No items added yet</Text>
                  ) : (
                    <Wrap gap={2}>
                      {formData.items.map((item, index) => (
                        <WrapItem key={index}>
                          <HStack
                            bg="gray.700"
                            px={3}
                            py={1}
                            color={"white"}
                            borderRadius="md"
                            fontSize="sm"
                          >
                            <Text fontSize={17}>{item}</Text>
                            <CloseButton size="md" bg={"gray.600"} color={"white"} onClick={() => handleRemoveItem(index)} />
                          </HStack>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}
                </Box>
              </Field.Root>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="ghost" color={"white"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorPalette="teal" onClick={handleSubmit}>
              Save Category
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
