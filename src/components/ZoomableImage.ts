import styled from 'styled-components';
import { Image as ChakraImage } from '@chakra-ui/core';

interface ImageProps {
  scale?: string | number;
}

const ZoomableImage = styled(ChakraImage)<ImageProps>`
  transition: all 0.3s;

  &:hover {
    transform: scale(${({ scale }) => scale || 1.3});
  }
`;

export default ZoomableImage;
