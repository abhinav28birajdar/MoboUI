import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';

export function useSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<any>({ components: [], projects: [], blogs: [], users: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setResults({ components: [], projects: [], blogs: [], users: [] });
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          
          // Generate auto-suggestions based on matched titles
          const titles: string[] = [
            ...data.components.map((c: any) => c.name),
            ...data.projects.map((p: any) => p.title),
          ].slice(0, 5);
          setSuggestions(titles);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    suggestions,
  };
}
