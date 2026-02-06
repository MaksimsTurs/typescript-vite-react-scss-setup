import type { JSX, PropsWithChildren } from "react"

export type LinkProps<P extends string> = Omit<PropsWithChildren<{
  href: P
} & JSX.IntrinsicElements["a"]>, "onClick">