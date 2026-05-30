// Fallback for MDX components interface
type MDXComponents = any;

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
    };
}
