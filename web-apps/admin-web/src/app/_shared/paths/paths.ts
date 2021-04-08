export const PATHS = {
  MOVIES: {
    MODULE: 'movies',
    LIST: 'movies/all',
    ADD_NEW: 'movies/new',
    EDIT: (id: string) => `movies/edit/${id}`,
    DETAILS: (id: string) => `movies/details/${id}`,
  },
};
