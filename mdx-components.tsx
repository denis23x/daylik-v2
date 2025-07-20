import type { MDXComponents } from 'mdx/types';
import MdxPre from '@/components/mdx/mdx-pre';
import MdxA from '@/components/mdx/mdx-a';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <MdxA {...props} />,
    pre: (props) => <MdxPre {...props} />,
    ...components,
  };
}
