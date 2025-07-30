import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AccessibleDropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  onSelect,
  label,
  error,
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchTerm('');
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;
      default:
        // Type-ahead search
        if (event.key.length === 1 && isOpen) {
          setSearchTerm(prev => prev + event.key);
          
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          
          searchTimeoutRef.current = setTimeout(() => {
            setSearchTerm('');
          }, 1000);
          
          const matchIndex = filteredOptions.findIndex(option =>
            option.label.toLowerCase().startsWith(searchTerm.toLowerCase() + event.key.toLowerCase())
          );
          
          if (matchIndex >= 0) {
            setFocusedIndex(matchIndex);
          }
        }
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    setSearchTerm('');
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
      setSearchTerm('');
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${dropdownId}-error` : undefined;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      <label 
        htmlFor={dropdownId}
        className="block text-sm font-medium text-cyber-silver mb-2"
      >
        {label}
        {required && <span className="text-neon-magenta ml-1" aria-label="required">*</span>}
      </label>

      {/* Dropdown button */}
      <button
        ref={buttonRef}
        id={dropdownId}
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 text-left bg-card-bg backdrop-blur-sm border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-bg ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-white/20 hover:border-neon-blue/50 focus:border-neon-blue'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-describedby={errorId}
        aria-invalid={!!error}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-white' : 'text-cyber-silver'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-cyber-silver transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Error message */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-card-bg backdrop-blur-md border border-white/20 rounded-lg shadow-2xl max-h-60 overflow-auto"
          >
            <ul
              ref={listRef}
              role="listbox"
              aria-label={label}
              className="py-1"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-cyber-silver text-sm">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                      option.disabled
                        ? 'text-cyber-silver/50 cursor-not-allowed'
                        : focusedIndex === index
                        ? 'bg-neon-blue/20 text-white'
                        : option.value === value
                        ? 'bg-neon-blue/10 text-neon-blue'
                        : 'text-cyber-silver hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check className="w-4 h-4 text-neon-blue" />
                    )}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader instructions */}
      <div className="sr-only">
        Use arrow keys to navigate options, Enter or Space to select, Escape to close.
        {searchTerm && ` Currently searching for: ${searchTerm}`}
      </div>
    </div>
  );
};

export default AccessibleDropdown;