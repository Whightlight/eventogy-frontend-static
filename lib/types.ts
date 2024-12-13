export type Event = {
    id: string;
    name: string;
    slug: string;
    is_published: number;
    is_public: number;
    is_guestlist_only: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: {
      scheduled_dates?: string[];
      location_name?: string;
      location_address?: string;
    } | null;
  };

  type Pagination = {
    perPage: number;
    currentPage: number;
    lastPage: number;
    total: number;
  };
  
  export type EventsResponse = {
    success: boolean;
    code: number;
    message: string;
    data: {
      events: Event[];
      pagination: Pagination;
    };
  };
  