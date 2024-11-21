import { tv } from 'tailwind-variants';

export const baseButton = tv({
  base: /*tw*/ `text-center relative font-semibold whitespace-nowrap align-middle 
        outline-none inline-flex items-center justify-center select-none overflow-hidden active:shadow-md duration-300 hover:shadow-none transition-all ease-linear
        `,
  variants: {
    size: {
      xs: 'text-xs py-1 px-2',
      md: 'text-sm py-2 px-4',
      lg: 'text-base py-3 px-6',
      xl: 'text-lg py-4 px-8',
      xxl: 'text-xl py-5 px-10',
      square_xs: 'text-xs h-4 w-4 p-1',
      square_sm: 'text-sm h-6 w-6 p-1',
      square_md: 'text-base h-8 w-8 p-1',
      square_lg: 'text-lg h-10 w-10 p-1',
      square_xl: 'text-xl h-12 w-12 p-1',
    },
    vPadding: {
      none: 'py-0',
      xs: 'py-[4px]',
      sm: 'lg:py-[8px] md:py-[6px] px-[4px]',
      md: 'xl:py-[12px] lg:py-[10px] md:py-[8px] px-[4px]',
      lg: 'xl:py-[16px] lg:py-[14px] md:py-[12px] px-[6px]',
    },
    vSpace: {
      none: 'my-0',
      xs: 'my-1',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
    },
    hPadding: {
      none: 'px-0',
      xs: 'px-[4px]',
      sm: 'px-[8px]',
      md: 'px-[12px]',
      lg: 'px-[16px]',
    },
    HSpace: {
      none: 'mx-0',
      xs: 'mx-1',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
    },
    align: {
      center: 'mx-auto',
      right: 'ml-auto',
      left: 'mr-auto',
      top: 'mb-auto',
      bottom: 'mt-auto',
    },
    rounded: {
      none: 'rounded-none',
      xs: 'rounded-[2px]',
      sm: 'rounded-[4px]',
      normal: 'rounded-[8px]',
      lg: 'rounded-[12px]',
      full: 'rounded-full',
    },
    behavior: {
      block: 'w-full',
    },
    responsiveVariants: ['xs', 'sm', 'md'],
  },
});

export const filledButton = tv({
  extend: baseButton,
  base: "text-white",
  variants: {
    color: {
      primary: 'bg-primary hover:bg-primary-600',
      secondary: 'bg-secondary',
    },
  },
});
export const textButton = tv({
  extend: baseButton,
  variants: {
    color: { primary: 'text-primary-600', secondary: 'text-secondary-600' },
  },
});
export const outlinedButton = tv({
  extend: baseButton,
  base: 'ring-1',
  variants: {
    color: { primary: 'text-primary-600 border border-primary-600', secondary: 'text-secondary-600 border border-primary-600' },
  },
});
export const ghostButton = tv({
  extend: baseButton,
  variants: {
    color: {
      primary:
        "text-primary bg-transparent border-primary after:content-[''] after:absolute after:rotate-[25deg] after:top-[-100%] after:left-[-190%] after:bg-primary after:w-[150%] after:pt-[150%] after:transition-[left] after:duration-300 after:ease-linear after:z-[-1] hover:after:left-[-30%] hover:text-white hover:ring-2",
      secondary: '',
    },
  },
});
