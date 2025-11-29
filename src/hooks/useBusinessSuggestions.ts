import { useState, useEffect } from 'react';

interface Business {
  id: string;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
  settings: {
    autoCategories: string[];
    commonVendors: string[];
    budgetLimits: Record<string, number>;
  };
}

interface BusinessSuggestion {
  businessId: string;
  confidence: number;
  reason: string;
}

interface ExpenseContext {
  vendor?: string;
  amount: number;
  description: string;
  location?: { lat: number; lng: number };
  timestamp: string;
}

export const useBusinessSuggestions = (businesses: Business[]) => {
  const [suggestions, setSuggestions] = useState<BusinessSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestions = async (context: ExpenseContext): Promise<BusinessSuggestion[]> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/expenses/suggest-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(context),
      });

      if (response.ok) {
        const suggestions = await response.json();
        setSuggestions(suggestions);
        return suggestions;
      } else {
        // Fallback to local prediction logic
        const localSuggestions = generateLocalSuggestions(context, businesses);
        setSuggestions(localSuggestions);
        return localSuggestions;
      }
    } catch (error) {
      console.error('Failed to get business suggestions:', error);
      // Fallback to local prediction logic
      const localSuggestions = generateLocalSuggestions(context, businesses);
      setSuggestions(localSuggestions);
      return localSuggestions;
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalSuggestions = (
    context: ExpenseContext, 
    businesses: Business[]
  ): BusinessSuggestion[] => {
    const suggestions: BusinessSuggestion[] = [];

    businesses.forEach(business => {
      let confidence = 0;
      let reason = 'general';

      // Vendor matching
      if (context.vendor && business.settings.commonVendors.includes(context.vendor.toLowerCase())) {
        confidence += 0.4;
        reason = 'vendor_history';
      }

      // Amount range matching (simplified)
      const avgBudget = Object.values(business.settings.budgetLimits).reduce((a, b) => a + b, 0) / 
                       Object.keys(business.settings.budgetLimits).length;
      if (context.amount <= avgBudget * 1.2 && context.amount >= avgBudget * 0.1) {
        confidence += 0.15;
        if (reason === 'general') reason = 'amount_range';
      }

      // Time pattern matching (simplified - business hours)
      const hour = new Date(context.timestamp).getHours();
      if (hour >= 9 && hour <= 17) {
        confidence += 0.2;
        if (reason === 'general') reason = 'time_pattern';
      }

      // Default business boost
      if (business.isDefault) {
        confidence += 0.1;
      }

      if (confidence > 0.1) {
        suggestions.push({
          businessId: business.id,
          confidence: Math.min(confidence, 1),
          reason
        });
      }
    });

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  };

  return {
    suggestions,
    isLoading,
    getSuggestions,
    clearSuggestions: () => setSuggestions([])
  };
};