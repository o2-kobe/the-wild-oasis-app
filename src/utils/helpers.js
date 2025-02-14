import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(
    value
  );

/*In react-query, the QueryClient can be configured with a variety of options to customize its behavior. Besides staleTime, here are some other options you can set in the defaultOptions for queries and mutations:

Query Options
cacheTime: The time for which inactive queries remain in the cache before being garbage collected.
refetchOnMount: Determines if a query should automatically refetch when the component mounts.
refetchOnWindowFocus: Controls whether a query should refetch when the window regains focus.
refetchInterval: Sets an interval (in milliseconds) for automatically refetching the query.
retry: The number of retry attempts for a failed query.
retryDelay: The time delay (in milliseconds) between retries for failed queries.
onSuccess: A callback function that is called when a query is successful.
onError: A callback function that is called when a query fails.
onSettled: A callback function that is called when a query is either successful or fails.
Mutation Options
Similarly, you can set options specifically for mutations like onSuccess, onError, onSettled, and retry as well.
Remembering the Options
Here are a few easy ways to remember the key options for QueryClient:

Group by Functionality: Organize your options into categories: caching (e.g., staleTime, cacheTime), refetching behavior (e.g., refetchOnMount, refetchOnWindowFocus, refetchInterval), and callbacks for success/error handling (e.g., onSuccess, onError).

Mnemonics: Create a mnemonic for the options you use most frequently. For example, "CEST" for Cache (cacheTime), Expiry (staleTime), Success (onSuccess), and Timeout (retryDelay).

Documentation Reference: Keep the official react-query documentation bookmarked for quick reference. Familiarize yourself with its structure, as it's organized logically.

Practice: Implement and modify example code snippets to solidify your understanding. As you try different options, the usage will become more intuitive.

Code Comments: When you create a project or snippets, add comments to your configuration options explaining what each does. This helps reinforce memory by providing context.

Here's a sample code snippet with additional options for better clarity:

Copy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000, // Keep inactive data for 5 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchInterval: 10000, // Refetch every 10 seconds
      retry: 1, // Retry once on failure
      onSuccess: (data) => {
        console.log("Query was successful:", data);
      },
      onError: (error) => {
        console.error("Query failed:", error);
      },
    },
  },
});
Experimenting with the options and referencing the documentation will help solidify your understanding of how to maximize the potential of react-query.

if we do not specify or give values to some of the options, then what is their default values

Monica
DeepSeek R1
Thought for 1 seconds
Reasoning Process

In React Query, if you don’t explicitly specify values for certain options, the library uses its own sensible defaults. Here are the default values for common options in queries:

Query Defaults
Option	Default Value
staleTime	0 (data is considered stale immediately after fetching)
cacheTime	5 * 60 * 1000 (5 minutes; inactive queries stay cached for 5 minutes)
refetchOnMount	true (refetch when component mounts)
refetchOnWindowFocus	true (refetch when window regains focus)
refetchOnReconnect	true (refetch when network reconnects)
retry	3 (retry failed queries 3 times)
retryDelay	Exponential backoff: (attempt) => Math.min(1000 * 2 ** attempt, 30000)
refetchInterval	false (no automatic refetching unless explicitly set)
enabled	true (queries run automatically)
onSuccess/onError	undefined (no default callbacks)
Example with Defaults Explicitly Shown
Copy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Default
      cacheTime: 300000, // 5 minutes (default)
      refetchOnMount: true, // Default
      refetchOnWindowFocus: true, // Default
      retry: 3, // Default
      // Other options not specified use their defaults
    },
  },
});
Key Takeaways:
Stale Data: By default, data is marked stale immediately (staleTime: 0), which triggers refetching in the background under conditions like window focus.
Caching: Unused queries stay cached for 5 minutes (cacheTime) to avoid unnecessary refetches for inactive components.
Refetch Behavior: React Query aggressively refetches by default (on mount, window focus, etc.) to keep data fresh.
Retry Logic: Failed queries retry 3 times with exponential backoff delays (e.g., 1s, 2s, 4s).
How to Remember:
Defaults prioritize freshness: React Query assumes you want up-to-date data, so it aggressively refetches unless you override options like staleTime.
Think in categories:
Caching: staleTime, cacheTime.
Refetch Triggers: refetchOnMount, refetchOnWindowFocus.
Error Handling: retry, retryDelay. */
