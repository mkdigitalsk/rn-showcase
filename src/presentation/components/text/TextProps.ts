/**
 * Base props for text components that require color.
 * Optional props can be implemented by specific components as needed.
 */
export interface TextBaseProps {
  children: string;
  color: string;
  numberOfLines?: number;
}

/**
 * Props for text component variants.
 * Variants omit the 'color' prop and use theme colors instead.
 */
export type TextVariantProps = Omit<TextBaseProps, 'color'>;
