import type { ReactNode } from "react";
import type { MetadataProps } from "./Metadata.type";

export default function Metadata({ name, httpEquiv, charset, content }: MetadataProps): ReactNode {
  return( 
    <meta 
      charSet={charset} 
      httpEquiv={httpEquiv} 
      name={name}
      content={content}/>
  );
};