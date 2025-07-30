import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';

interface ContentItem {
  id: string;
  content: React.ReactNode;
}

interface ProgressiveContentProps {
  items: ContentItem[];
  initialCount?: number;
  loadMoreCount?: number;
  className?: string;
  loadingMessage?: string;
  endMessage?: string;
  onLoadMore?: () => Promise<ContentItem[]>;
}

const ProgressiveContent: React.FC<ProgressiveContentProps> = ({
  items,
  initialCount = 5,
  loadMoreCount = 5,
  className = '',
  loadingMessage = 'Loading more content...',
  endMessage = 'You\'ve reached the end!',
  onLoadMore
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [allItems, setAllItems] = useState(items);
  const [hasMore, setHasMore] = useState(items.length > initialCount);
  const [reducedMotion, setReducedMotion] = useState(false);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  // Detect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update items when props change
  useEffect(() => {
    setAllItems(items);
    setHasMore(items.length > visibleCount);
  }, [items, visibleCount]);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    
    try {
      if (onLoadMore) {
        // Load more from external source
        const newItems = await onLoadMore();
        setAllItems(prev => [...prev, ...newItems]);
        setVisibleCount(prev => prev + newItems.length);
        setHasMore(newItems.length === loadMoreCount);
      } else {
        // Load more from existing items
        const newVisibleCount = Math.min(visibleCount + loadMoreCount, allItems.length);
        setVisibleCount(newVisibleCount);
        setHasMore(newVisibleCount < allItems.length);
      }

      // Announce to screen readers
      if (announcementRef.current) {
        announcementRef.current.textContent = `Loaded ${loadMoreCount} more items. ${
          hasMore ? 'More content available.' : 'All content loaded.'
        }`;
      }

      // Focus management for keyboard users
      setTimeout(() => {
        const newlyLoadedItem = document.querySelector(`[data-item-index="${visibleCount}"]`) as HTMLElement;
        if (newlyLoadedItem) {
          newlyLoadedItem.focus();
        }
      }, 100);

    } catch (error) {
      console.error('Error loading more content:', error);
      if (announcementRef.current) {
        announcementRef.current.textContent = 'Error loading more content. Please try again.';
      }
    } finally {
      setIsLoading(false);
    }
  }, [visibleCount, loadMoreCount, allItems.length, onLoadMore, hasMore]);

  const visibleItems = allItems.slice(0, visibleCount);

  return (
    <div className={className}>
      {/* Screen reader announcements */}
      <div 
        ref={announcementRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* Content list */}
      <div className="space-y-6">
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reducedMotion ? 0 : 0.3,
              delay: reducedMotion ? 0 : index * 0.05 
            }}
            tabIndex={-1}
            data-item-index={index}
            className="focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg"
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* Load more section */}
      {(hasMore || isLoading) && (
        <div className="mt-8 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 text-cyber-silver">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{loadingMessage}</span>
            </div>
          ) : (
            <button
              ref={loadMoreRef}
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-card-bg backdrop-blur-sm border border-neon-blue/30 rounded-full text-neon-blue hover:border-neon-blue hover:bg-neon-blue/10 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-describedby="load-more-description"
            >
              <span>Load More</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* End message */}
      {!hasMore && !isLoading && visibleCount > initialCount && (
        <div className="mt-8 text-center">
          <p className="text-cyber-silver text-sm">{endMessage}</p>
        </div>
      )}

      {/* Hidden description for screen readers */}
      <div id="load-more-description" className="sr-only">
        Click to load {loadMoreCount} more items. Currently showing {visibleCount} of {allItems.length} items.
      </div>

      {/* Skip to end option for screen readers */}
      {hasMore && (
        <div className="sr-only">
          <button
            onClick={() => {
              setVisibleCount(allItems.length);
              setHasMore(false);
            }}
            className="underline text-neon-blue"
          >
            Skip to end and show all {allItems.length} items
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressiveContent;